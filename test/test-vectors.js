/*!
 * Copyright (c) 2023-2026 Digital Bazaar, Inc.
 */
/* Note: This file contains data generated from the mldsa44-jcs-2024
test vectors. */

/* eslint-disable @stylistic/max-len */
/* eslint-disable @stylistic/quote-props */
/* eslint-disable @stylistic/quotes */
export const mldsaFixtures = [{
  nistSecurityLevel: 2,
  keyMaterial: {
    id: 'https://example.edu/issuers/565049#zQmawLbWnRPXEYtgjsXW3QCuvkLeSTB6egTNe4B58oiFMTN',
    controller: 'https://example.edu/issuers/565049',
    publicKeyMultibase: "ukCTVqTw8MmpCy0cyg_gdrrCc1SihRFInzHHRdpD7OuE2GoteuGqkLvNzZBIrhB39aCGKkgpJFA9TECV-KbdbTsxDVhNzrCep-S9fKmJSh3ZoigoY7FUsuHDTt2qVZBk_RZZDF735dG8F_whpxorHHalgXl5BGI7tKxyQ05vKRwX1T_DSIaRyVKvRNij8AQZZS46J6Ay2WhyptlolNs9bjPG2RpN_fnwwX-AmpM_J2JLbLZsKqF9gJmNXu7iDti7AtC-OEZudLzMpRBMd9cO_nTGvi4_I0F8r2jl8Hv-7d3cUVaqCv9XfkkiJZxuGcztrZbyiTeZ1PJ67TbmraMEt6otg6JM5HWqcLsgAHd47aap9XiGbGeODPU0BEmRWb5zPc-EuMHu1KasuF9LsBgIgx3ITiDZGN8K3JPo3Xnfbwyzi8atmXW6isS4r44pkTS3elkM8a-18Jao-7fba9o9KQAQDacKHpDCa3EPtFv_0Pu8PMYiG36eXUSjpspmEEMcFjGzFZz3Oz1-xETpKiTQpr4g2Z1kbj8XSn7QmVaoxsrxNeLEKyUigFR5kF-92BwGiPDbhHA2m58x4wMZcY1A557y4hkUpTVbToxJ40w_pqYcBP_y2wnTjKdgBEtnRdbgQHQJDwOUYAgG2xIb3zgIEBoizrjl7wyfP4Wqrb0mxI3SoHvb1eSolckMTLKnCk76KHsgMca2pm-Mamleot1AG3tAjnTtWHt9PFy24C-fd6_JzDa-P6UczhoBFoMQLWmflzrDBTq4c3GwcqW-aCSSax4cvg0hUEc_vyNeV8EPg401SFDeJ71MrY17KHjMMnnBgQ_q50CzSSfm9klwhlC_hGX6afN2nOI4JVl56mA689hqstQC6YRLrgdCMoukgHPocX06rce9WFDWP2aj3mIxUh7krSsCbtb56TZPTb9Rh1GkgDkWmljQKY6tKxKNoiFJLBxii9lNAGT3rwDAp1Bl303MubANGx88zNqpO25hkFMLwwO4YnNOCGYiyN57F4ZzmOknRtJxMMZ0FCsMDhTfoig4UvvPEku48gVY90kcNAlqWL9RwDfOL6baKcERVcgDtzUmEbDjMBDDKYLf6DA6tA6Wb1u9_I1V9KxTw-v-4LohUUU8b1ZyaqQ5n7zv9iYqgY5NTZFNcz0CPHQHlXzlolSCNJxMHDLqbS9Q6iivTbNonc-_jdYiiMViDW6l5371NCYrnBnWawnnBur5DBEdDFmF6I34wCrNbaOIZfRIpoJemm0X2F_edX6ZONBHt2LtWsvKP-ovE72s_-gM7u2XePl9TjgCEuTJqO-Ixok1mCqXLP3fHR72hXcSKmST95AQIYwcfPK0b4kbk6N6o6X3HP6Ut2b3HudP71o5YzTwKnugXqw6WXjx6gC2Ctrpn3O01nS-9u8PJQzKyaVn6A4rgFq08Jj0DR0YjV5lakYvYSaI3Fz-Nzzot9JgCPXrOBzqRxkuEjdap0lnOinPSjozYKLZsX_Q0S2jUGbTcF5B0YOxowwIbdauT0wZ3L3RL5FEzc0rtU63p_6ZxB_MXSnxJsBOv0ONdSNlxmJrSXQRDZHtiB0UKKPHtCucOKf4cYtHnH1SLTxpq854WI1MXtHZbCMCSbyDJBKCaV0fRk7OnIu1KyqfplQ5vbCsf54440GL_Gv-0vtfjiIZqIAtFC6a3BBEyyjshczqP7rTTuy3pJzKtsCenrrPi_lhgzi-8ww1gEQGBIkHoogoPRArPZGGh1mo7",
    secretKeyMultibase: "umiYgr1lhXtNROU7_wgoyaVc3nqkO5pF78hBBLrwoZBdLbQ"
  },
  signedFixture: {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      {
        "AlumniCredential": "https://schema.org#AlumniCredential",
        "alumniOf": "https://schema.org#alumniOf"
      },
      "https://w3id.org/security/data-integrity/v2"
    ],
    "id": "http://example.edu/credentials/1872",
    "type": [
      "VerifiableCredential",
      "AlumniCredential"
    ],
    "issuer": "https://example.edu/issuers/565049",
    "issuanceDate": "2010-01-01T19:23:24Z",
    "credentialSubject": {
      "id": "https://example.edu/students/alice",
      "alumniOf": "Example University"
    },
    "proof": {
      "type": "DataIntegrityProof",
      "created": "2023-03-01T21:29:24Z",
      "verificationMethod": "https://example.edu/issuers/565049#zQmawLbWnRPXEYtgjsXW3QCuvkLeSTB6egTNe4B58oiFMTN",
      "cryptosuite": "mldsa44-jcs-2024",
      "proofPurpose": "assertionMethod",
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
          "AlumniCredential": "https://schema.org#AlumniCredential",
          "alumniOf": "https://schema.org#alumniOf"
        },
        "https://w3id.org/security/data-integrity/v2"
      ],
      "proofValue": "uPFIiR0E1TPB1WkkzS5Miq3Eb3Bfrzrj10IrOvFB_yWaauq5EJD9RWVhqMLG5jtFG2M6oVU3kqJovClacq2MkbsI8JXwKJXN9OOz-qWkvE27MPmVdv-iivPBfBQtVQW7uxo7a2WMymfwkS3mdCggSAgn-1db-V0jy0PuZilO3wQy9BIpW_ZSY9P7lWbqmLRpdPnwj7NKNcMh8UuuXEm1zGZ1sR9-mmgWMKkKjJb0mE3zaEOlyjcCaMijN2EPXb5Tu7FUbXHJhC_fn2Le1rkJDqa7ynJcV_xaaioQQgEJ4D1ZJ8LExNN_CIH7ZClChLO4oITdXtzIrMP_Bp1T2lnhH2h9ADj_jCBCJ0M80VHwtOe9qAfTnx8OZUuaO-qdx2uC4Jy35XG4T0ET3_cY476fJqnC4ybre-qnKTe-88pbniPCCXkEYEmJSmfhWfoGLIP4eqCJsgzDXvVrOihHK3oYsHqR1-bikArePzH9-jDDT7tYTEJc6kQ_ACiYdlG7gUwTNqfSQiFYdhj7ab5JwnwCMqURF38twhE5HNNvcISBuEOEG-k-wUni4woNZ0AutDIOkHJ6V5UxbniuPgpmrFfS_Alpawwp0i43vU05O4WnU0jA2C6vecWl9uXSYz5wzN3q4MQ5MqrL--sdmJJ8BPVqYwQJyNqzJVw3YSi8OyK1GshGgC4R4mGZ1ifKBdFx8WXGLWBv2R_GgAt3pyA3xBaQALBEPC7n3VrfLMhhM4mzc6-HbPirTWboWT7pWpluJL8rTgC9f4J_kDjHmTH4YdcZqnL524ROQmJJDPFF7JWsvbEG6S_c-4A21lWd1Zrv59YjL71tzj_0VaNyjOgZz7vgQJe04TJ-jKdOAkRiiOAIwYhbWJcxejbkoO-gH8Sc9BvXKFD6g7ud3rQuLdUQ3vZMs41XdFvnErGu4lG7Ra4qBHp6_5KZNqDAO4TACV19PnoReoYq2e88dR588-AqRb8H6jd0FBDuDb6MAL3eIiCibG8_KSrsIbJWx-aoJU1m9lrD-Wk36aX62hNUHNqUenUgsyU6lIIyXL2Kpo0WZEy-w_FMIJhJ2JHdw4ITwjN9KxpaeV90Oj6_ZB-HS-ThFhQ5ag_FoZBqBLKegQdhMy1Qw2nLQ4L--Gy0eZwXb90K8PBalJ1HZW8uVjzHbmq57d1KMPKoAu5XAyedIsqPpXuZdD3G8Nm-k10OgQtAQXPWa_YujNP4yHexnm3H2pKQByOke-Bzr5cTJPTZDBaX16A_sjgsO7kCYZBtnrjyLQBdd_Y5anxFPMuaz2w7QngbIHmbz1STJLcfdPIVhvvwTTYLBiq7oBd8FaJ7JoFphRYwcStzYEhImmaK3vvGOE_2pIMzlaluPz1XLnzoUGjMId-OGLc2gYNPqH9YUk4x2_G1Isih2FN6Mo_mDdact6hrkuFXt1x_DfMnbxDakCTVfro_DwGj8fG_elN6TpUhOWmT6s4a6lUUnefBJ59NEf31OIg6EgfhUd3NsmL-MjPyG4koKXZfIoVBzNLoBpN-U1MFJ8KyrOBiswBfsgvsLgTg0rJRjtLKpW5tRoZlKx5VlI-hk-mn8H4hMrT5DLTE-H3xpHzpxniGg7OUC-M9fowjguXxFkwzm2J05vpEXURGoCGS6JA_Gm_nLHGVQLg4B4Xmcpkwcxt5m6njEF7Mis1xir1VI3qilpO3DwX0U78ixH1_IugUGZ2V3j10aVT4LDfMqVdb6AofZZPP70sYpxLSwbqbIKxYiKMcjmofdl_Mu2f6UDSCmGwJzJnhgLE4c7iD3a-JaVZVapMrcT71bcVou2bIcV81-vfGuzTiqW_l-ImQUDUoNiW9FOKJthW_pGWhybxm56wtQuIfxn2wb_ugIO6WXTJIh5IXGpiPtw2hoagSN9c1MqPZgO6c6aQJaadq5Zjx8RTcMovZ1o5HcmDkGOmLTtD7Gi-oxfUtn--QKmyGBqRS0Oj7G3jC1b6xyczwHOmg6ja9wmhT8NBUMslM1-6if6AoRLBxEYpuDwo_wh4RSIvcWje-JIPqzw29jQXSF_is37hws1FD06e8uF6B-rVwFGvamxkKU549NZxXgBemmkR3BWLhDQdafGkWUO7liYlckXKKzii-oFdk2ZhaygOUwt7N2u4CA5j96YD7tUIOA9Od3PqLLxsjn52eOPhKxEDm8pqztEVzperQl5YvzpbB1cjmIHRrnnTqi6sOBf7bbd6bVoOCY8e_aRHCn4YP_u1ksg4hPXMcr1h95IEijXnz_S_5-T1URQPVNMfHIhAumH03Bb6XUVqYbr0Upzb1FYgQe3k_rNL_rCVQydAHD_pExEcr_o8sJwPMZCzedzIAyenJYM_-Nq_3p5qhKA15zY0SpgmcAqPSD5sXPy_WAXaP0YgYYj2iclWYBoHyOsVEvok7aZSq9uFqojgzl7PcZHV1sH4KVn5FwEymkb8W9_uVw2SmMXAnvb3QZNtnL5T8_imni_vVvANY63dtbtjN3r2TwSzbNaws1NnqV76Y_rlsMiM_NbOKqGNntVXY0k7s-4hYCzSQUZyFC1k-jHA6-gTeZ-l0ONDN4zg6JLZoiwJVw8TpRYQDN04qGMlUn30sxMSDhka7VS_20gJ2vt0lMbXlwYzChSvRsh6_1MWK2a_zKRarq-wmgd44-05hbvZoXNazGJ2bAl0kO6gt2vMEUH5h5yckpNswKI5YnH2NYvBpGEpCDk0lzgXIwFGPYv6imaC4lc_Z6bF-cs3nwk_oHemUr9piXt0aAO-7eaqFaeVDZNZtPEhttKMJtOgo-EMX_J_z8h_C1Cl_4LsjCkDAwny9DJeb9q0k5N7BjALnskp9TGVCW-HnJuC-A_BWgOqOzIO5RKswvSec1SUmrWcdcJJrf0-GBBaoasmGwCBCLDF-kK_N9AKkppEqgKQQNpTvE7dzoADs6i_lIjQD-pc_u0D1JCy-Ot-9JnaF71-5emGRVuN96-wBS2A1GlFte-shJDlkE0eNM_jRfRCOZbTvhfIacodzkyRMWTawaiW1gLNEurCWARIbMn4jRB4pry6RkNw7CGoDIgMSqKYTIEeap5L4ftJaMWDYUnQgG7r-jDMSMJzlDcvkQOnRUwM430vslK2ELGyk3PVRWe4maqbHAz_4UKl1xd4mPmJvIzc7a6_IKIiNdXnp8pdPvERIUMD1ERkpSWWxtbnV8f42dpK68ydHhAAAAAAAAAAAAAAAAAAAAAA8eKEA"
    }
  }
}];
/* eslint-enable @stylistic/quotes */
/* eslint-enable @stylistic/quote-props */
/* eslint-enable @stylistic/max-len */
