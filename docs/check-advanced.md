# Advanced Check Functionality (/api/check)
<p>Using advanced functionality of the check resource will allow deeper and more custom integration as well as offline checking using the Aver API.  This documentation extends the documentation for the check resource found here:
  
- [Basic Check Functionality](https://github.com/goaver/api-integration/blob/master/docs/check.md)

## POST /api/check/create
<p>Creates a new check enrollment</p>

### Request Parameters
- <b>thirdPartyIdentifier (required)</b> - A unique identifier for this create request to ensure idempotentcy and prevent multiple checks being created on your behalf.  This could be a user account number or unique identifier within your existing application or randomly generated.

- <b>groupId (required)</b> - The check group context you want this check to be created under.  (For details on managing your check groups, please see the GoAver.com product documentation)

- <b>email (required)</b> - The e-mail address of the user the check is being created for that will be used to send access links to the user if necessary.

- <b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment).  Options are "en"(English), "zh-Hans"(Chinese), and "fr"(French).  Default is English if this is not provided. 

- <b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

- <b>checkTypes (optional)</b> - The check types to be used for this check.  When set, this will override the Check Type defaults and Supplemental Document Types defined in Check Group Settings configuration

- <b>supplementalDocumentTypes (optional)</b> - The supplemental document types required to be submitted with this check

#### Example Request
<pre>
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
    "CreditCard",
    "BankCard",
    "UtilityBill"
  ]
}
</pre>

### Response Parameters
- <b>checkId</b> - The unique identifier of the check 
  
- <b>thirdPartyIdentifier</b> - The third party identifier for the created check (provided above)

- <b>url</b> - The link url that can be passed to the end user to allow them to proceed and provide their information via live enrollment. Note: if Document Verification is not defined as a Check Type, the url will be null since end user enrollment requires document verification at a minimum.

#### Example Response
<pre>
{
"checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
"thirdPartyIdentifier": "123456",
"url": "https://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=a34bdce9b3b2412981f3aac6cb46ee3d&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
</pre>

# Completing the Check via API Without End User Enrollment
<p>If the check doesn't have a Check Type of Document Verification (in which case there is no URL), or you want to perform the check without live interaction with the end user, you can complete the check by providing all the data via the API on behalf of the user to obtain results.</p>

## POST /api/check/{id}/personalinfo
<p>Provide all the user information required by the check type(s)</p>

#### Example Request
<pre>
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
</pre>

## GET /api/check/{id}/submit
<p>After all the required data and images are uploaded, this endpoint is called to finalize and process the check.  If the check is able to be completed immediately, it will return the full results of the check, otherwise the status will be returned and the results can be retrieved after the check is completed asynchronously.</p>
