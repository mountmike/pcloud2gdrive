import Gdrive from "../apis/api_gdrive.js"

function renderFolder(folder) {
    return `
        <div class="folder">
            <input type="radio" value="${folder.id}" name="destinationFolderSelection">
            <img class="folder-icon" src="/images/folder.png" alt="">
            <p>${folder.name}<p>
        </div>
    `
}

function renderFolderList(folders) {
    document.querySelector(".gdrive-folders").innerHTML = folders.map(folder => renderFolder(folder)).join("")
}


export default function renderGdriveFolders() {
    Gdrive.fetchFolders()
    .then(folders => renderFolderList(folders))
}