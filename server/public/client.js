import renderAddTransferPage from "/components/add_transfer_component.js"
import { renderTaskListPage, renderTaskList } from "/components/task_list_component.js"
import renderPcloudFolders from "/components/pcloud_component.js"
import renderGdriveFolders from "/components/gdrive_component.js"

let originFolderSelection;
let destinationFolderSelection;
let taskName;

const appWrapper = document.querySelector(".app")
appWrapper.addEventListener("click", handleAppClicks)

const taskListBtn = document.querySelector("#taskListBtn")
const addTransferBtn = document.querySelector("#addTransferBtn")

addTransferBtn.addEventListener('click', handleAddTransferBtn)
taskListBtn.addEventListener('click', handleTaskListBtn)

function el(id) {
    return document.querySelector(id)
}

function handleAddTransferBtn(e) {
    appWrapper.innerHTML = renderAddTransferPage()
    renderPcloudFolders()
    renderGdriveFolders()
}

function handleTaskListBtn(e) {
    appWrapper.innerHTML = renderTaskListPage()
    renderTaskList()
}

function handleAppClicks(e) {
    if (e.target.name === "originFolderSelection") {
        handleOriginFolderSelection(e)
    } else if (e.target.name === "destinationFolderSelection") {
        handleDestinationFolderSelection(e)
    } else if (e.target.id === "startTransferBtn") {
        taskName = el("#taskNameInput").value
        addNewTask(taskName, originFolderSelection, destinationFolderSelection)
        handleTaskListBtn(e)
    }
    // console.log(e.target);
}

function handleOriginFolderSelection(e) {
    originFolderSelection = e.target.value
    console.log(originFolderSelection);
    if (originFolderSelection && destinationFolderSelection) {
        el("#startTransferBtn").disabled = false
    } 
}

function handleDestinationFolderSelection(e) {

    destinationFolderSelection = e.target.value
    if (originFolderSelection && destinationFolderSelection) {
        el("#startTransferBtn").disabled = false
    } 
}

function addNewTask(taskName, originId, destinationId) {
    axios.post(`/task`, { taskName, originId, destinationId})
}

document.querySelector("#authorisePcloudBtn").addEventListener('click', function (e) {
    window.open('/pcloud/authURL','popup','width=600,height=600')
});

document.querySelector("#authoriseGdriveBtn").addEventListener('click', function (e) {
    window.open('/gdrive/authURL','popup','width=600,height=600')
});