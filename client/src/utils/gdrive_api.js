import axios from "axios"

export default class Gdrive {
    
    static fetchFolders(folderId = 'root') {
        return axios.get(`/api/gdrive/folders/${folderId}`).then(res => res.data)
    }

}