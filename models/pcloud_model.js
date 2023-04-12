const axios = require("axios")

class Pcloud {

    static listRootFolder() {
        return axios.post(`https://api.pcloud.com/listfolder?username=micktharratt@hotmail.com&password=08Ooz9ZyWr6X&folderid=0`)
        .then(res => res.data.metadata.contents.filter(folder => folder.isfolder))
    }
}

module.exports = Pcloud