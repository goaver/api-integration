# Watchlist (/api/watchlist)
<p>This resource will allow the creation and retrieval of watchlist searches</p>

---
## POST api/watchlist/search
<p></p>

### Request Parameters
- <b>groupId (required)</b> - The check group the search is in
- <b>firstName (optional *)</b> - The individual's first name
- <b>middleName (optional )</b> - The individual's middle name
- <b>lastName  (optional *)</b> - The individual's last name
- <b>businessName (optional *)</b> - The business / organization name to search
- <b>country (optional)</b> - The country for the individual or business
- <b>stateOrProvince (optional)</b> - The state for the individual or business
- <b>fileContent (optional)</b> - Base64 image (JPG or PNG) Data URL of the photo containing the individual's face.  When provided, this will perform Visual Watchlist search in addition to the Text Watchlist search (associated fees apply).  Information about Data URL can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
- <b>fileName (required if fileContent is provided)</b> - The filename for the file content provided for the Visual Watchlist search

*NOTE: Either firstName + lastName or businessName must be provided at a minimum.

#### Example Request
<pre>
{
  "groupId":"2d1162b5-d6a8-4936-be84-39ec873b7a60",
  "firstName":"Some",
  "middleName":"Random",
  "lastName":"User",
  "businessName":"They Work Here Corp",
  "country":"USA",
  "stateOrProvince":"CA"
}
</pre>

### Response Parameters
- <b>id</b> - The unique watchlist search id that was created

#### Example Response
<pre>
{
  "id": "f4d8f910-8a7b-42f0-ba40-2b2c17cb9118"
}
</pre>

---
## GET api/watchlist/{id}
<p>Retrieves the search and status information for the specified watchlist search</p>

### Request Parameters
- [Path] <b>id (required)</b> - The watchlist search id returned from the search call

### Response Parameters
- <b>id</b> - The unique id of the search
- <b>groupId</b> - The group of the search
- <b>organizationId</b> - The organization of the search
- <b>checkId</b> - The associated check that created the watchlist search (if applicable)
- <b>status</b> - The status of the search
- <b>searchDate</b> - The UTC date / time of the search
- <b>searchType</b> - The type of search (text, visual, text and visual)
- <b>recheckInterval</b> - The auto-recurring search interval for this search to be performed (days)
- <b>lastRecheckDate</b> - The UTC date / time of the last recurring search that was done based on this search
- <b>searchCriteria</b> - The search criteria provided for the search

#### Example Response
<pre>
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
</pre>

---
## GET api/watchlist/getbycheckid/{checkId}
<p>Retrieves the watchlist search that was created as the result of a check enrollment that had a check type of watchlist search associated with it - refer to: https://github.com/goaver/api-integration/blob/master/docs/check.md#get-apicheckidresults
</p>

### Request Parameters
- [Path] <b>checkId (required)</b> - The check enrollment that the watchlist search was created from

### Response Parameters
- <b>id</b> - The unique id of the search
- <b>groupId</b> - The group of the search
- <b>organizationId</b> - The organization of the search
- <b>checkId</b> - The associated check that created the watchlist search
- <b>status</b> - The status of the search
- <b>searchDate</b> - The UTC date / time of the search
- <b>searchType</b> - The type of search (text, visual, text and visual)
- <b>recheckInterval</b> - The auto-recurring search interval for this search to be performed (days)
- <b>lastRecheckDate</b> - The UTC date / time of the last recurring search that was done based on this search
- <b>searchCriteria</b> - The search criteria provided for the search

#### Example Response
<pre>
{
"id": "f4d8f910-8a7b-42f0-ba40-2b2c17cb9118",
"groupId": "2d1162b5-d6a8-4936-be84-39ec873b7a60",
"organizationId": "afa22173-6a46-4761-8308-27ad4b211c40",
"checkId": "51771bd7-a5b5-4ab9-913c-f1dc15429f11",
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
},
"watchlistResults": [],
}
</pre>

---
## GET api/watchlist/{id}/results
<p>Retrieves the results for a specified watchlist</p>

### Request Parameters
- [Path] <b>id (required)</b> - The watchlist search id returned from the search call

### Response Parameters
- <b>id</b> - The unique id of the search
- <b>groupId</b> - The group of the search
- <b>organizationId</b> - The organization of the search
- <b>checkId</b> - The associated check that created the watchlist search (if applicable)
- <b>status</b> - The status of the search
- <b>searchDate</b> - The UTC date / time of the search
- <b>searchType</b> - The type of search (text, text and visual)
- <b>recheckInterval</b> - The auto-recurring search interval for this search to be performed (days)
- <b>lastRecheckDate</b> - The UTC date / time of the last recurring search that was done based on this search
- <b>searchCriteria</b> - The search criteria provided for the search
- <b>watchlistResults</b> - The list of matches found for the search criteria

#### Example Response
<pre>
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
  ]
}
</pre>

---
## GET api/watchlist/{id}/searchedlists
<p>Retrieves the list of watchlists names and versions that were searched for the results</p>

### Request Parameters
- [Path] <b>id (required)</b> - The watchlist search id returned from the search call

### Response Parameters
- <b>name</b> - The name of the list that was searched
- <b>version</b> - The version of that watchlist that was searched

#### Example Response
<pre>
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
</pre>

