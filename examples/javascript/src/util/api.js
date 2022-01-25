const REST = require("./rest").REST;

class API {
    constructor(url, key, secret){
        this.url = url;
        this.basicAuth = btoa(key + ":" + secret);
    }

    async getToken(){
        if(!this.token) {
            let res = await this.get("/auth/token");
            this.token = res.token;
            console.log("Auth token received: " + this.token);
        }
        else {
            //TODO: Refresh based on a time interval
            //let res = await this.api.post("/auth/refresh", null, { token: this.token });
            //this.token = res.token;
            //console.log("Auth token refreshed: " + this.token);
        }

        return this.token;
    }

    async getHeaders(endpoint) {
        if(endpoint.includes("/auth"))
            return { "Authorization": "Basic " + this.basicAuth };
        else
		    return { "Authorization": "Bearer " + await this.getToken() };
	}
    
    async get(endpoint)
    {
        return await REST.get(this.url + endpoint, await this.getHeaders(endpoint));
    }

    async post(endpoint, data)
    {
        return await REST.post(this.url + endpoint, await this.getHeaders(endpoint), data);
    }
}

exports.API = API;