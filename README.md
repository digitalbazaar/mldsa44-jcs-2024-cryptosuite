# ML-DSA JCS 2024 Data Integrity Cryptosuite _(@digitalbazaar/mldsa44-jcs-2024-cryptosuite)_

> ML-DSA JCS 2024 Data Integrity Cryptosuite for use with jsonld-signatures.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

For use with https://github.com/digitalbazaar/jsonld-signatures v11.0 and above.

This cryptosuite uses the JSON Canonicalization Scheme (JCS) instead of RDF
Dataset Canonicalization (RDFC). As a result, documents are signed as JSON
objects rather than as normalized RDF n-quads, which means undefined terms and
relative type URLs are not rejected during signing.

See also related specs:

* [Verifiable Credential Data Integrity](https://w3c.github.io/vc-data-integrity/)

## Security

As with any cryptographic implementation, the security of this library depends
on correct key management. Secret keys must be protected and never transmitted
or stored in plaintext. The ML-DSA-44 algorithm provides NIST security level 2
post-quantum security.

Note that JCS canonicalization does not validate JSON-LD terms or relative
URLs before signing. Implementers who require strict JSON-LD validation should
use the `mldsa44-rdfc-2024-cryptosuite` instead.

## Install

This software requires and supports maintained recent versions of Node.js and
browsers. Updates may remove support for older unmaintained platform versions.
Please use dependency version lock files and testing to ensure compatibility
with this software.

To install from NPM:

https://www.npmjs.com/package/@digitalbazaar/mldsa44-jcs-2024-cryptosuite.git

```sh
npm install @digitalbazaar/mldsa44-jcs-2024-cryptosuite
```

To install locally (for development):

```sh
git clone https://github.com/digitalbazaar/mldsa44-jcs-2024-cryptosuite.git
cd mldsa44-jcs-2024-cryptosuite
npm install
```

## Usage

The following code snippet provides a complete example of digitally signing
a verifiable credential using this library:

```javascript
import * as MldsaMultikey from '@digitalbazaar/mldsa-multikey';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as mldsa44Jcs2024Cryptosuite} from
  '@digitalbazaar/mldsa44-jcs-2024-cryptosuite';
import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;


// create the unsigned credential
const unsignedCredential = {
  '@context': [
    'https://www.w3.org/ns/credentials/v2',
    'https://www.w3.org/ns/credentials/examples/v2'
  ],
  id: 'http://university.example/credentials/58473',
  type: ['VerifiableCredential', 'ExampleAlumniCredential'],
  issuer: 'did:example:2g55q912ec3476eba2l9812ecbfe',
  validFrom: '2010-01-01T00:00:00Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: {
      id: 'did:example:c276e12ec21ebfeb1f712ebc6f1',
      name: 'Example University'
    }
  }
};

// create the keypair to use when signing
const controller = 'https://example.edu/issuers/565049';
const keyPair = await MldsaMultikey.from({
  '@context': 'https://w3id.org/security/multikey/v1',
  id: 'https://example.edu/issuers/565049#zQmawLbWnRPXEYtgjsXW3QCuvkLeSTB6egTNe4B58oiFMTN',
  type: 'Multikey',
  controller: 'https://example.edu/issuers/565049',
  publicKeyMultibase: 'ukCTVqTw8MmpCy0cyg_gdrrCc1SihRFInzHHRdpD7OuE2GoteuGqkLvNzZBIrhB39aC' +
    'GKkgpJFA9TECV-KbdbTsxDVhNzrCep-S9fKmJSh3ZoigoY7FUsuHDTt2qVZBk_RZZDF' +
    '735dG8F_whpxorHHalgXl5BGI7tKxyQ05vKRwX1T_DSIaRyVKvRNij8AQZZS46J6Ay2W' +
    'hyptlolNs9bjPG2RpN_fnwwX-AmpM_J2JLbLZsKqF9gJmNXu7iDti7AtC-OEZudLzMpR' +
    'BMd9cO_nTGvi4_I0F8r2jl8Hv-7d3cUVaqCv9XfkkiJZxuGcztrZbyiTeZ1PJ67TbmraM' +
    'Et6otg6JM5HWqcLsgAHd47aap9XiGbGeODPU0BEmRWb5zPc-EuMHu1KasuF9LsBgIgx3I' +
    'TiDZGN8K3JPo3Xnfbwyzi8atmXW6isS4r44pkTS3elkM8a-18Jao-7fba9o9KQAQDacKHp' +
    'DCa3EPtFv_0Pu8PMYiG36eXUSjpspmEEMcFjGzFZz3Oz1-xETpKiTQpr4g2Z1kbj8XSn7' +
    'QmVaoxsrxNeLEKyUigFR5kF-92BwGiPDbhHA2m58x4wMZcY1A557y4hkUpTVbToxJ40w_' +
    'pqYcBP_y2wnTjKdgBEtnRdbgQHQJDwOUYAgG2xIb3zgIEBoizrjl7wyfP4Wqrb0mxI3So' +
    'Hvb1eSolckMTLKnCk76KHsgMca2pm-Mamleot1AG3tAjnTtWHt9PFy24C-fd6_JzDa-P6U' +
    'czhoBFoMQLWmflzrDBTq4c3GwcqW-aCSSax4cvg0hUEc_vyNeV8EPg401SFDeJ71MrY17KH' +
    'jMMnnBgQ_q50CzSSfm9klwhlC_hGX6afN2nOI4JVl56mA689hqstQC6YRLrgdCMoukgHPo' +
    'cX06rce9WFDWP2aj3mIxUh7krSsCbtb56TZPTb9Rh1GkgDkWmljQKY6tKxKNoiFJLBxii9' +
    'lNAGT3rwDAp1Bl303MubANGx88zNqpO25hkFMLwwO4YnNOCGYiyN57F4ZzmOknRtJxMMZ0F' +
    'CsMDhTfoig4UvvPEku48gVY90kcNAlqWL9RwDfOL6baKcERVcgDtzUmEbDjMBDDKYLf6DA6' +
    'tA6Wb1u9_I1V9KxTw-v-4LohUUU8b1ZyaqQ5n7zv9iYqgY5NTZFNcz0CPHQHlXzlolSCNJ' +
    'xMHDLqbS9Q6iivTbNonc-_jdYiiMViDW6l5371NCYrnBnWawnnBur5DBEdDFmF6I34wCrNba' +
    'OIZfRIpoJemm0X2F_edX6ZONBHt2LtWsvKP-ovE72s_-gM7u2XePl9TjgCEuTJqO-Ixok1m' +
    'CqXLP3fHR72hXcSKmST95AQIYwcfPK0b4kbk6N6o6X3HP6Ut2b3HudP71o5YzTwKnugXqw6' +
    'WXjx6gC2Ctrpn3O01nS-9u8PJQzKyaVn6A4rgFq08Jj0DR0YjV5lakYvYSaI3Fz-Nzzot9J' +
    'gCPXrOBzqRxkuEjdap0lnOinPSjozYKLZsX_Q0S2jUGbTcF5B0YOxowwIbdauT0wZ3L3RL5' +
    'FEzc0rtU63p_6ZxB_MXSnxJsBOv0ONdSNlxmJrSXQRDZHtiB0UKKPHtCucOKf4cYtHnH1SL' +
    'Txpq854WI1MXtHZbCMCSbyDJBKCaV0fRk7OnIu1KyqfplQ5vbCsf54440GL_Gv-0vtfjiIZq' +
    'IAtFC6a3BBEyyjshczqP7rTTuy3pJzKtsCenrrPi_lhgzi-8ww1gEQGBIkHoogoPRArPZGGh1mo7',
  secretKeyMultibase: 'umiYgr1lhXtNROU7_wgoyaVc3nqkO5pF78hBBLrwoZBdLbQ'
});

// export public key and add to document loader
const publicKey = await keyPair.export({publicKey: true, includeContext: true});
addDocumentToLoader({url: publicKey.id, document: publicKey});

// create key's controller document
const controllerDoc = {
  '@context': [
    'https://www.w3.org/ns/did/v1',
    'https://w3id.org/security/multikey/v1'
  ],
  id: controller,
  assertionMethod: [publicKey]
};
addDocumentToLoader({url: controllerDoc.id, document: controllerDoc});

// create suite
const suite = new DataIntegrityProof({
  signer: keyPair.signer(), cryptosuite: mldsa44Jcs2024Cryptosuite
});

// create signed credential
const signedCredential = await jsigs.sign(unsignedCredential, {
  suite,
  purpose: new AssertionProofPurpose(),
  documentLoader
});

// results in the following signed VC
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://www.w3.org/ns/credentials/examples/v2"
  ],
  "id": "http://university.example/credentials/58473",
  "type": ["VerifiableCredential", "ExampleAlumniCredential"],
  "issuer": "did:example:2g55q912ec3476eba2l9812ecbfe",
  "validFrom": "2010-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": {
      "id": "did:example:c276e12ec21ebfeb1f712ebc6f1",
      "name": "Example University"
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "created": "2023-03-01T21:29:24Z",
    "verificationMethod": "https://example.edu/issuers/565049#zQmawLbWnRPXEYtgjsXW3QCuvkLeSTB6egTNe4B58oiFMTN",
    "cryptosuite": "mldsa44-jcs-2024",
    "proofPurpose": "assertionMethod",
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "https://www.w3.org/ns/credentials/examples/v2"
    ],
    "proofValue": "u..."
  }
}
```

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © 2026 Digital Bazaar
