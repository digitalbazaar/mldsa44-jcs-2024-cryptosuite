/*!
 * Copyright (c) 2023-2026 Digital Bazaar, Inc.
 */
import * as base64url from 'base64url-universal';
import * as MldsaMultikey from '@digitalbazaar/mldsa-multikey';
import canonicalize from 'canonicalize';
import {name} from './name.js';
import {requiredAlgorithm} from './requiredAlgorithm.js';

export function createSignCryptosuite() {
  return {
    name,
    canonize: _canonize,
    requiredAlgorithm,
    createVerifier: _throwSignUsageError,
    createVerifyData: _createVerifyDataFn(
      _modifySignProofOptionsAndDocument
    ),
    createProofValue: _createProofValue,
  };
}

export function createVerifyCryptosuite() {
  return {
    name,
    canonize: _canonize,
    requiredAlgorithm,
    createVerifier: _createVerifier,
    createVerifyData: _createVerifyDataFn(
      _modifyVerifyProofOptionsAndDocument
    ),
  };
}

function _createVerifyDataFn(modifyProofOptionsAndDocument) {
  return async function({cryptosuite, document, proof} = {}) {
    if(cryptosuite?.name !== name) {
      throw new TypeError(`"cryptosuite.name" must be "${name}".`);
    }
    modifyProofOptionsAndDocument({proof, document});

    // await both jcs proof hash and jcs document hash
    const [proofHash, docHash] = await Promise.all([
      // canonize and hash proof
      _canonizeProof(proof, {cryptosuite}).then(
        jcsProofOptions => _sha256(jcsProofOptions)),
      // canonize and hash document
      cryptosuite.canonize(document).then(
        jcsDocument => _sha256(jcsDocument))
    ]);

    // concatenate hash of jcs proof options and hash of jcs document
    return _concat(proofHash, docHash);
  };
}

function _modifyVerifyProofOptionsAndDocument({proof, document}) {
  // 4) If proofOptions.@context exists:
  if(proof['@context']) {
    let proofContext = proof['@context'];
    proofContext = Array.isArray(proofContext) ? proofContext : [proofContext];
    let docContext = document['@context'];
    docContext = Array.isArray(docContext) ? docContext : [docContext];

    // 4.1) Check that the securedDocument.@context starts with all values
    // contained in the proofOptions.@context in the same order. Otherwise, set
    // verified to false and skip to the last step.
    for(let i = 0; i < proofContext.length; i++) {
      if(JSON.stringify(proofContext[i]) !== JSON.stringify(docContext[i])) {
        throw new Error('document.@context does not start with proof.@context');
      }
    }
    // 4.2) Set unsecuredDocument.@context equal to proofOptions.@context.
    document['@context'] = proof['@context'];
  }
}

function _modifySignProofOptionsAndDocument({proof, document}) {
  // 2) If unsecuredDocument.@context is present, set proof.@context to
  //    unsecuredDocument.@context.
  if(document['@context']) {
    proof['@context'] = document['@context'];
  }
}

async function _canonizeProof(proof, {cryptosuite}) {
  proof = {...proof};
  // `proofValue` must not be included in the proof options
  delete proof.proofValue;
  return cryptosuite.canonize(proof);
}

function _concat(b1, b2) {
  const rval = new Uint8Array(b1.length + b2.length);
  rval.set(b1, 0);
  rval.set(b2, b1.length);
  return rval;
}

async function _createProofValue({verifyData, dataIntegrityProof}) {
  const {signer} = dataIntegrityProof;
  const signatureBytes = await signer.sign({data: verifyData});
  return 'u' + base64url.encode(signatureBytes);
}

async function _canonize(input) {
  return canonicalize(input);
}

async function _createVerifier({verificationMethod}) {
  const key = await MldsaMultikey.from({key: verificationMethod});
  return key.verifier();
}

async function _sha256(string) {
  const bytes = new TextEncoder().encode(string);
  return new Uint8Array(
    await globalThis.crypto.subtle.digest('SHA-256', bytes));
}

function _throwSignUsageError() {
  throw new Error('This cryptosuite must only be used with "sign".');
}
