---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
---

<p>Getting started with the Aver API is simple.  The most common use case is to make a request to create a basic live check for the user on the behalf of your organization if you choose not to invite them via the portal or require deeper integration for higher volume workflows.</p>

## Creating a Basic Live Check
1. Get your auth token as and set it as the bearer token in the authorization header (refer to <a href="/docs/accessing">Accessing the API</a>)
2. Set the check request create parameters in the body of your request and POST to the create check endpoint (refer to <a href="/docs/check">Verification Check</a>)
3. Get the URL from the response
4. Provide the user with a link or redirect to begin their check enrollment
