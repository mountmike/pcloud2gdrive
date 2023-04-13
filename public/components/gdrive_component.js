import Gdrive from "../apis/api_gdrive.js"

const folderList = document.querySelector(".gdrive-folders")

function renderFolder(folder) {
    return `
        <div class="folder">
            <input type="radio" value="${folder.id}" name="destinationFolderSelection">
            <img class="folder-icon" src="/images/folder.png" alt="">
            <h4>${folder.name}</h4>
        </div>
    `
}

function renderFolderList(folders) {
    folderList.innerHTML = folders.map(folder => renderFolder(folder)).join("")
}

Gdrive.fetchFolders()
    .then(folders => renderFolderList(folders))