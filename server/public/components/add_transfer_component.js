export default function renderAddTransferPage() {
    return `
        <div class="transfer-heading">
            <h2>Transfer accross from PCloud to Google Drive</h2>
            <div class="task-name-wrapper">
                <label for="taskName">Task name:</label>
                <input id="taskNameInput" type="text" name="taskName" value="new task">
            </div>
        </div>
        <section class="folders">
        <div class="pcloud-wrapper">
            <h3>Origin</h3>
            <p>Pcloud Drive</p>
            <div class="pcloud-folders"></div>
        </div>
        <div class="gdrive-wrapper">
            <h3>Destination</h3>
            <p>Google Drive</p>
            <div class="gdrive-folders"></div>
        </div>
        </section>
        <button disabled id="startTransferBtn">Start transfer</button>
    `
}