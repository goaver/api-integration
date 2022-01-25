const axios = require("axios");

class REST {
    async get(url, headers){
        return new Promise(function (resolve, reject) {
            var opts = { headers };
            axios.get(url, opts)
                .then((response) => {
                    resolve(response.data); 
                })
                .catch((error) => {
                    if( error.response ){
                        console.log("Error: " + error.response.status + " -> " + JSON.stringify(error.response.data)); 
                    }
                    reject(error);
                });
		});
    }

    async post(url, headers, data){
        return new Promise(function (resolve, reject) {
            var opts = { headers };
            axios.post(url, data, opts)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if( error.response ){
                        console.log("Error: " + error.response.status + " -> " + JSON.stringify(error.response.data)); 
                    }
                    reject(error);
                });
		});
    }
}

exports.REST = new REST();