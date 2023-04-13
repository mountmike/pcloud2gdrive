export default function renderAddTransferPage() {
    return `
        <section class="folders">
        <div class="pcloud-wrapper">
            <h2>Origin</h2>
            <p>Pcloud Drive</p>
            <div class="pcloud-folders"></div>
        </div>
        <div class="gdrive-wrapper">
            <h2>Destination</h2>
            <p>Google Drive</p>
            <div class="gdrive-folders"></div>
        </div>
        </section>
        <button disabled id="nextBtn">next</button>
    `
}