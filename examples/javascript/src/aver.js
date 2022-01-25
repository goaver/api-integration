const API = require("./util/api").API;
const CheckService = require('./services/check').CheckService;
const WatchlistService = require('./services/watchlist').WatchlistService;
const FileUtil = require('./util/file').FileUtil;

class aver
{
    constructor(url, key, secret)
    {
        let api = new API(url, key, secret);
        this.CheckService = new CheckService(api);
        this.WatchlistService = new WatchlistService(api);
    }

    async LoadImageFile(path){
        return await FileUtil.loadFileBase64(path);
    }
}

exports.Aver = aver;