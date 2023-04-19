export default class Gdrive {
    
    static fetchFolders(folderId = 'root') {
        return axios.get(`/gdrive/folders/${folderId}`).then(res => res.data)
    }

}