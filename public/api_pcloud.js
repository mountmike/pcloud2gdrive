export default class Pcloud {
    
    static fetchFolders(folderId = 0) {
        return axios.get(`/pcloud/folders/${folderId}`).then(res => console.log(res))
    }

}