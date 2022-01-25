class watchlistService
{
    constructor(api){
        this.api = api;
    }

    async search(data){
        return await this.api.post("/watchlist/search", data);
    }

    async get(id){
        return await this.api.get("/watchlist/" + id);
    }

    async getByCheckId(checkId){
        return await this.api.get("/watchlist/getbycheckid/" + checkId);
    }

    async results(id){
        return await this.api.get("/watchlist/" + id + "/results");
    }

    async searchedLists(id){
        return await this.api.get("/watchlist/" + id + "/searchedlists");
    }
}

exports.WatchlistService = watchlistService;