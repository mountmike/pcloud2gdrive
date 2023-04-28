import axios from "axios"

export default class Pcloud {
    
    static fetchFolders(folderId = 0) {
        return axios.get(`/api/pcloud/folder/${folderId}`)
        .then(res => res.data.contents.filter(folder => folder.isfolder))
    }

}
