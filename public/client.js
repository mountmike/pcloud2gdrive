import renderAddTransferPage from "/components/add_transfer_component.js"
import renderPcloudFolders from "/components/pcloud_component.js"
import renderGdriveFolders from "/components/gdrive_component.js"

const appWrapper = document.querySelector(".app")

const taskListBtn = document.querySelector("#taskListBtn")
const addTransferBtn = document.querySelector("#addTransferBtn")

addTransferBtn.addEventListener('click', handleAddTransferBtn)

function handleAddTransferBtn(e) {
    appWrapper.innerHTML = renderAddTransferPage()
    renderPcloudFolders()
    renderGdriveFolders()
}






const pcloudWrapper = document.querySelector(".pcloud-wrapper")
const gdriveWrapper = document.querySelector(".gdrive-wrapper")
const startTransferBtn = document.querySelector("#startTransferBtn")

// pcloudWrapper.addEventListener('click', handleOriginFolderSelection)
// gdriveWrapper.addEventListener('click', handleDestinationFolderSelection)

let originFolderSelection;
let destinationFolderSelection;

function handleOriginFolderSelection(e) {
    if (e.target.name !== "originFolderSelection") {
        return
    }
    originFolderSelection = e.target.value
    if (originFolderSelection && destinationFolderSelection) startTransferBtn.disabled = false

}

function handleDestinationFolderSelection(e) {
    if (e.target.name !== "destinationFolderSelection") {
        return
    }
    destinationFolderSelection = e.target.value
    if (originFolderSelection && destinationFolderSelection) startTransferBtn.disabled = false
}



document.querySelector("#authorisePcloudBtn").addEventListener('click', function (e) {
    window.open('/pcloud/authURL','popup','width=600,height=600')
});

document.querySelector("#authoriseGdriveBtn").addEventListener('click', function (e) {
    window.open('/gdrive/authURL','popup','width=600,height=600')
});