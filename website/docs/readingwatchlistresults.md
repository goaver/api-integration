---
id: readingwatchlistresults
title: Reading Watchlist Results
sidebar_label: Reading Watchlist Results
---

Reading watchlist search and adverse media search results from Aver is simple...  Although more detail is provided (see data models), these are the core fields that are used to drive business decisions.  For details on all available fields and possible values, refer to <a href="/docs/watchlist#get-apiwatchlistidresults">Watchlist Search Results</a>.


## Watchlist Search Results
If results are found, an array of watchlistResults are returned.  Given the varying fidelity of watchlist sources, it is highly recommended that any search yielding a watchlist search hit be reviewed by the business to determine the likelihood the individual matched is the individual in question. 

### Search Results Match Fields
The following properties in each result reflect the confidence of the match and the list in which a match was found.  

- <b>Match Confidence</b> - the match confidence %
- <b>Watchlist Name</b> - the watchlist name that the hit was found on
- <b>Additional Information</b> - any supplemental information provided by the list regarding the incident


### Match Confidence Detail Fields
The following fields are provided to add detail surrounding the match confidence:

- <b>First Name Match</b> - first name match status
- <b>Last Name Match</b> - last name match status
- <b>Middle Name Match</b> - middle name match status
- <b>Business Name Match</b> - business name match status
- <b>State Match</b> - state match status
- <b>Country Match</b> - country match status

For each of these elements, the potential statuses are:

- `Match` - The property was provided by both the watchlist and the search criteria and was matched
- `NoMatch` - The property was provided by both the watchlist and the search criteria, but was not matched 
- `Unavailable` - The property was not provided on the search criteria or was not available on the watchlist, so the property was unable to be matched due to omission.


## Adverse Media Search Results
If results are found, an array of adverseMediaResults are returned.  Given the varying fidelity of online sources, it is highly recommended that any search yielding an adverse media search hit be reviewed by the business to determine the likelihood the individual matched is the individual in question. 

### Search Results Match Fields
The following properties in each result reflect the confidence of the match and the list in which a match was found.  

- <b>Match Score</b> - the match score %
- <b>Name</b> - the name of the article found
- <b>Description</b> - the long description of the article found
- <b>Source</b> - the source / publisher
- <b>Url</b> - the url of the publication

### Match Score Detail Fields
The following fields are provided to add detail surrounding the match score:

- <b>First Name Match</b> - first name match status
- <b>Last Name Match</b> - last name match status
- <b>Middle Name Match</b> - middle name match status
- <b>Business Name Match</b> - business name match status
- <b>State Match</b> - state match status
- <b>Country Match</b> - country match status

For each of these elements, the potential statuses are:

- `Match` - The property was found in the publication and the search criteria and was matched
- `NoMatch` - The property was found in the publication and the search criteria, but was not matched 
- `Unavailable` - The property was not provided on the search criteria or was not available in the publication, so the property was unable to be matched due to omission.
