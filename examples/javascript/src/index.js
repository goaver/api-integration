const Aver = require("./aver").Aver;
const apiUrl = "https://app.goaver.com/api";
const apiKey = "API_KEY";
const apiSecret = "API_SECRET";
const groupId = "CHECK_GROUP_ID";

async function init(){
    //Create a check
    //await doCheckWithGroupDefaults()

    //Get the results for a check
    //await getWatchlistSearchResultsForCheck("CHECK_ID");

    //Create an ad-hoc watchlist search
    //await doWatchlistSearchWithGroupDefaults();

    //Get the results for a watchlist search
    //await getWatchlistSearchResults("SEARCH_ID");
}

async function doCheckWithGroupDefaults(){
    let aver = new Aver(apiUrl, apiKey, apiSecret);

    //Create the check construct in the system
    console.log("Creating check...");
    let checkData = {
        groupId: groupId,
        thirdPartyIdentifier: "TPID-12345",
        email: "support@goaver.com",
        overrideThirdPartyIdentifier: true //Use this to allow re-use of the TPID
    }
    let check = await aver.CheckService.create(checkData);
    if(!check == "success")
        throw new Error("Error creating check");
    else
        console.log("Check created: " + JSON.stringify(check));

    //If we wanted to use hosted enrollment, just redirect the user to check.url right here
    //And we are done.  Otherwise, continue populating check data via the API

    //Add personal info to the check
    console.log("Adding personal info...");
    let personalData = {
        ipAddress: "192.252.213.158", //Optional, but if we want to risk assess the API, it needs to be provided
        firstName: "Jennifer",
        middleName: null,
        lastName: "Collee",
        suffix: null,
        gender: "F",
        dateOfBirth: "05/05/1979",
        country: "CA",
        streetAddress1: "12345 Unprovided Rd",
        streetAddress2: null,
        city: "Toronto",
        stateOrProvince: "Ontario",
        postalCode: "M1R 0E9"
    }
    let personalRes = await aver.CheckService.addPersonalInfo(check.checkId, personalData);
    if(personalRes != "success")
        throw new Error("Error adding personal data");
    else
        console.log("Personal info added");

    console.log("Adding phone...");
    let phoneData = {
        number: "8183511153",
        country: "US"
    };
    let phoneRes = await aver.CheckService.addPhone(check.checkId, phoneData);
    if(phoneRes != "success")
        throw new Error("Error adding phone");
    else
        console.log("Phone added");

    //Add the identification document
    console.log("Adding identification document...");
    let idContent = await aver.LoadImageFile(__dirname + "/images/example-can-passport.jpg");
    let idData = {
        docType: "PassportImage",
        side: "Front",
        fileName: "can-passport-example.jpg",
        fileContent: idContent
    }
    let idRes = await aver.CheckService.addIdDocument(check.checkId, idData);
    if(idRes != "success")
        throw new Error("Error saving id document");
    else
        console.log("Identification document added");

    //Add the selfie
    console.log("Adding selfie photo...");
    let photoContent = await aver.LoadImageFile(__dirname + "/images/example-selfie.jpg");
    let photoData = {
        fileName: "example-selfie.jpg",
        fileContent: photoContent
    }
    let photoRes = await aver.CheckService.addPhotoDocument(check.checkId, photoData);
    if(photoRes != "success")
        throw new Error("Error saving photo document");
    else
        console.log("Selfie photo added");

    //Submit the check
    console.log("Submitting check...");
    let submit = await aver.CheckService.submit(check.checkId);
    console.log(JSON.stringify(submit));

    //Get the status
    console.log("Getting status...");
    let statusRes = await aver.CheckService.get(check.checkId);
    console.log("Status: " + statusRes.status);

    if(statusRes.status === "Completed"){
        console.log("Getting results...");
        let checkRes = await aver.CheckService.results(check.checkId);
        console.log("Results:");
        console.log(JSON.stringify(checkRes));
    }
}

async function doWatchlistSearchWithGroupDefaults()
{
    let aver = new Aver(apiUrl, apiKey, apiSecret);
    let data = {
        groupId: groupId,
        checkId: null,
        firstName: "John",
        middleName: null,
        lastName: "Abell",
        businessName: null,
        country: null,
        stateOrProvince: null,
        fileContent: null,
        fileName: null,
        categories: null
    }

    //Create the search
    let search = await aver.WatchlistService.search(data);
    console.log("Search Id:" + search.id);
}

async function getWatchlistSearchResultsForCheck(checkId){
    let aver = new Aver(apiUrl, apiKey, apiSecret);
    //Get the watchlist search
    console.log("Retrieving watchlist search for check...");
    let checkWatchlistRes = await aver.WatchlistService.getByCheckId(checkId);
    await getWatchlistSearchResults(checkWatchlistRes.id);
}

async function getWatchlistSearchResults(id){
    let aver = new Aver(apiUrl, apiKey, apiSecret);
    //Get the search status
    let detail = await aver.WatchlistService.get(id);
    console.log("Status: " + detail.status);

    //If it's completed, we can get the results
    if(detail.status === "Completed"){
        //Get the results
        let results = await aver.WatchlistService.results(id);
        console.log("Search Results:");
        console.log(JSON.stringify(results));

        //Get the searched lists
        let lists = await aver.WatchlistService.searchedLists(id);
        console.log("Lists Searched:");
        console.log(JSON.stringify(lists));
    }
    else {
        console.log("Not complete - status: " + detail.status);
    }
}

init();