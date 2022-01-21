---
id: auth
title: Authentication
sidebar_label: Authentication
---

In order to access the Aver API, calls must first authenticate using the API Key and Secret to retrieve a bearer token to be used for all subsequent calls.


## Create Token Endpoints
<p>These endpoints provide authentication token generation and refresh.</p>


### GET /api/auth/token
Creates / retrieves a bearer token to be used for authentication with all other API endpoints.
<b>NOTE:</b> Auth tokens are only valid for 30 minutes, so refresh is required before the expiration to prevent re-authenticating using your API key.  You can generate a refreshed token using <a href="/docs/auth#refresh">/api/auth/refresh</a>
<p></p>

#### Request Parameters
- [Header] <b>Basic Authorization (required)</b> - Set the Authorization header to the base64 encoded key:secret pair as per https://en.wikipedia.org/wiki/Basic_access_authentication

##### Example Request Header
```
content-type: application/json
authorization: Basic Z3E1ZTkwMDMtZTQ2Yy00ZjMzLTk0ZGUtOWIxZWVkZmViOTRiOk9EUTJOVGsyTmpOallUbG1NakV6TW1OaU5ERTBZV0kzWVRaaU9HTXhaR014TkdZeFlqYzRORFkxT1RZPQ==
```

#### Response Parameters
- <b>token</b> - The bearer token to be used for all other API calls

##### Example Response
```
{
'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9XZmHyG_IVurCvpsNM_8R-ACzz9jReafpww9hrr3vyr4'
}
```

--- 

### POST /api/auth/refresh
Creates / retrieves a refreshed token to be used for authentication with API endpoints.

#### Request Parameters
- <b>token</b> - The current auth token

##### Example Request
```
{
'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9XZmHyG_IVurCvpsNM_8R-ACzz9jReafpww9hrr3vyr4'
}
```

#### Response Parameters
- <b>token</b> - The refreshed auth token to use with API calls

##### Example Response
```
{
'token':'eyJhbGc2YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcI1bmlxdWVfbmFtZSI6ImFmYTIyMTczLTZhNDYtNDc2MS04MzA4LTI3YWQ0YjIxMWM0MCIsInJvbGUiOiJQb3J0YWxVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IntcIklkXCI6XCJhZmEyMjE3My02YTQ2LTQ3NjEtODMwOC0yN2FkNGIyMTFjNDBcIixcIkF1dGhUeXBlXCI6MixcIkRhdGFcIjpudWxsfSIsIm5iZiI6MTU3MDE5NjE4NiwiZXhwIjoxNTcwMTk5Nzg2LCJpYXQiOjE1NzAxOTYxODYsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vZ29hdmVyLmNvbSJ9XZmHyG_IVurCvpsNM_8R-ACzz9jReafpww9hrr3vyr4'
}
```