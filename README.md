<p align="center">
<img src="https://github.com/goaver/api-integration/blob/master/images/aver_logo.png?raw=true" width="125px">
</p>

<h3 align="center">GoAver.com API Integration</h3>

GoAver.com uses permissioned API keys and Basic Authentication over HTTPS to allow easy access to API features

## General API Authentication
<b>Details on Basic Authentication can be found here:</b><br>
https://en.wikipedia.org/wiki/Basic_access_authentication (see Client Side)

### First, create your API key in your organization's GoAver.com account:
1. Navigate to Settings -> API Keys
2. Add an API key
3. Copy the "secret"

<p align="center">
<img src="https://github.com/goaver/api-integration/blob/master/images/create_api_key.jpg?raw=true" width="450px">
</p>

4. View the key that was created and copy the "key"

<p align="center">
<img src="https://github.com/goaver/api-integration/blob/master/images/create_api_key2.jpg?raw=true" width="500px">
</p>

### Create your Basic Authentication Header for your Request
1. Concatenate < key >:< secret >
2. Base64 encode the concatenated values
3. Include the Base64 encoded value in the Authorization header for Basic auth
  
### Call the Auth API Endpoint
1. Call the specific API auth endpoint with your basic authentication header to return a JWT token so you can call other API endpoints and take further action, for general API interaction with the portal (reporting, etc), you would simply need an auth token, and the endpoint is https://app.goaver.com/Api/AuthToken.

## Use Case: Example Create Check

The most common use case is to make a request to create a check for the user on the behalf of your organization if you choose not to invite them by e-mail or require deeper integration with your existing web site or app workflow.  This workflow uses a different authentcation endpoint to simplify the number of calls required.

### 1. POST to Check Create Token Auth Endpoint
<p>The auth endpoint for check create is located at https://app.goaver.com/Api/CheckCreateToken</p>

#### Steps to POST
- Create your basic authentication header as described above with your API credentials
- Set the content-type header to "application/json"
- Send the check request create parameters in the body of your request

#### Request parameters
<b>uniqueId (required)</b> - A unique identifier for this create request to ensure idempotentcy and prevent multiple checks being created on your behalf with the same token

<b>groupId (required)</b> - The check group context you want this check to be created under.  (For details on managing your check groups, please see the GoAver.com product documentation)

<b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.

<b>email (optional)</b> - The e-mail address of the user the check is being created for.  If this is not provided, the user will be prompted for an e-mail address to be used for verification.  Use this if you want to force a specific e-mail address to be used and verified for enrollment

<b>Example Request Header</b>
<pre>
content-type: application/json
authorization: Basic ZiA5MGQyMDMtYWM2NS00NzI5LTg5ZGItYTc5YWY4ZGQyZTUzOk9EYzVNREcxWWpAMk5qQmtPR0UyT2zNMU5EZGhNVGhpWW1WaVlUYzROVEE1T1dNNVpqSTROemN3T0RVPQ==
</pre>

<b>Example Request Body</b>
<pre>
{
  "uniqueId":"12345",
  "groupId":"0aa4f4b8-c32f-4581-942d-559727582562",
  "returnUrl":"https://www.yoursite.com/checkcomplete",
  "email":"gubanotorious@gmail.com"
}
</pre>

### 2. Get the JWT Token Response
<p>If your POST is successful you will get a JWT token in response.  This token has a limited expiration and can only be used to create a single check</p>

<pre>
{
"token": "avJhbGciOiJIOvI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE4YmFmOTIzLTI0MmUtNGQwNy05OTJlLTIxM2IyODJiN2VjZCIsInJvbGUiOiJDaGVja1VzZXIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiSWRcIjpcIjE4YmFmOTIzLTI0MmUtNGQwNy05OTJlLTIxM2IyODJiN2VjZFwiLFwiQXV0aFR5cGVcIjoyLFwiRGF0YVwiOntcImdyb3VwSWRcIjpcIjBlZTRmNGI4LWMzMmYtNDU4MS05NDJkLTU1OTcyNzU5ODkyNlwiLFwiZW1haWxcIjpudWxsLFwidW5pcXVlSWRcIjpcIkdVQkE1NTVcIixcInJldHVyblVybFwiOlwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbVwifX0iLCJuYmYiOjE1NjM3OTc5MTgsImV4cCI6MTU2MzgwMTUxOCwiaWF0IjoxNTYzNzk3OTE4LCJpc3MiOiJzZWxmIiwiYXVkIjoiaHR0cDovL2dvYXZlci5jb20ifQ.a4VOywLv5a_jj-aDJ9zmOy83m6GooeguzxI521OrhZE"
}
</pre>

### 3. Redirect the Client Browser to Begin the Check Enrollment Workflow
<p>
Redirect to https://app.goaver.com/CheckCreate?token=JWT_TOKEN_VALUE
</p>
<p>
This will begin the process for the user and to send them through the verification workflow, returning them to the url specified in returlUrl at the end of the workflow if it was provided.
</p>



