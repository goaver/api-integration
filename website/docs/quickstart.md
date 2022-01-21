---
id: quickstart
title: Creating a Basic Check
sidebar_label: Quickstart
---


<p>Getting started with the Aver API is simple.  The most common use case is to make a request to create a basic check for the user on the behalf of your organization and allow the user to use hosted enrollment to provide their data and complete verification.</p>

## 1. Get your Authentication Token
1. Create your API key in the Aver portal and get your secret and key
2. Create your basic authentication request using your secret and key
3. Call the <a href="/docs/auth">Authentication</a> endpoint to get your authentication bearer token

For more details, see: <a href="/docs/accessing">Accessing the API</a>

## 2. Find the Check Group ID
When creating a new check, you must specify which check group you want to create the check under.  Check groups serve as a unit of organization as well as provide extended configuration options to be defaulted via the portal.  Login to the Aver portal and view the settings of your desired check group to retrieve the id.
<p>
<img src="/img/get-group-id.jpg"></img>
</p>

## 3. Send the Check Create Request
### Set the Authentication Header
Use the bearer token from above to set the authorization header for your API endpoint request
```
content-type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9XZmHyGIVurCvpsNM8RACzz9jReafpww9hrr3vyr4
```

### Create the Check Request
Create the basic check request body with the e-mail address of the user, a third party identifier (an identifier that will help you identify this user in your system, generally this is an account id or username), and the check group to create the check under.
```
{
  "groupId":"2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "thirdPartyIdentifier":"123456",
  "email":"someone@somewhere.com"
}
```
For more details and options, see: <a href="/docs/check">Verification Check</a>

### Send the Request
POST the check request body with the authentication header to the <a href="/docs/check#post-apicheckcreate">Verification Check Create</a> endpoint

## 4. Get the Check Create Response
After you send your request, the response will return a unique identifier for the check, the third party identifier you provided, as well as a url that can be provided to the end user to begin their enrollment.
```
{
"checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
"thirdPartyIdentifier": "123456",
"url": "https://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=a34bdce9b3b2412981f3aac6cb46ee3d&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage"
}
```

### Redirect the User to Enrollment
To prompt the user to begin enrollment, either redirect the user or provide a link to the URL provided in the response
```
<a href="https://app.goaver.com/CheckEnrollment/51771bd7-a5b5-4ab9-913c-f1dc15429f11?accessCode=a34bdce9b3b2412981f3aac6cb46ee3d&language=en&returnUrl=https%3a%2f%2fwww.yoursite.com%2fpage">Begin Enrollment</a>
```

## 5. Get the Check Results
Once the check is created, the user must complete enrollmment and then Aver must process the check to provide results.  You can check the status of a check at any time, and if complete, retrieve the results via the API.  For additional efficiency, instead of polling for status, you can simply set up Active Notifications to receive real-time updates as checks are completed and results become available.

### Retrieve the Status
You can get the status of the created check by sending a GET request to the <a href="/docs/check#get-apicheckid">Check Status</a> endpoint using the check id from the response.  Alternatively, you can use <a href="/docs/check#get-apicheckid">Check Status by Third Party Identifier</a> endpoint to retrieve the check status.

### Receive Active Notifications
You can autommatically receive notifications about check status updates without manually calling the check status endpoint.  Please see <a href="/docs/webhook">Active Notifications</a> for more options.

### Retrieve the Check Results
If the manually checked status of a check is "Completed" or you have received a notification that the check is complete, you can simply call the check results endpoint to get the full results of the check.  See <a href="/docs/check#get-apicheckidresults">Verification Check Results</a> for more details.