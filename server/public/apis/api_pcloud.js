export default class Pcloud {
    
    static fetchFolders(folderId = 0) {
        return axios.get(`/pcloud/folder/${folderId}`)
        .then(res => res.data.contents.filter(folder => folder.isfolder))
    }

}