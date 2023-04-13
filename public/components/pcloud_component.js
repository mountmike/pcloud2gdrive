import Pcloud from "../apis/api_pcloud.js"

const folderList = document.querySelector(".pcloud-folders")

function renderFolder(folder) {
    return `
        <div class="folder">
            <input type="radio" value="${folder.id}" name="originFolderSelection">
            <img class="folder-icon" src="/images/folder.png" alt="">
            <h4>${folder.name}</h4>
        </div>
    `
}

function renderFolderList(folders) {
    folderList.innerHTML = folders.map(folder => renderFolder(folder)).join("")
}

Pcloud.fetchFolders()
    .then(folders => renderFolderList(folders))