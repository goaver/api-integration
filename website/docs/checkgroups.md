---
id: checkgroups
title: Check Groups
sidebar_label: Check Groups
---

<p>
The Check Group is an organizational unit for a collection of Verification Checks and / or Watchlist Searches that also provide default configuration settings for any entities created within the group.  When creating a Verification Check or Watchlist Search, a Check Group Id is required to determine the Check Group scope to create the requested entity in.
</p>

<p>
<b>It is important to be aware that check groups have an entity limit of 1M Verification Checks and 1M Watchlist Searches</b>.  Monitoring the number of entities created within a given check group is important to ensure you are not close to exceeding the capacity of the group.  Best practice for high-volume implementations would be to create new check groups and roll forward at a known interval (monthly, yearly, etc), depending on volume.  In most cases this is a non-issue, however for high-volume integrations it is important to be aware of.
</p>

### Check Group Settings

### Overriding Check Group Settings