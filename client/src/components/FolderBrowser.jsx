import Folder from './Folder'

function FolderBrowser({folders}) {
    return (
        <section className="folder-browser">
                {folders?.map((folder, index) => <Folder key={index} />)}
        </section>
    )
}

export default FolderBrowser