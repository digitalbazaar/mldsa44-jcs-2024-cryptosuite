/*!
 * Copyright (c) 2023-2026 Digital Bazaar, Inc.
 */
import {expect} from 'chai';

import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;
import {
  credential,
  mldsaMultikeyKeyPair
} from './mock-data.js';

import * as MldsaMultikey from '@digitalbazaar/mldsa-multikey';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as mldsa44JcsCryptosuite} from '../lib/index.js';

import {loader} from './documentLoader.js';

const documentLoader = loader.build();

describe('Mldsa44JcsCryptosuite', () => {
  describe('exports', () => {
    it('it should have proper exports', async () => {
      should.exist(mldsa44JcsCryptosuite);
      mldsa44JcsCryptosuite.name.should.equal('mldsa44-jcs-2024');
      mldsa44JcsCryptosuite.requiredAlgorithm.should.eql(['ML-DSA-44']);
      mldsa44JcsCryptosuite.canonize.should.be.a('function');
      mldsa44JcsCryptosuite.createVerifier.should.be.a('function');
      mldsa44JcsCryptosuite.createVerifyData.should.be.a('function');
    });
  });

  describe('canonize()', () => {
    it('should canonize using JCS', async () => {
      const unsignedCredential = JSON.parse(JSON.stringify(credential));

      let result;
      let error;
      try {
        result = await mldsa44JcsCryptosuite.canonize(unsignedCredential);
      } catch(e) {
        error = e;
      }

      expect(error).to.not.exist;
      expect(result).to.exist;
      /* eslint-disable max-len */
      const expectedResult =
        '{"@context":["https://www.w3.org/2018/credentials/v1",' +
        '{"AlumniCredential":"https://schema.org#AlumniCredential",' +
        '"alumniOf":"https://schema.org#alumniOf"},' +
        '"https://w3id.org/security/data-integrity/v2"],' +
        '"credentialSubject":{"alumniOf":"Example University",' +
        '"id":"https://example.edu/students/alice"},' +
        '"id":"http://example.edu/credentials/1872",' +
        '"issuanceDate":"2010-01-01T19:23:24Z",' +
        '"issuer":"https://example.edu/issuers/565049",' +
        '"type":["VerifiableCredential","AlumniCredential"]}';
      /* eslint-enable max-len */
      result.should.equal(expectedResult);
    });
  });

  describe('createVerifier()', () => {
    it('should create a verifier with ML-DSA Multikey', async () => {
      let verifier;
      let error;
      try {
        verifier = await mldsa44JcsCryptosuite.createVerifier({
          verificationMethod: mldsaMultikeyKeyPair
        });
      } catch(e) {
        error = e;
      }

      expect(error).to.not.exist;
      expect(verifier).to.exist;
      verifier.algorithm.should.equal('ML-DSA-44');
      verifier.id.should.equal(mldsaMultikeyKeyPair.id);
      verifier.verify.should.be.a('function');
    });

    it('should fail to create a verifier w/ unsupported key type', async () => {
      let verifier;
      let error;
      const keyPair = await MldsaMultikey.from({
        key: {...mldsaMultikeyKeyPair}
      });
      keyPair.type = 'BadKeyType';
      try {
        verifier = await mldsa44JcsCryptosuite.createVerifier({
          verificationMethod: keyPair
        });
      } catch(e) {
        error = e;
      }

      expect(error).to.exist;
      expect(verifier).to.not.exist;
      error.message.should.include('BadKeyType');
    });
  });

  describe('sign()', () => {
    it('should sign a document', async () => {
      const unsignedCredential = JSON.parse(JSON.stringify(credential));
      const keyPair = await MldsaMultikey.from({
        key: {...mldsaMultikeyKeyPair}
      });
      const date = '2026-04-12T21:29:24Z';
      const suite = new DataIntegrityProof({
        signer: keyPair.signer(), date,
        cryptosuite: mldsa44JcsCryptosuite
      });

      let error;
      try {
        await jsigs.sign(unsignedCredential, {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader
        });
      } catch(e) {
        error = e;
      }

      expect(error).to.not.exist;
    });

    it(
      'should still sign even with undefined term as JCS does not check terms',
      async () => {
        const unsignedCredential = JSON.parse(JSON.stringify(credential));
        unsignedCredential.undefinedTerm = 'foo';

        const keyPair = await MldsaMultikey.from({
          key: {...mldsaMultikeyKeyPair}
        });
        const date = '2026-04-12T21:29:24Z';
        const suite = new DataIntegrityProof({
          signer: keyPair.signer(), date,
          cryptosuite: mldsa44JcsCryptosuite
        });

        let error;
        try {
          await jsigs.sign(unsignedCredential, {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader
          });
        } catch(e) {
          error = e;
        }

        expect(error).to.not.exist;
      });

    it(
      'should still sign even with relative type URL as JCS does not check ' +
      'relative type URL',
      async () => {
        const unsignedCredential = JSON.parse(JSON.stringify(credential));
        unsignedCredential.type.push('UndefinedType');

        const keyPair = await MldsaMultikey.from({
          key: {...mldsaMultikeyKeyPair}
        });
        const date = '2026-04-12T21:29:24Z';
        const suite = new DataIntegrityProof({
          signer: keyPair.signer(), date,
          cryptosuite: mldsa44JcsCryptosuite
        });

        let error;
        try {
          await jsigs.sign(unsignedCredential, {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader
          });
        } catch(e) {
          error = e;
        }

        expect(error).to.not.exist;
      });

    it('should fail to sign with incorrect signer algorithm', async () => {
      const keyPair = await MldsaMultikey.from({
        key: {...mldsaMultikeyKeyPair}
      });
      const date = '2026-04-12T21:29:24Z';
      const signer = keyPair.signer();
      signer.algorithm = 'wrong-algorithm';

      let error;
      try {
        new DataIntegrityProof({
          signer, date, cryptosuite: mldsa44JcsCryptosuite
        });
      } catch(e) {
        error = e;
      }

      const errorMessage = `The signer's algorithm "${signer.algorithm}" ` +
        `is not a supported algorithm for the cryptosuite. The supported ` +
        `algorithms are: ` +
        `"${mldsa44JcsCryptosuite.requiredAlgorithm.join(', ')}".`;

      expect(error).to.exist;
      expect(error.message).to.equal(errorMessage);
    });
  });

  describe('verify()', () => {
    let signedCredential;

    before(async () => {
      const unsignedCredential = JSON.parse(JSON.stringify(credential));

      const keyPair = await MldsaMultikey.from({
        key: {...mldsaMultikeyKeyPair}
      });
      const date = '2026-04-12T21:29:24Z';
      const suite = new DataIntegrityProof({
        signer: keyPair.signer(), date,
        cryptosuite: mldsa44JcsCryptosuite
      });

      signedCredential = await jsigs.sign(unsignedCredential, {
        suite,
        purpose: new AssertionProofPurpose(),
        documentLoader
      });
    });

    it('should verify a document', async () => {
      const suite = new DataIntegrityProof({
        cryptosuite: mldsa44JcsCryptosuite
      });
      const result = await jsigs.verify(signedCredential, {
        suite,
        purpose: new AssertionProofPurpose(),
        documentLoader
      });

      expect(result.verified).to.be.true;
    });

    it('should fail verification if "proofValue" is not string', async () => {
      const suite = new DataIntegrityProof({
        cryptosuite: mldsa44JcsCryptosuite
      });
      const signedCredentialCopy =
        JSON.parse(JSON.stringify(signedCredential));
      // intentionally modify proofValue type to not be string
      signedCredentialCopy.proof.proofValue = {};

      const result = await jsigs.verify(signedCredentialCopy, {
        suite,
        purpose: new AssertionProofPurpose(),
        documentLoader
      });

      const {error} = result.results[0];

      expect(result.verified).to.be.false;
      expect(error.name).to.equal('TypeError');
    });

    it('should fail verification if "proofValue" is not given', async () => {
      const suite = new DataIntegrityProof({
        cryptosuite: mldsa44JcsCryptosuite
      });
      const signedCredentialCopy =
        JSON.parse(JSON.stringify(signedCredential));
      // intentionally modify proofValue to be undefined
      signedCredentialCopy.proof.proofValue = undefined;

      const result = await jsigs.verify(signedCredentialCopy, {
        suite,
        purpose: new AssertionProofPurpose(),
        documentLoader
      });

      const {error} = result.results[0];

      expect(result.verified).to.be.false;
      expect(error.name).to.equal('TypeError');
    });

    it('should fail verification if proofValue string does not start with "u"',
      async () => {
        const suite = new DataIntegrityProof({
          cryptosuite: mldsa44JcsCryptosuite
        });
        const signedCredentialCopy =
          JSON.parse(JSON.stringify(signedCredential));
        signedCredentialCopy.proof.proofValue = 'a';

        const result = await jsigs.verify(signedCredentialCopy, {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader
        });

        const {errors} = result.error;

        expect(result.verified).to.be.false;
        expect(errors[0].name).to.equal('Error');
      }
    );

    it('should fail verification if proof type is not DataIntegrityProof',
      async () => {
        const suite = new DataIntegrityProof({
          cryptosuite: mldsa44JcsCryptosuite
        });
        const signedCredentialCopy =
          JSON.parse(JSON.stringify(signedCredential));
        signedCredentialCopy.proof.type = 'InvalidSignature2100';

        const result = await jsigs.verify(signedCredentialCopy, {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader
        });

        const {errors} = result.error;

        expect(result.verified).to.be.false;
        expect(errors[0].name).to.equal('NotFoundError');
      });
  });
});
