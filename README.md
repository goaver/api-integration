<p align="center">
<img src="https://github.com/goaver/api-integration/blob/master/images/aver_logo.png?raw=true" width="125px">
</p>

<h3 align="center">GoAver.com API Integration</h3>

GoAver.com uses permissioned API keys and Basic Authentication over HTTPS to allow easy access to API features

## Quick Start: Create Check
The most common use case is to make a request to create a check for the user on the behalf of your organization if you choose not to invite them via the portal or require deeper integration for higher volume workflows.
#### Steps
1. Get your auth token as outlined above and set it as the bearer token in the authorization header (refer to [Authenticating with API Key](https://github.com/goaver/api-integration/blob/development/docs/accessing.md))
2. Set the check request create parameters in the body of your request and POST to the create check endpoint (refer to [Create a Check](https://github.com/goaver/api-integration/blob/development/docs/check.md#post-apicheckcreate))
3. Get the URL from the response
4. Provide the user with a link or redirect to begin their check enrollment

## Authenticating to Access API Resource Endpoints
- [Authenticating with Your API Key](https://github.com/goaver/api-integration/blob/development/docs/accessing.md)

## API Resource Endpoints
### Auth (/api/auth)

- [Get an API Auth Token](https://github.com/goaver/api-integration/blob/development/docs/auth.md#get-apiauthtoken)

### Check (/api/check)
- [Create a Check](https://github.com/goaver/api-integration/blob/development/docs/check.md#post-apicheckcreate)

- [Retrieve a Check by Id](https://github.com/goaver/api-integration/blob/development/docs/check.md#get-apicheckid)

- [Retrieve a Check by Third Party Identifier](https://github.com/goaver/api-integration/blob/development/docs/check.md#get-apicheckgetbythirdpartyidentifierid)

- [Retrieve the Full Results for a Completed Check](https://github.com/goaver/api-integration/blob/development/docs/check.md#get-apicheckidresults)

- [Generate a One-Time Check Access Link](https://github.com/goaver/api-integration/blob/development/docs/check.md#post-apicheckidaccesslink)

### Watchlist (/api/watchlist)
- [Create and Execute a Watchlist Search](https://github.com/goaver/api-integration/blob/development/docs/watchlist.md#post-apiwatchlistsearch)

- [Retrieve a Watchlist Search by Id](https://github.com/goaver/api-integration/blob/development/docs/watchlist.md#get-apiwatchlistid)

- [Retrieve a Watchlist Search by Creating Check Id](https://github.com/goaver/api-integration/blob/development/docs/watchlist.md#get-apiwatchlistgetbycheckidcheckid)

- [Retrieve the Results of a Completed Watchlist Search](https://github.com/goaver/api-integration/blob/development/docs/watchlist.md#get-apiwatchlistidresults)

- [Retrieve the List of Watchlists Searched](https://github.com/goaver/api-integration/blob/development/docs/watchlist.md#get-apiwatchlistidsearchedlists)

## Example Code
<b>Example code / projects can be found here:</b><br>
https://github.com/goaver/api-integration/tree/master/examples



