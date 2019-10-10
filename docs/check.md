# Check (/api/check)
<p>This resource will allow the creation and retrieval of check enrollments and access links</p>

---
## POST /api/check/create
<p>Creates a new check enrollment</p>

### Request Parameters
- <b>thirdPartyIdentifier (required)</b> - A unique identifier for this create request to ensure uniqueness and prevent multiple checks being created on your behalf.  This could be a user account number or unique identifier within your existing application or randomly generated.

- <b>groupId (required)</b> - The check group context you want this check to be created under.  (For details on managing your check groups, please see the GoAver.com product documentation)

- <b>email (required)</b> - The e-mail address of the user the check is being created for that will be used to send access links to the user if necessary.

- <b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment).  Options are "en"(English), "zh-Hans"(Chinese), and "fr"(French).  Default is English if this is not provided. 

- <b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

#### Example Request
<pre>
{
  "groupId":"2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "thirdPartyIdentifier":"123456",
  "email":"someone@somewhere.com",
  "language":"en",
  "returnUrl":"https://www.yoursite.com/page"
}
</pre>

### Response Parameters
- <b>checkId</b> - The unique identifier of the check 
  
- <b>thirdPartyIdentifier</b> - The third party identifier for the created check (provided above)

- <b>url</b> - The link url to be passed to the user to allow them to access this created enrollment and continue the process

#### Example Response
<pre>
{
"checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
"thirdPartyIdentifier": "123456",
"url": "https://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=a34bdce9b3b2412981f3aac6cb46ee3d&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
</pre>

---
## GET /api/check/{id}
<p>Gets the check information and status for a check using the Aver checkId returned when creating the check</p>

### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call

### Response Parameters
- <b>id</b> - The unique identifier of the check
  
- <b>organizationId</b> - The parent organization of the check

- <b>groupId</b> - The group the check is in

- <b>status</b> - The status of the check

- <b>statusReason</b> - If the check was rejected, detail as to the reason (unreadable documents, underage, etc)

- <b>checkTypes</b> - The list of check types / verifications performed as part of the check 

#### Example Response
<pre>
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
</pre>

---
## GET /api/check/getbythirdpartyidentifier/{id}
<p>Gets the check information and status for a check from the third party identifier provided when creating the check</p>

### Request Parameters
- [Path] <b>id (required)</b> - The third party identifier provided during the check create call

### Response Parameters
- <b>id</b> - The unique identifier of the check
  
- <b>organizationId</b> - The parent organization of the check

- <b>groupId</b> - The group the check is in

- <b>status</b> - The status of the check

- <b>statusReason</b> - If the check was rejected, detail as to the reason (unreadable documents, underage, etc)

- <b>checkTypes</b> - The list of check types / verifications performed as part of the check 

#### Example Response
<pre>
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
</pre>

---
## GET /api/check/{id}/results
<p>Gets the check information and status for a check including all results (if the status is Complete or Failed)</p>

### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier for the check returned from the check create call

### Response Parameters
- <b>id</b> - The unique identifier of the check
  
- <b>organizationId</b> - The parent organization of the check

- <b>groupId</b> - The group the check is in

- <b>status</b> - The status of the check

- <b>checkTypes</b> - The list of check types / verifications performed as part of the check

- <b>checkResults</b> - The result of the requested checks

#### Example Response
<pre>
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
      "type": "USALicenseIdCard",
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
  }
}
</pre>

---
## POST /api/check/{id}/accesslink
<p>Generates a new one-time use access link for end users to access their check enrollment.</p>

### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier for the check returned from the check create call

- <b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment).  Options are "en"(English), "zh-Hans"(Chinese), and "fr"(French).  Default is English if this is not provided. 

- <b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

#### Example Request
<pre>
{
  "language":"en",
  "returnUrl":"https://www.yoursite.com/page"
}
</pre>

### Response Parameters
- <b>url</b> - The url for the user to access their check enrollment

#### Example Response
<pre>
{
"url": "http://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=904ec9f005224cbdbe431709c285fb22&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
</pre>
