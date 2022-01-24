---
id: readingcheckresults
title: Reading Check Results
sidebar_label: Reading Check Results
---

Aver evaluates a wide range of data about an individual and reports back the findings so they can be used to drive business decisions about eligibility.  Although more detail is provided, these are the core elements that are generally used to determine whether or not an applicant is eligible or requires further review by the organization.  For details on all available fields and possible values, refer to <a href="/docs/check#get-apicheckidresults">Check Results</a>.

### Status
Whether or not the check was `Completed` or `Rejected`.  

<b>NOTE: Status is not a "pass" or "fail" of the eligibility of the individual.</b>  This status only determines whether or not there was enough valid data provided that results were able to be determined.  The consumer of the API is responsible for using the results to determine eligibility based on their business and due diligence requirements.

### Status Reason
The reason for the rejection if status is `Rejected`.

### Warnings
Check warnings are the easiest way to quickly determine checks that require further investigation based on preconfigured warnings in the check group settings.  See <a href="/docs/checkgroups#check-warning-settings">Check Group Warning Settings</a> for more details.

### Attestations
- <b>Over 18</b> - the individual was verified to be over the age of 18
- <b>Over 21</b> - the individual was verified to be over the age of 21
- <b>Accredited Investor</b> - the individual was verified as an accredited investor
- <b>Covid Vaccinated</b> - the individual was verified to be covid vaccinated

### Risk Profile

- <b>Facial Match Confidence</b> - the facial match confidence level %
- <b>IP and Device Analysis Results</b>

    - <b>Fraud Score</b> - the IP address fraud score based on all factors
    - <b>VPN or TOR</b> - the check IP address was determined to be a VPN or TOR address
    - <b>Recent Abuse</b> - the IP address has been reported for recent abuse

- <b>Email Analysis Results</b>

    - <b>Suspect</b> - whether or not the e-mail address is suspect based on all factors
    - <b>Valid Address</b> - whether or not the e-mail address is a valid e-mail address
    - <b>Temporary / Disposable</b> - whether or not the e-mail address is a disposable or temporary address
    - <b>Catch All / Shared</b> - whether or not the e-mail address is a catch-all or shared address

### Address Verification

- <b>Valid Address</b> - the physical address provided was able to be verified as valid
- <b>Reported Fraud</b> - the physical address provided had fraud reported (US only)

### Phone Verification

- <b>High Risk</b> - the phone number is flagged as high risk based on all factors
- <b>Active</b> - the phone number provided is an active and valid phone number
- <b>VOIP</b> - the phone number is a VOIP number
- <b>Prepaid</b> - the phone number is a prepaid or disposable number

### Watchlist Search
- The corresponding Watchlist Search that was performed automatically as a result of the check type ettings. Detailed watchlist search results are queried separately.  See <a href="/docs/readingwatchlistresults">Reading Watchlist Results</a>.  






