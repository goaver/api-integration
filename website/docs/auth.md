---
id: auth
title: Authentication
sidebar_label: Authentication
---

<p>This endpoint provides authentication token generation and management.</p>

### GET /api/auth/token
Creates / retrieves a bearer token to be used for authentication with all other API endpoints.

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
