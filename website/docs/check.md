---
id: check
title: Verification Check
sidebar_label: Verification Check
---

A Verification Check is the process of verifying the identification documentation, personal information, and liveness of an applicant.  In the industry, this process is generally referred to as KYC (Know Your Customer).  Aver uses sophisticated technology to process the information provided and report back with findings about all facets of an individual's identity.  All of the functionality provided in the Aver hosted enrollment is available via the API using the Verification Check endpoints.

## Create Check Endpoints
The create check endpoints are available at all subscription levels.  These endpoints are used to create a check and allow for either redirection to hosted enrollment (basic) or complete check creation with full data integration (advanced).


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
### POST /api/check/{id}/accesslink
Re-generates a new one-time use access link for end users to access their hosted check enrollment if needed.

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
- <b>url</b> - The url for the user to access their check enrollment if redirecting the user to use Aver hosted enrollment

##### Example Response
```
{
"url": "http://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=904ec9f005224cbdbe431709c285fb22&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
```
 
---

## Create Check Advanced Endpoints

These advanced check creation endpoints are only available to subscriptions with the Advanced API feature.


### POST /api/check/{id}/personalinfo
<p>Provide all the user information required by the check type(s)</p>

#### Request Parameters

- [Path] <b>id (required)</b> - The unique identifier returned from the check create call
- <b>ipAddress (optional - depends on check types)</b> - individual's IP address
- <b>companyName (optional - depends on check types)</b> - individual's company name
- <b>firstName (required)</b> - individual's first name (given name)
- <b>middleName (optional)</b> - individual's middle name
- <b>lastName (required)</b> - individual's last name (surname)
- <b>suffix (optional)</b> - individual's name suffix
- <b>gender (optional)</b> - individual's gender

    * Values:
      * `M` - Male
      * `F` - Female
      * `U` - Unknown / Other / Not Provided


- <b>dateOfBirth (optional - depends on check types)</b> - individual's date of birth in MM/DD/YYYY format
- <b>stateOrProvince (optional - depends on check types)</b> - individual's state or province of residence
- <b>country (optional - depends on check types)</b> - individuals country of residence (use ISO 3166 2-digit alpha country code)

  - See [ISO 3166 Country Codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes "ISO 3166 Country Codes")

- <b>streetAddress1 (optional - depends on check types)</b> - individual's residence street address
- <b>streetAddress2 (optional)</b> - individual's residence street address
- <b>city (optional - depends on check types)</b> - individual's city of residence
- <b>postalCode (optional - depends on check types)</b> - individual's residential postal code

##### Example Request
```
{
  "email":"someone@somewhere.com",
  "ipAddress":"192.168.1.1",
  "companyName":"Some Company",
  "firstName":"Someone",
  "middleName":null,
  "lastName":"One",
  "suffix":null,
  "gender":"M",
  "dateOfBirth":"12/03/1980",
  "stateOrProvince":"California",
  "country":"US",
  "streetAddress1":"1234 Main St",
  "city":"San Diego",
  "postalCode":"22434"
}
```

---
### POST /api/check/{id}/phone
<p>Provide the phone number to be validate (depdenent on check types)</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call
- <b>number</b> - individual's phone number
- <b>country</b> - individuals phone number country (use ISO 3166 2-digit alpha country code)

##### Example Request
```
{
  "number":"8183511153",
  "country":"US"
}
```

---
### POST /api/check/{id}/iddocument
<p>Use this endpoint to upload the ID document to be used in the check.  This is only required for Document Verification and Photo Verification check types that were specified at check create or at the group level</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call
- <b>forceCommit (optional)</b> - if "true" this will ignore any errors in document processing (facial recognition, OCR, etc) and may result in a delayed result requiring additional processing or a failed check result if the image is unreadable.
- <b>docType (required)</b> - the type of identification document being provided

  * Values:
    * `NADriverLicense` - North America Driver License (United States or Canada), 
    * `PassportImage` - Passport for any country
    * `GenericIdentificationCardImage` - All other identification documents


- <b>side (required)</b> - the side of the document being provided

  * Values:
    * `Front`
    * `Back`


- <b>fileName (required)</b> - the filename of the image being uploaded
- <b>fileContent (required)</b> - Base64 image (JPG or PNG) Data URL of image containing the specified side of the document.  Information about Data URL can be found <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs">here</a>

##### Example Request
```
{
  "forceCommit":false,
  "docType":"USALicenseIdCard",
  "side":"Front",
  "fileName":"front.jpg",
  "fileContent":"data:image/jpeg;base64,/9j/4AAQSkZAmY7PhCfv..."
}
```

---
### POST /api/check/{id}/photodocument
<p>Use this endpoint to upload the photo / selfie document to be used in the check for liveness verification.  This is only required for Photo Verification and Visual Watchlist check types that were specified at check create or at the group level.</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call
- <b>forceCommit (optional)</b> - if "true" this will ignore any errors in document processing (facial recognition) and may result in a delayed result requiring additional processing or a failed check result if the image is unreadable.
- <b>fileName (required)</b> - the filename of the image being uploaded
- <b>fileContent (required)</b> - Base64 image (JPG or PNG) Data URL of the image containing the individual's face.  Information about Data URL can be found <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs">here</a>
- <b>extended (optional)</b> - whether or not this selfie photo is the basic selfie photo or the extended liveness capture photo for the check (based on check settings none, one or both may be required)

##### Example Request
```
{
  "forceCommit":false,
  "fileName":"selfie.jpg",
  "fileContent":"data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

---
### GET api/check/{id}/photoinstruction
Retrieve the enhanced liveness capture instruction for the check

#### Request Parameters
- [Path] <b>id (required)</b> - The third party identifier provided during the check create call

#### Response Parameters
- <b>instruction</b> - The photo capture instruction
- Values:
  * `None`
  * `LookUp`
  * `LookDown`
  * `LookRight`
  * `LookLeft`

---
### POST /api/check/{id}/supplementaldocument
<p>Use this endpoint to upload one or more supplemental documents to be used / included in the check.  This is only required for Accredited Investor check type or if any Supplemental Document Types were provided at the time the check was created or at the group level.</p>

  * Values:
    * `BankOrCreditCard` - Banking or credit card
    * `TaxDocument` - Tax document
    * `UtilityBill` - Utility bill
    * `MedicalCard` - Medical card
    * `AccreditedInvestor` - Accredited investor letter


##### Example Request
```
{
  "docType":"AccreditedInvestor",
  "fileName":"accredited.jpg",
  "fileContent":"data:image/jpeg;base64,/9j/4AAQSkZJR..."
}
```

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call
- <b>docType (required)</b> - the type of supplemental document being provided 
- <b>fileName (required)</b> - the filename of the image being uploaded
- <b>fileContent (required)</b> - Base64 image (JPG or PNG) Data URL of the image containing page of the document to be uploaded.  Information about Data URL can be found <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs">here</a>

---

### GET /api/check/{id}/submit
<p>After all the required data and images are uploaded for the required check types and supplemental document types, this endpoint is called to finalize and process the check.  If the check is able to be completed immediately, it will return the full results of the check, otherwise the status will be returned and the results can be retrieved after the check is completed asynchronously.  This will perform all validation required based on the specified check types defined as to what user information and documents need to be present - if any element is missing, an error will be returned reflecting the missing information.</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier returned from the check create call


---

## Retrieve Check Endpoints
These endpoints allow for the retrieval of created checks to retrieve status and check criteria


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
### POST /api/checklookup
Search for checks by criteria

#### Request Parameters
- email 
- lastName
- firstName
- thirdPartyIdentifier

#### Response Parameters
- Check[] See [Get Check by Id](/docs/check/#get-apicheckid "Get Check by Id")

---

## Retrieve Results Endpoints
These endpoints are used to retrieve the results for a completed check


### GET /api/check/{id}/results
Gets the check information and status for a check including all results (if the status is Complete or Failed)

#### Request Parameters
- [Path] <b>id (required)</b> - The unique identifier for the check returned from the check create call

#### Response Parameters
- <b>id</b> - The unique identifier of the check
  
- <b>organizationId</b> - The parent organization of the check

- <b>groupId</b> - The group the check is in

- <b>thirdPartyIdentifier</b> - The third party identifier for the check

- <b>status</b> - The status of the check (statuses without a * can be ignored and are for informational purposes only)

  * `Created` - The check has been created but the user has not accessed enrollment or added any data
  * `AwaitingUser` - The user has accessed the enrollment or has begun submitting data
  * `AwaitingAutomation` - The enrollment has been submitted and queued for preprocessing
  * `AwaitingReview` - The enrollment has been submitted and is queued for processing
  * `InReview` - The enrollment is actively being reviewed or is in a secondary review
  * `Rejected`* - The check could not be completed due to invalid or missing data
  * `Completed`* - The check was able to be completed successfully and results can be retrieved


- <b>statusReason</b> - If the check was rejected, detail as to the reason

  * `MissingDocuments` - Required documents were not provided
  * `UnreadableDocumentsOrMissingVerificationInformation` - Identification documents were unreadable or did not contain the required information
  * `ExpiredDocuments` - Identification documents expired
  * `SuspiciousDocumentsOrImages` - Identification documents were suspected to be stolen or fraudulent
  * `FacialVerificationFailed` - Liveness facial verification failed


- <b>checkTypes</b> - The list of check types / verifications performed as part of the check (inherited from the group configuration)

  * `DocumentVerification` - Identification document verification performed
  * `EmailVerification` - Email verification performed
  * `RiskProfiling` - Risk profiling (access IP / location, email, facial match) performed for individual
  * `AddressVerification` - Address verification performed for individual
  * `PhotoVerification` - Liveness verification performed with facial recognition matching
  * `PhoneVerification` - Phone number verification performed
  * `Watchlist` - Text based watchlist search performed for individual
  * `VisualWatchlist` - Facial match watchlist search performed for individual
  * `AccreditedInvestor` - Accredited investor verification performed
  * `CovidVaccinationVerification` - Covid vaccination verification performed


- <b>warnings</b> - The warnings found based on the configured warnings in group settings

  * `Age` - Individual is under the age of 18
  * `Country` - Individual is from a restricted country
  * `State` - Individual is from a restricted state or province
  * `IPVpnTor` - Enrollment completed over VPN or TOR
  * `Address` - Address invalid or suspected of fraud
  * `EmailAddress` - Email address is invalid or suspect
  * `WatchlistHitsFound` - Watchlist results found for individual
  * `AdverseMediaFound` - Adverse media results found for individual
  * `SameEmailFound` - the provided e-mail address was provided in a previous verification
  * `SameIdDocumentFound` - the same identification document was provided in a previous verification
  * `SameNameFound` - the same name was provided in a previous verification
  * `PhoneInvalid` - the phone number provided is invalid
  * `PhonePrepaidOrVoip` - the phone number provided is prepaid, disposable, or VOIP


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
### GET /api/checkdoc/{id}/{docId}
Retrieve the base64 image document for a check by id

#### Request Parameters
- [Path] <b>id (required)</b> - The check id to retrieve
- [Path] <b>docid (required)</b> - The document id to retrieve

#### Response Parameters
- <b>base64</b> - base64 representation of the image

##### Example Response
```
{
  "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...
}
```
