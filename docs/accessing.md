# Accessing the API

## 1. Create your API key in your organization's GoAver.com account:
1. Navigate to Settings -> API Keys
2. Add an API key
3. Copy the "secret"

<p align="center">
<img src="../images/create_api_key_1.jpg?raw=true?raw=true" width="450px">
</p>

4. View the key that was created and copy the "key"

<p align="center">
<img src="../images/create_api_key_2.jpg?raw=true" width="600px">
</p>

5. Find the group id of the group you want to create checks under

<p align="center">
<img src="../images/get-group-id.jpg?raw=true" width="600px">
</p>

### 2. Create your Basic Authentication Header for your Request
<b>Details on Basic Authentication can be found here:</b><br>
https://en.wikipedia.org/wiki/Basic_access_authentication (see Client Side)

1. Concatenate < key >:< secret >
2. Base64 encode the concatenated values
3. Include the Base64 encoded value in the Authorization header for Basic auth
  
### 3. Call the API Auth Token Endpoint and get your token
Call the API auth endpoint with your basic authentication header to return a token so you can call other API endpoints and take further action.   Refer to [Get an API Auth Token](https://github.com/goaver/api-integration/blob/development/docs/auth.md#request)

### 4. Use your API Auth Token for all API Resource Calls
<p>For any resource request, the endpoint will require the Authorization header to be set as a bearer token with the token you generated in the previous step.<p>
  
### Example Request Header
<pre>
content-type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9.XZmHyG_IVurCvpsNM_8R-ACzz9jReafpww9hrr3vyr4
</pre>
