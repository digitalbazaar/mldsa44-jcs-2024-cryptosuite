/*!
 * Copyright (c) 2023-2026 Digital Bazaar, Inc.
*/
import * as base64url from 'base64url-universal';
import {canonize} from './canonize.js';
import {createSigner} from './createSigner.js';
import {createVerifier} from './createVerifier.js';
import {name} from './name.js';
import {requiredAlgorithm} from './requiredAlgorithm.js';

export {createSigner};

export const cryptosuite = {
  canonize,
  createSigner,
  createVerifier,
  createVerifyData: _createVerifyData,
  createProofValue: _createProofValue,
  name,
  requiredAlgorithm
};

async function _createVerifyData({
  cryptosuite, document, proof, dataIntegrityProof, verificationMethod
} = {}) {
  _modifyProofOptionsAndDocument({proof, document, dataIntegrityProof});

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
}

async function _createProofValue({verifyData, dataIntegrityProof}) {
  const {signer} = dataIntegrityProof;
  const signatureBytes = await signer.sign({data: verifyData});
  return 'u' + base64url.encode(signatureBytes);
}

function _modifyProofOptionsAndDocument({proof, document, dataIntegrityProof}) {
  if(dataIntegrityProof.signer) {
    // signing: set proof.@context from document.@context
    if(document['@context']) {
      proof['@context'] = document['@context'];
    }
  } else {
    // verifying: validate and set document.@context from proof.@context
    if(proof['@context']) {
      let proofContext = proof['@context'];
      proofContext =
        Array.isArray(proofContext) ? proofContext : [proofContext];
      let docContext = document['@context'];
      docContext = Array.isArray(docContext) ? docContext : [docContext];

      for(let i = 0; i < proofContext.length; i++) {
        if(JSON.stringify(proofContext[i]) !== JSON.stringify(docContext[i])) {
          throw new Error(
            'document.@context does not start with proof.@context');
        }
      }
      document['@context'] = proof['@context'];
    }
  }
}

async function _canonizeProof(proof, {cryptosuite}) {
  proof = {...proof};
  // `proofValue` must not be included in the proof options
  delete proof.proofValue;
  return cryptosuite.canonize(proof);
}

async function _sha256(string) {
  const bytes = new TextEncoder().encode(string);
  return new Uint8Array(
    await globalThis.crypto.subtle.digest('SHA-256', bytes));
}

function _concat(b1, b2) {
  const rval = new Uint8Array(b1.length + b2.length);
  rval.set(b1, 0);
  rval.set(b2, b1.length);
  return rval;
}
