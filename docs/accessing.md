---
id: accessing
title: Accessing the API
sidebar_label: Accessing the API
---

To securely access the Aver API, you will need to authenticate to create an authentication bearer token to grant access to API endpoints.  An inital basic authentication request is made to retrieve the bearer token, and that token is then used in all subsequent calls to authenticate the request.

### 1. Create an API key
1. Login to the Aver Portal
2. Go to Settings under your organization in the left nav bar
3. Find the integrations tab and select API Keys
4. Add an API key with "Portal User" scope. To test the API with dummy data, use the "Test API Key"
5. Copy the "secret"

<p>
<img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/create_api_key_1.jpg"></img>
</p>

4. View the key that was created and copy the "key"

<p>
<img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/create_api_key_2.jpg"></img>
</p>

### Using the Test API Key
<p>
The Test API Key is available to help develop against the Aver API. It will authenticate the same way as a the "Portal User" key. Using the endpoints listed in the rest of the documentation, will return dummy data. The "Test API Key" does not use any check or watchlist credits.
</p>

### 2. Retrieve the Bearer Token

To retrieve the authentication bearer token, a basic authentication request is made using the API key and secret to validate your organization and return a scoped bearer token to grant access to API resources. Additional details on basic authentication can be found at <a href="https://en.wikipedia.org/wiki/Basic_access_authentication">https://en.wikipedia.org/wiki/Basic_access_authentication</a> (see Client Side)


#### Create a Basic Authentication request
1. Concatenate [key]:[secret]
2. Base64 encode the concatenated values 
3. Include the Base64 encoded value in the Authorization header for Basic auth

<p>
<b>Protip:</b> For testing the API, <a href="https://www.base64encode.org/">https://www.base64encode.org</a> has a quick online base64 encoder.
</p>


#### Call the Authentication Endpoint
<p>
Call the <a href="/docs/auth">Authentication</a> endpoint with your basic authentication header to return a token so you can call other API endpoints and take further action. The base API URL is <b>https://app.goaver.com/api</b>
</p>

### 3. Calling API Endpoints
<p>
For any resource request, the endpoint will require the authorization header to be set as a bearer token with the token you generated in the previous step.
</p>

```
content-type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9XZmHyGIVurCvpsNM8RACzz9jReafpww9hrr3vyr4
```

