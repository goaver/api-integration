---
id: check
title: Verification Check (Simple)
sidebar_label: Verification Check (Simple)
---

This resource provides the functioanlity of check creation, status retrieval, results retrieval, and access link generation.

### POST /api/check/create
Creates a new check enrollment

#### Request Parameters
- <b>thirdPartyIdentifier (required)</b> - A unique identifier for this create request to ensure uniqueness and prevent multiple checks being created on your behalf.  This could be a user account number or unique identifier within your existing application or randomly generated.

- <b>groupId (required)</b> - The check group context you want this check to be created under.  (For details on managing your check groups, please see the GoAver.com product documentation)

- <b>email (required)</b> - The e-mail address of the user the check is being created for that will be used to send access links to the user if necessary.

- <b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment). Default is English if this is not provided and users have the option to switch language via the user interface during enrollment.

  * Values:
    * `en` - English
    * `zh-Hans` - Chinese
    * `es` - Spanish
    * `fr` - French

- <b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

- <b>skipPersonalAccessCode (optional)</b> - This option will skip the enrollment step of asking the user to create their own personal access code to access their enrollment.  NOTE: When this option is used, if the user is removed from the enrollment process for any reason (session timeout, error, exit, etc) they will be unable to re-access the enrollment without being provided a new access url from the API caller.  See <a href="/docs/check#post-apicheckidaccesslink">Check Access Link</a> for more information on generating a new link.

- <b>overrideThirdPartyIdentifier (optional)</b> - By default, only one check may be created per third party identifier.  When set, this will allow multiple checks to be created with the given third party identifier.

##### Example Request
```
{
  "groupId":"2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "thirdPartyIdentifier":"123456",
  "email":"someone@somewhere.com",
  "language":"en",
  "returnUrl":"https://www.yoursite.com/page"
}
```

#### Response Parameters
- <b>checkId</b> - The unique identifier of the check 
  
- <b>thirdPartyIdentifier</b> - The third party identifier for the created check (provided above)

- <b>url</b> - The link url to be passed to the user to allow them to access this created enrollment and continue the process

##### Example Response
```
{
"checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
"thirdPartyIdentifier": "123456",
"url": "https://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=a34bdce9b3b2412981f3aac6cb46ee3d&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
```

---
### GET /api/check/{id}
Gets the check information and status for a check using the Aver checkId returned when creating the check<

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call

#### Response Parameters
- <b>id</b> - The unique identifier of the check
  
- <b>organizationId</b> - The parent organization of the check

- <b>groupId</b> - The group the check is in

- <b>thirdPartyIdentifier</b> - The third party identifier for the check

- <b>status</b> - The status of the check

  - See [Get Check Results](/docs/check#get-apicheckidresults "Get Check Results") for values

- <b>checkTypes</b> - The list of check types / verifications performed as part of the check (inherited from the group configuration)

  - See [Get Check Results](/docs/check#get-apicheckidresults "Get Check Results") for values

##### Example Response
```
{
"id": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
"organiationId": "afa22173-6a46-4761-8308-27ad4b211c40",
"groupId": "2d1162b5-d6a8-4936-be84-39ec873b7a60",
"thirdPartyIdentifier": "123456",
"status": "Created",
"checkTypes": [
  "DocumentVerification",
  "EmailVerification",
  "PhotoVerification",
  "AccreditedInvestor",
  "Watchlist",
  "VisualWatchlist",
  "RiskProfiling",
  "AddressVerification"
]
}
```

---
### GET /api/check/getbythirdpartyidentifier/{id}(?all=true)
Gets the check information and status for a check from the third party identifier provided when creating the check

#### Request Parameters
- [Path] <b>id (required)</b> - The third party identifier provided during the check create call
- [QueryString] <b>all (optional</b>) - By default, only the most recent check for the third party identifier will be returned.  To retrieve a list of all existing checks for the third party identifier, append ?all=true to the request url.

#### Response Parameters
- See [Get Check by Id](/docs/check/#get-apicheckid "Get Check by Id")

---
### GET /api/check/{id}/results
Gets the check information and status for a check including all results (if the status is Complete or Failed)

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier for the check returned from the check create call

#### Response Parameters
- <b>id</b> - The unique identifier of the check
  
- <b>organizationId</b> - The parent organization of the check

- <b>groupId</b> - The group the check is in

- <b>thirdPartyIdentifier</b> - The third party identifier for the check

- <b>status</b> - The status of the check

  * Values:
    * `Completed` - The check was able to be completed successfully
    * `Rejected` - The check could not be completed due to invalid or missing data


- <b>statusReason</b> - If the check was rejected, detail as to the reason

  * Values:
		* `MissingDocuments` - Required documents were not provided
		* `UnreadableDocumentsOrMissingVerificationInformation` - Identification documents were unreadable or did not contain the required information
		* `ExpiredDocuments` - Identification documents expired
		* `SuspiciousDocumentsOrImages` - Identification documents were suspected to be stolen or fraudulent
		* `FacialVerificationFailed` - Liveness facial verification failed
		* `UnderageApplicant` - Individual is under the age of 18


- <b>checkTypes</b> - The list of check types / verifications performed as part of the check (inherited from the group configuration)

  * Values:
    * `EmailVerification` - Email verification performed
    * `DocumentVerification` - Identification document verification performed
    * `PhotoVerification` - Liveness verification performed with facial recognition matching
    * `AccreditedInvestor` - Accredited investor verification performed
    * `Watchlist` - Text based watchlist search performed for individual
    * `VisualWatchlist` - Facial match watchlist search performed for individual
    * `RiskProfiling` - Risk profiling performed for individual
    * `AddressVerification` - Address verification performed for individual


- <b>warnings</b> - The warnings found based on the configured warnings in group settings

  * Values:
    * `Country` - Individual is from a restricted country
    * `State` - Individual is from a restricted state or province
    * `IPVpnTor` - Enrollment completed over VPN or TOR
    * `Address` - Address invalid or suspected of fraud
    * `EmailAddress` - Email address is invalid or suspect
    * `WatchlistHitsFound` - Watchlist results found for individual
    * `AdverseMediaFound` - Adverse media results found for individual


- <b>checkResults</b> - The result of the requested checks (see example below for complete data model)

##### Example Response
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

---
### POST /api/check/{id}/accesslink
Generates a new one-time use access link for end users to access their check enrollment.

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier for the check returned from the check create call

- <b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment).  Options are "en"(English), "zh-Hans"(Chinese), and "fr"(French).  Default is English if this is not provided. 

- <b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

##### Example Request
```
{
  "language":"en",
  "returnUrl":"https://www.yoursite.com/page"
}
```

#### Response Parameters
- <b>url</b> - The url for the user to access their check enrollment

##### Example Response
```
{
"url": "http://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=904ec9f005224cbdbe431709c285fb22&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
```
