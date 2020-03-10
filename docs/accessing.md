---
id: accessing
title: Accessing the API
sidebar_label: Accessing the API
---

To securely access the Aver API, you will need to authenticate to create an access token to grant access to API resources.

### 1. Create your API key
1. Navigate to Settings -> API Keys
2. Add an API key
3. Copy the "secret"

<p>
<img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/create_api_key_1.jpg"></img>
</p>

4. View the key that was created and copy the "key"

<p>
<img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/create_api_key_2.jpg"></img>
</p>

### 2. Create your Basic Authentication Header for your Request
#### Details on Basic Authentication can be found here:
<p>
<a href="https://en.wikipedia.org/wiki/Basic_access_authentication">https://en.wikipedia.org/wiki/Basic_access_authentication</a> (see Client Side)
</p>

#### Steps to create a Basic Authentication request
1. Concatenate [key]:[secret]
2. Base64 encode the concatenated values 
3. Include the Base64 encoded value in the Authorization header for Basic auth

<p>
<b>Protip:</b> For testing the API, <a href="https://www.base64encode.org/">https://www.base64encode.org</a> has a quick online base64 encoder.
</p>


### 3. Call the API Auth Token Endpoint and get your token
<p>
Call the <a href="/docs/auth">Authentication</a> endpoint with your basic authentication header to return a token so you can call other API endpoints and take further action. The base API URL is https://app.goaver.com/api
</p>

### 4. Use your API Auth Token for all API Resource Calls
<p>
For any resource request, the endpoint will require the authorization header to be set as a bearer token with the token you generated in the previous step.
</p>

### Example Request Header
```
content-type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9XZmHyGIVurCvpsNM8RACzz9jReafpww9hrr3vyr4
```

