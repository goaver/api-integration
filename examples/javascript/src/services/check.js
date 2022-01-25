class checkService 
{
    constructor(api){
        this.api = api;
    }

    async create(data){
        return await this.api.post("/check/create", data);
    }

    async addPersonalInfo(id, data){
        return await this.api.post("/check/" + id + "/personalinfo", data);
    }

    async addPhone(id, data){
        return await this.api.post("/check/" + id + "/phone", data);
    }

    async addIdDocument(id, data){
        return await this.api.post("/check/" + id + "/iddocument", data);
    }

    async addPhotoDocument(id, data){
        return await this.api.post("/check/" + id + "/photodocument", data);
    }

    async getPhotoInstruction(id){
        return await this.api.get("/check/" + id + "/photoinstruction", data);
    }

    async addSupplementalDocument(id){
        return await this.api.post("/check/" + id + "/supplementaldocument", data);
    }

    async submit(id){
        return await this.api.get("/check/" + id + "/submit");
    }

    async get(id){
        return await this.api.get("/check/" + id);
    }

    async checkLookup(id, data){
        return await this.api.post("/check/" + id, data);
    }

    async results(id){
        return await this.api.get("/check/" + id + "/results");
    }

    async getDoc(id, docId){
        return await this.api.get("/checkdocid/" + id + "/" + docId);
    }
}

exports.CheckService = checkService;