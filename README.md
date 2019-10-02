<p align="center">
<img src="https://github.com/goaver/api-integration/blob/master/images/aver_logo.png?raw=true" width="125px">
</p>

<h3 align="center">GoAver.com API Integration</h3>

GoAver.com uses permissioned API keys and Basic Authentication over HTTPS to allow easy access to API features

## Example Code
<b>Example code / projects can be found here:</b><br>
https://github.com/goaver/api-integration/tree/master/examples

## Accessing the API

### First, create your API key in your organization's GoAver.com account:
1. Navigate to Settings -> API Keys
2. Add an API key
3. Copy the "secret"

<p align="center">
<img src="./images/create_api_key_1.jpg?raw=true?raw=true" width="450px">
</p>

4. View the key that was created and copy the "key"

<p align="center">
<img src="./images/create_api_key_2.jpg?raw=true" width="600px">
</p>

5. Find the group id of the group you want to create checks under

<p align="center">
<img src="./images/get-group-id.jpg?raw=true" width="600px">
</p>


### Create your Basic Authentication Header for your Request
<b>Details on Basic Authentication can be found here:</b><br>
https://en.wikipedia.org/wiki/Basic_access_authentication (see Client Side)

1. Concatenate < key >:< secret >
2. Base64 encode the concatenated values
3. Include the Base64 encoded value in the Authorization header for Basic auth
  
### Call the Auth API Endpoint
Call the API auth endpoint with your basic authentication header to return a JWT token so you can call other API endpoints and take further action.   

https://app.goaver.com/api/auth/token

## Use Case: Example Create Check
The most common use case is to make a request to create a check for the user on the behalf of your organization if you choose not to invite them via the portal or require deeper integration for higher volume workflows.

#### Steps
- Get your auth token as outlined above and set it as the bearer token in the authorization header
- Set the content-type header to "application/json"
- Set the check request create parameters in the body of your request
- POST to https://goaver.com/api/check/create

#### Request parameters
<b>uniqueId (required)</b> - A unique identifier for this create request to ensure idempotentcy and prevent multiple checks being created on your behalf with the same token

<b>groupId (required)</b> - The check group context you want this check to be created under.  (For details on managing your check groups, please see the GoAver.com product documentation)

<b>email (required)</b> - The e-mail address of the user the check is being created for that will be used to send access links to the user if necessary.

<b>language (optional)</b> - The default language to use for the check enrollment for the user (they can change the language during enrollment).  Options are "en"(English), "zh-Hans"(Chinese), and "fr"(French).  Default is English if this is not provided. 

<b>returnUrl (optional)</b> - The url to redirect to for the user once they have completed the check enrollment workflow.  This is generally used for inline workflows.  The status / complete page will be shown at the end of enrollment if this is not set.

<b>Example Request Header</b>
<pre>
content-type: application/json
authorization: Bearer ZiA5MGQyMDMtYWM2NS00NzI5LTg5ZGItYTc5YWY4ZGQyZTUzOk9EYzVNREcxWWpAMk5qQmtPR0UyT2zNMU5EZGhNVGhpWW1WaVlUYzROVEE1T1dNNVpqSTROemN3T0RVPQ==
</pre>

<b>Example Request Body</b>
<pre>
{
  "uniqueId":"12345",
  "groupId":"0aa4f4b8-c32f-4581-942d-559727582562",
  "returnUrl":"https://www.yoursite.com/checkcomplete",
  "language":"en",
  "email":"someuser@user.com"
}
</pre>

### 2. Get the Check Create Response
<p>If your POST is successful you will get the check create response containing the created check parameters:
<b>checkId</b> - The unique identifier of the check 
  
<b>thirdPartyIdentifier</b> - The third party identifier for the created check (provided above)

<b>url</b> - The link url to be passed to the user to allow them to access this created enrollment and continue the process

</p>

### 3. Redirect the Client Browser to Begin the Check Enrollment Workflow
<p>
Redirect the user to the url you retrieved in the previous step.
</p>
<p>
This will begin the process for the user and to send them through the verification workflow, returning them to the url specified in returlUrl at the end of the workflow if it was provided.
</p>



