const fs = require('fs');

class FileUtil {
    async loadFileBase64(path){
        return new Promise((resolve,reject) => {
            fs.readFile(path, {encoding: 'base64'}, (err, res) => {
                if(err)
                    reject(err);
                else{
                    if(path.includes('.jpg'))
                        resolve("data:image/jpeg;base64," + res);
                    if(path.includes('.png'))
                        resolve("data:image/png:base64," + res);
                }
            });
        });
        
    }
}

exports.FileUtil = new FileUtil();