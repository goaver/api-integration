---
id: readingcheckresults
title: Reading Check Results
sidebar_label: Reading Check Results
---

Reading check results from Aver is simple... summary.

## Check Status

## Check Types


```
{
  "id": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
  "organiationId": "afa22173-6a46-4761-8308-27ad4b211c40",
  "groupId": "2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "thirdPartyIdentifier": "123456",
  "status": "Completed",
  "checkTypes": [
    "DocumentVerification",
    "EmailVerification",
    "PhotoVerification",
    "AccreditedInvestor",
    "Watchlist",
    "VisualWatchlist",
    "RiskProfiling",
    "AddressVerification"
  ],
  "checkResults": {
    "watchlistSearchId": "207e458b-1ad0-4e8d-a05b-13dfcd29d199",
    "attestations": {
      "accreditedInvestor": true,
      "over18": true,
      "over21": true
    },
    "personalInformation": {
      "email": "someone@somewhere.com",
      "firstName": "Some",
      "middleName": null,
      "lastName": "One",
      "gender": "M",
      "dateOfBirth": "12/03/1980",
      "stateProvince": "California",
      "country": "US"
    },
    "identificationDocument": {
      "type": "NADriverLicense",
      "frontId": "03f3795877c743c3807259e269ee1152",
      "backId": "6eae803539074522a720e15c2c392eb8",
      "expirationDate": "12/03/2020",
      "documentNumber": "CA222307"
    },
    "photoVerification": {
      "id": "58453080357e4e75b1d7b070b2501b07",
      "type": "CamPhoto"
    },
    "addressVerification": {
      "validAddress": false,
      "reportedFraud": false,
      "streetAddress1": "1234 Main St",
      "streetAddress2": null,
      "city": "San Diego",
      "stateOrProvince": "California",
      "postalCode": "22434",
      "country": "US"
    },
    "riskProfile": {
      "facialMatchConfidence": 100,
      "ipAndDeviceAnalysisResults": {
        "vpnOrTor": false,
        "ip": null,
        "fraudScore": 0,
        "recentAbuse": false,
        "isp": null,
        "host": null,
        "timezone": null,
        "localTime": null,
        "position": null,
        "country": null,
        "city": null,
        "state": null,
        "operatingSystem": null,
        "browser": null,
        "deviceBrand": null,
        "deviceModel": null
      },
      "emailAnalysisResults": {
        "overallScore": 1,
        "suspect": false,
        "validAddress": false,
        "temporaryDisposable": false,
        "catchAllShared": false,
        "honeyPotSpamTrap": true,
        "recentAbuse": false,
        "commonProvider": false,
        "deliverability": "medium",
        "validDNSConfig": false,
        "smtpConfigScore": 1,
        "frequentComplainer": true
      }
    }
  },
  "warnings": [
    "country",
    "state"
  ]
}
```
