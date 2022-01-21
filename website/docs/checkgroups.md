---
id: checkgroups
title: Check Groups
sidebar_label: Check Groups
---

---

<p>
A Check Group is an organizational unit for a collection of Verification Checks and / or Watchlist Searches that also provide the default configuration settings for any entities created within the group. Check groups are created and configured via the Aver portal.
</p>
<p>
<b>It is important to be aware that check groups have an entity limit of 1M Verification Checks and 1M Watchlist Searches</b>.  Monitoring the number of entities created within a given check group is important to ensure you are not close to exceeding the capacity of the group.  Best practice for high-volume implementations would be to segment your checks into groups or to create new check groups and roll forward at a known interval (ie: yearly), depending on volume.  In most cases this is a non-issue, however for high-volume integrations it is important to be aware of.
</p>

---

## Check Type Settings
<p>
Check type settings determine what check types, liveness requirements, and supplemental documents are performed or required for any check created within the group.
</p>

### Check Types
- <b>Document Verification</b>
- <b>Facial Recognition Analysis</b>
- <b>E-Mail Verification</b>
- <b>Address Verification</b>
- <b>Phone Verification</b>
- <b>Watchlist Search</b>
- <b>Visual Watchlist</b>
- <b>Accredited Investor</b>
- <b>Covid Vaccination Verification</b>

### Facial Recognition Analysis Options
- <b>Enhanced Liveness Capture</b>

### Additional Required Document(s)
- <b>Utility Bill</b>
- <b>Tax Document</b>
- <b>Bank or Credit Card</b>
- <b>Medical Card</b>

---

## Check Watchlist Settings
<p>
The check watchlist settings determine whether or not a watchlist search is automatically performed and associated with the verified identity after the check is complete.
</p>

### Watchlist Search Categories
- <b>Criminal</b>
- <b>Terrorism</b>
- <b>Financial Crimes</b>
- <b>Financial Notices</b>
- <b>Borrower Defaults</b>
- <b>Political</b>
- <b>Medical</b>
- <b>Sexual Offenses</b>
- <b>Gambling and Gaming</b>
- <b>Education</b>


### Adverse Media Search
When enabled,the search will also perform a web search to find published articles with the search criteria for any potential wrongdoing.

### Watchlist Search Interval
Setting a watchlist search interval will automatically re-run the same watchlist search criteria at scheduled intervals (weekly, monthly, quarterly, etc)

---

## Check Warning Settings 
<p>
The check warnings configure the criteria in which to display a warning if the verification check or watchlist search fall within the restricted criteria.
</p>

### Identity Warnings
- <b>Identification Document Used Previously</b>
- <b>Email Address Used Previously</b>
- <b>Name and Locale Used Previously</b>
- <b>Applicant Underage</b>

### Access Location
- <b>Accessed over VPN or TOR</b>

### Email Warnings
- <b>Email Address Invalid</b>

### Address Warnings
- <b>Address Invalid or Fraud Reported</b>

### Phone Warnings
- <b>Phone Invalid or Inactive</b>
- <b>VOIP or Prepaid</b>

### Watchlist and Adverse Media Warnings
- <b>Watchlist Search Hits Found</b>
- <b>Adverse Media Hits Found</b>

### Geographic Restriction Warnings
- <b>Restricted Countries</b>
- <b>Restricted US States</b>
- <b>Restricted Canadian Provinces</b>

---

## Overriding Check Group Settings
<p>
Check group settings can be overridden on a per-check basis when creating a check via the API.  Refer to <a href="/docs/check">Create a Check</a>
</p>