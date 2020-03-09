---
id: quickstart
title: Aver API Quickstart
sidebar_label: Quickstart
---

<p>This page will contain the most common use cases for using the Aver API to integrate verification services into your website or application</p>

## Create Basic Live Check
The most common use case is to make a request to create a check for the user on the behalf of your organization if you choose not to invite them via the portal or require deeper integration for higher volume workflows.

#### Steps
1. Get your auth token as outlined above and set it as the bearer token in the authorization header (refer to Authenticating and Accessing the API)
2. Set the check request create parameters in the body of your request and POST to the create check endpoint (refer to Verification Check)
3. Get the URL from the response
4. Provide the user with a link or redirect to begin their check enrollment
