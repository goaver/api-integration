---
id: watchlist
title: Watchlist Search
sidebar_label: Watchlist Search
---

This resource provides access to the watchlist search and adverse media search functionality.


## Create Search Endpoints

---

<b>NOTE:</b> If a check is configured to perform a watchlist search as part of the check type, the search will be performed automatically.  These endpoints are only necessary to perform watchlist searches without a corresponding verification check.
<p></p>

### POST api/watchlist/search

Performs a watchlist search with the specified search criteria

#### Request Parameters
- <b>groupId (required)</b> - The check group the search is in
- <b>checkId (optional)</b> - The check to associate this watchlist search to (if post-check completion)
- <b>firstName (optional *)</b> - The individual's first name
- <b>middleName (optional )</b> - The individual's middle name
- <b>lastName  (optional *)</b> - The individual's last name
- <b>businessName (optional *)</b> - The business / organization name to search
- <b>country (optional)</b> - The country for the individual or business
- <b>stateOrProvince (optional)</b> - The state for the individual or business
- <b>fileContent (optional)</b> - Base64 image (JPG or PNG) Data URL of the photo containing the individual's face.  When provided, this will perform Visual Watchlist search in addition to the Text Watchlist search (associated fees apply).  Information about Data URL can be found <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs">here</a>
- <b>fileName (required if fileContent is provided)</b> - The filename for the file content provided for the Visual Watchlist search
- <b>categories (optional)</b> The watchlist categories to be searched, if omitted the default is to search based on the group settings.

  * Values:
      * `Criminal` - Criminal related watchlsits
      * `Terrorism` - International terrorism watchlists
      * `Financial` - Financial crimes watchlists
      * `FinancialNotices` - Financial notice watchlists
      * `BorrowerDefaults` - Borrower default watchlists
      * `Political` - Politically exposed persons and related watchlists
      * `Medical` - Medical license revocation and related watchlists
      * `Sexual` - Sexual offense related watchlists
      * `Gambling` - Gambling related offenses and restriction watchlists

<b>*NOTE:</b> Either firstName + lastName or businessName must be provided at a minimum.

##### Example Request
```
{
  "groupId":"2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "firstName":"Some",
  "middleName":"Random",
  "lastName":"User",
  "businessName":"They Work Here Corp",
  "country":"USA",
  "stateOrProvince":"CA",
  "categories":[
        "Criminal",
        "Terrorism",
        "Financial",
        "FinancialNotices",
        "BorrowerDefaults",
        "Political",
        "Medical",
        "Sexual",
        "Gambling",
        "Education"
  ]
}
```

#### Response Parameters
- <b>id</b> - The unique watchlist search id that was created

##### Example Response
```
{
  "id": "f4d8f910-8a7b-42f0-ba40-2b2c17cb9118"
}
```

## Retreive Search Endpoints
---

### GET api/watchlist/{id}
<p>Retrieves the search and status information for the specified watchlist search</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The watchlist search id returned from the search call

#### Response Parameters
- <b>id</b> - The unique id of the search
- <b>groupId</b> - The group of the search
- <b>organizationId</b> - The organization of the search
- <b>checkId</b> - The associated check that created the watchlist search (if applicable)
- <b>status</b> - The status of the search

  - See [Get Search Results](/docs/watchlist#get-apiwatchlistidresults "Get Search Results") for values

- <b>searchDate</b> - The UTC date / time of the search
- <b>searchType</b> - The type of search (text, visual, text and visual)

  - See [Get Search Results](/docs/watchlist#get-apiwatchlistidresults "Get Search Results") for values

- <b>recheckInterval</b> - The auto-recurring search interval for this search to be performed (days)

  - See [Get Search Results](/docs/watchlist#get-apiwatchlistidresults "Get Search Results") for values

- <b>lastRecheckDate</b> - The UTC date / time of the last recurring search that was done based on this search (if applicable)
- <b>searchCriteria</b> - The search criteria provided for the search 

  - See [Create Search](/docs/watchlist#post-apiwatchlistsearch "Create Search") for parameters

##### Example Response
```
{
"id": "f4d8f910-8a7b-42f0-ba40-2b2c17cb9118",
"groupId": "2d1162b5-d6a8-4936-be84-39ec873b7a60",
"organizationId": "afa22173-6a46-4761-8308-27ad4b211c40",
"checkId": null,
"status": "Completed",
"searchDate": "10/4/2019 5:26:11 PM",
"searchType": "Text",
"recheckInterval": 0,
"lastRecheckDate": "",
"searchCriteria": {
    "firstName": "Some",
    "middleName": "Random",
    "lastName": "User",
    "businessName": "They Work Here Corp",
    "country": "USA",
    "stateProvince": "CA"
}
}
```

---
### GET api/watchlist/getbycheckid/{checkId}
Retrieves the watchlist search that was created as the result of a check enrollment that had a check type of watchlist search associated with it.

#### Request Parameters
- [Path] <b>checkId (required)</b> - The check enrollment that the watchlist search was created from

#### Response Parameters
- See [Get Watchlist Search by Id](/docs/watchlist#get-apiwatchlistid "Get Watchlist Search by Id")


## Retreive Results Endpoints

---
### GET api/watchlist/{id}/results
<p>Retrieves the results for a specified watchlist</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The watchlist search id returned from the search call

#### Response Parameters
- <b>id</b> - The unique id of the search
- <b>groupId</b> - The group of the search
- <b>organizationId</b> - The organization of the search
- <b>checkId</b> - The associated check that created the watchlist search (if applicable)
- <b>status</b> - The status of the search

  * Values:
    * `Completed` - Search completed successfully
    * `Failed` - Search failed due to missing or invalid search criteria
    * `Error` - Search could not be completed due to unknown error


- <b>searchDate</b> - The UTC date / time of the search
- <b>searchType</b> - The type of search

  * Values:
    * `Text` - Text watchlists
    * `TextAndVisual` - Text and Facial Match watchlists


- <b>recheckInterval</b> - The auto-recurring search interval for this search to be performed (days)

  * Values:
    * `0` - None
    * `1` - Daily
    * `7` - Weekly
    * `30` - Monthly
    * `90` - Quarterly


- <b>lastRecheckDate</b> - The UTC date / time of the last recurring search that was done based on this search
- <b>searchCriteria</b> - The search criteria provided for the search

  - See [Create Search](/docs/watchlist#post-apiwatchlistsearch "Create Search") for parameters
  
  
- <b>watchlistResults</b> - The list of matches found for the search criteria (see example below for data model)
- <b>adverseMediaResults</b> - The list of adverse media results found for the search criteria (see example below for data model)

##### Example Response
```
{
  "id": "f4d8f910-8a7b-42f0-ba40-2b2c17cb9118",
  "groupId": "2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "organizationId": "afa22173-6a46-4761-8308-27ad4b211c40",
  "checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
  "status": "Completed",
  "searchDate": "10/4/2019 5:32:31 PM",
  "searchType": "Text",
  "recheckInterval": 0,
  "lastRecheckDate": "",
  "searchCriteria": 
      "firstName": "Some",
      "middleName": "Random",
      "lastName": "User",
      "businessName": "They Work Here Corp",
      "country": "USA",
      "stateProvince": "CA"
  },
  "watchlistResults": [
    {
      "matchConfidence": 0.4,
      "watchlistName": "alabamaExcludedProviderList",
      "matchName": null,
      "firstNameMatch": "Match",
      "lastNameMatch": "Match",
      "middleNameMatch": "Unavailable",
      "businessNameMatch": "Unavailable",
      "stateMatch": "Unavailable",
      "countryMatch": "Unavailable",
      "additionalInformation": {
        "supensionEffectiveDate": "02/23/13",
        "suspensionInitiatedBy": "MLC"
      }
    }
  ],
  "adverseMediaResults": [
    {
      "datePublished": "2019-12-12T15:36:00Z",
      "title": null,
      "description": "Some Random, a former Pro Bowl running back, is among several former NFL players who are facing federal charges in an alleged scheme to defraud the league's health care program for retired ...",
      "name": "Some Random among retired NFL players facing federal fraud charges",
      "source": "Fox News",
      "url": "https://www.foxnews.com/sports/some-random-retired-nfl-players-facing-federal-fraud-charges",
      "matchScore": 0.4,
      "businessMatchName": "Unavailable",
      "firstNameMatch": "Match",
      "middleNameMatch": "Unavailable",
      "lastNameMatch": "Match",
      "stateMatch": "NoMatch",
      "countryMatch": "NoMatch"
    }
  ]
}
```

---
### GET api/watchlist/{id}/searchedlists
<p>Retrieves the list of watchlists names and versions that were searched for the results</p>

#### Request Parameters
- [Path] <b>id (required)</b> - The watchlist search id returned from the search call

#### Response Parameters
- <b>name</b> - The name of the list that was searched
- <b>version</b> - The version of that watchlist that was searched

##### Example Response
```
[
  {
    "name": "ATF Most Wanted List",
    "version": "9/5/2019"
  },
  {
    "name": "Air Force Fugitive List",
    "version": "9/5/2019"
  }...
]
```

