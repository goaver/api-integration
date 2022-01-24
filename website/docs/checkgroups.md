---
id: checkgroups
title: Check Groups
sidebar_label: Check Groups
---

<p>
A Check Group is an organizational unit for a collection of Verification Checks and / or Watchlist Searches that also provide the default configuration settings for any entities created within the group. Check groups are created and configured via the Aver portal.
</p>
<p>
<b>It is important to be aware that check groups have an entity limit of 1M Verification Checks and 1M Watchlist Searches</b>.  Monitoring the number of entities created within a given check group is important to ensure you are not close to exceeding the capacity of the group.  Best practice for high-volume implementations would be to segment your checks into groups or to create new check groups and roll forward at a known interval (ie: yearly), depending on volume.  In most cases this is a non-issue, however for high-volume integrations it is important to be aware of.
</p>


## Check Type Settings
<p>
Check type settings determine what check types, liveness requirements, and supplemental documents are performed or required for any check created within the group.
</p>

### Check Types
- <b>Document Verification</b> - Identification document verification
- <b>Facial Recognition Analysis</b> - Added liveness detection by requiring a user selfie to facial match to the identification document
- <b>E-Mail Verification</b> - E-Mail address to verify for the individual
- <b>Address Verification</b> - Physical mailing address to verify for the individual
- <b>Phone Verification</b> - Phone number to verify for the individual
- <b>Watchlist Search</b> - Automatically perform a watchlist search using verified information from the identification check process
- <b>Visual Watchlist</b> - Use identification document and selfie to face match against visual databases to determine potential use of an alias
- <b>Accredited Investor</b> - Verify documentation to determine that the individual is an accredited investor
- <b>Covid Vaccination Verification</b> - Verify documentation to determine that the individual is COVID-19 vaccinated

### Facial Recognition Analysis Options
- <b>Enhanced Liveness Capture</b> - Require a second selfie from the individual requiring a randomly requested pose to perform enhanced liveness detection

### Additional Required Document(s)
- <b>Utility Bill</b> - User must provide image(s) of their utility bill
- <b>Tax Document</b> - User must provide image(s) of their tax document
- <b>Bank or Credit Card</b> - User must provide image(s) of their bank or credit card
- <b>Medical Card</b> - User must provide image(s) of their medical card


## Check Watchlist Settings
<p>
The check watchlist settings determine whether or not a watchlist search is automatically performed and associated with the verified identity after the check is complete.
</p>

### Watchlist Search Categories
- <b>Criminal</b> - lists containing criminal activity such as most wanted and fugitive lists
- <b>Terrorism</b> - lists containing known terrorism incidents foreign and domestic
- <b>Financial Crimes</b> - lists containing incidents around financial crimes and securities fraud
- <b>Financial Notices</b> - lists with financial notices
- <b>Borrower Defaults</b> - lists with borrower defaults such as student loan defaults
- <b>Political</b> - lists with politically exposed persons and other political sanctions
- <b>Medical</b> - lists for medicare / medicaid violations and other medical license related sanctions
- <b>Sexual Offenses</b> - lists containing sexual offenses
- <b>Gambling and Gaming</b> - lists of individuals barred from gambling and gaming control board bans
- <b>Education</b> - lists containing education related restrictions


### Adverse Media Search
When enabled,the search will also perform a web search to find published articles with the search criteria for any potential criminal and civil offenses.

### Watchlist Search Interval
Setting a watchlist search interval will automatically re-run the same watchlist search criteria at scheduled intervals (weekly, monthly, quarterly, etc)


## Check Warning Settings 

The check warnings configure the criteria in which to display a warning if the verification check or watchlist search fall within the restricted criteria.  
<b>NOTE:</b> This feature is only available for plans that support check warnings and advanced API functionality.


### Identity Warnings
- <b>Identification Document Used Previously</b> - warn if the identification document has been used in a previous check
- <b>Email Address Used Previously</b> - warn if the e-mail address has been used in a previous check
- <b>Name and Locale Used Previously</b> - warn if the name and location has been used in a previous check
- <b>Applicant Underage</b> - warn if the applicant is under the age of 18

### Access Location
- <b>Accessed over VPN or TOR</b> - warn if the applicant IP address is using a VPN or TOR address

### Email Warnings
- <b>Email Address Invalid</b> - warn if the e-mail address is invalid or suspect

### Address Warnings
- <b>Address Invalid or Fraud Reported</b> - warn if the mailing address is invalid or fraud has been reported

### Phone Warnings
- <b>Phone Invalid or Inactive</b> - warn if the phone number is invalid or inactive
- <b>VOIP or Prepaid</b> - warn if the phone number is a VOIP or prepaid / disposable number

### Watchlist and Adverse Media Warnings
- <b>Watchlist Search Hits Found</b> - warn if any watchlist search hits were found if the watchlist search was automatically performed as part of the check
- <b>Adverse Media Hits Found</b> - warn if any adverse media search hits were found if the adverse media search was automatically performed as part of the check

### Geographic Restriction Warnings
- <b>Restricted Countries</b> - warn if the identity of the individual resides in a restricted country
- <b>Restricted US States</b> - warn if the identity of the individual resides in a restricted US State
- <b>Restricted Canadian Provinces</b> - warn if the identity of the individual resides in a restricted Canadian Province

## Overriding Check Group Settings
<p>
Check group settings can be overridden on a per-check basis when creating a check via the API.  Refer to <a href="/docs/check">Create a Check</a>
</p>