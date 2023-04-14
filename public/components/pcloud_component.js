import Pcloud from "../apis/api_pcloud.js"

function renderFolder(folder) {
    return `
        <div class="folder">
            <input type="radio" value="${folder.folderid}" name="originFolderSelection">
            <img class="folder-icon" src="/images/folder.png" alt="">
            <p>${folder.name}</p>
        </div>
    `
}

function renderFolderList(folders) {
    document.querySelector(".pcloud-folders").innerHTML = folders.map(folder => renderFolder(folder)).join("")
}


export default function renderPcloudFolders() {
    Pcloud.fetchFolders()
    .then(folders => renderFolderList(folders))
}
