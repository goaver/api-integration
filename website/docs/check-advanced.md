---
id: check-advanced
title: Verification Check (Advanced)
sidebar_label: Verification Check (Advanced)
---

Using advanced functionality of the check endpoint will allow deeper and more custom integration as well as offline checking using the Aver API.  This documentation extends the documentation for <a href="docs/check">Verification Check (Simple)</a>

## Create a Check with Check Group Default Overrides
Basic Check Create functionality will use the Check Group defaults configured to determine the Check Types, the required Supplemental Document Types, and Watchlist Search recurrence (if applicable).  If more control is needed in certain cases, the create call can override these defaults with extended parameters.

### POST /api/check/create
Creates a new check enrollment overriding the Check Types and Supplemental Document Types required

#### Request Parameters
- <b>thirdPartyIdentifier (required)</b> - A unique identifier for this create request to ensure idempotentcy and prevent multiple checks being created on your behalf.  This could be a user account number or unique identifier within your existing application or randomly generated.

- <b>groupId (required)</b> - The check group context you want this check to be created under.  (For details on managing your check groups, please see the GoAver.com product documentation)

- <b>email (required)</b> - The e-mail address of the user the check is being created for that will be used to send access links to the user if necessary.

- <b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment).  Default is English if this is not provided 

  * Values:
    * `en` - English
    * `zh-Hans` - Chinese
    * `es` - Spanish
    * `fr` - French

- <b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

- <b>checkTypes (optional)</b> - The check types to be used for this check.  When set, this will override the Check Type defaults and Supplemental Document Types defined in Check Group Settings configuration

  * Values:
    * `EmailVerification` - Email verification performed
    * `DocumentVerification` - Identification document verification performed
    * `PhotoVerification` - Liveness verification performed with facial recognition matching
    * `AccreditedInvestor` - Accredited investor verification performed
    * `Watchlist` - Text based watchlist search performed for individual
    * `VisualWatchlist` - Facial match watchlist search performed for individual
    * `RiskProfiling` - Risk profiling performed for individual
    * `AddressVerification` - Address verification performed for individual


- <b>supplementalDocumentTypes (optional)</b> - The supplemental document types required to be submitted with this check - NOTE: if omitted, the default will use the group settings.

  * Values:
    * `BankOrCreditCard` - Banking or credit card
    * `TaxDocument` - Tax document
    * `UtilityBill` - Utility bill
    * `MedicalCard` - Medical card
    * `AccreditedInvestor` - Accredited investor letter


- <b>watchlistSearchCategories (optional)</b> The watchlist categories to be searched - NOTE: if omitted, the default will use the group settings.

  - See [Watchlist Search](/docs/watchlist#post-apiwatchlistsearch "Watchlist Search") for values


- <b>watchlistRecheckInterval (optional)</b> - This will set the watchlist search that is created and searched as a result of this check as a recurring check to be performed automatically in the future at the specified interval.  NOTE: This only applies if you are overriding the default check types and include Watchlist Search, otherwise group settings will be used to set the recurring watchlist search interval.

  - See [Watchlist Search](/docs/watchlist#post-apiwatchlistsearch "Watchlist Search") for values

- <b>skipPersonalAccessCode (optional)</b> - This option will skip the enrollment step of asking the user to create their own personal access code to access their enrollment.  NOTE: When this option is used, if the user is removed from the enrollment process for any reason (session timeout, error, exit, etc) they will be unable to re-access the enrollment without being provided a new access url from the API caller.  See <a href="/docs/check#post-apicheckidaccesslink">Check Access Link</a> for more information on generating a new link.

- <b>overrideThirdPartyIdentifier (optional)</b> - By default, only one check may be created per third party identifier.  When set, this will allow multiple checks to be created with the given third party identifier.

##### Example Request
```
{
  "groupId":"2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "thirdPartyIdentifier":"123456",
  "email":"someone@somewhere.com",
  "language":"en",
  "returnUrl":"https://www.yoursite.com/page",
  "checkTypes":[
    "DocumentVerification",
    "EmailVerification",
    "PhotoVerification",
    "AccreditedInvestor",
    "RiskProfiling",
    "AddressVerification",
    "Watchlist",
    "VisualWatchlist"
  ],
  "supplementalDocumentTypes":[
    "AccreditedInvestor",
    "BankOrCreditCard",
    "UtilityBill",
    "MedicalCard"
  ],
  "watchlistSearchCategories":[
        "Criminal",
        "Terrorism",
        "Financial",
        "FinancialNotices",
        "BorrowerDefaults",
        "Political",
        "Medical",
        "Sexual",
        "Gambling",
        "Education"
  ]
}
```

#### Response Parameters
- <b>checkId</b> - The unique identifier of the check 
  
- <b>thirdPartyIdentifier</b> - The third party identifier for the created check (provided above)

- <b>url</b> - The link url that can be passed to the end user to allow them to proceed and provide their information via live enrollment. Note: if Document Verification is not defined as a Check Type, the url will be null since end user enrollment requires document verification at a minimum.

##### Example Response
```
{
"checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
"thirdPartyIdentifier": "123456",
"url": "https://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=a34bdce9b3b2412981f3aac6cb46ee3d&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
```

## Complete the Check via API without User Enrollment
<p>If the check doesn't have a Check Type of Document Verification (in which case there is no URL), or you want to perform the check without live interaction with the end user, you can complete the check by providing all the data via the API on behalf of the user and then submitting the application to obtain your risk and report results.</p>

---
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
- <b>country (optional - depends on check types)</b> - individuals country of residence (use ISO 3166 2-digit alpha country code

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

##### Example Request
```
{
  "forceCommit":false,
  "fileName":"selfie.jpg",
  "fileContent":"data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

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