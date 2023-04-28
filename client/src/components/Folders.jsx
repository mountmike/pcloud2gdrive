import { useEffect, useState } from 'react'
import Pcloud from '../utils/pcloud_api'
import Gdrive from '../utils/gdrive_api'
import { ColorRing } from  'react-loader-spinner'

function Folders({ parentFolder, setTargetId, drive }) {
    const [folderList, setFolderList] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const expand = () => {
      if (!folderList) {
        setIsLoading(!isLoading)
        if (drive === "pcloud") {
          Pcloud.fetchFolders(parentFolder.id).then(folders => {
            setFolderList({ name: parentFolder.name, folders})
            setIsLoading(false)
            setIsVisible(!isVisible);
          })
        } else if (drive === "gdrive") {
          Gdrive.fetchFolders(parentFolder.id).then(folders => {
            setFolderList({ name: parentFolder.name, folders})
            setIsLoading(false)
            setIsVisible(!isVisible);
          })
        }
        
      } else {
        setIsVisible(!isVisible);
      }
    };

    const handleSelection = (e) => {
      drive === "pcloud" ? setTargetId(e.target.value.slice(1)) : setTargetId(e.target.value)
      
    }

   
    return (
        <section className="folder-browser" style={{ paddingLeft: 10 }}>
          <header>
            <span onClick={expand}>{isVisible ? "-" : "+"}</span>
            <input type="radio" name={drive === "pcloud" ? "originFolder" : "targetFolder"} value={parentFolder.id} onChange={handleSelection}/>
            <label>{parentFolder.name}</label>
            {isLoading && <ColorRing className="folder-loading"
              visible={true}
              height="1.5em"
              width="1.5em"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#042A2B', '#5EB1BF', '#CDEDF6', '#EF7B45', '#429EA6']}
            />}
          </header>
          {isVisible ? (
            folderList.folders?.map((child) => {
              return (
                <div style={{ paddingLeft: 10 }}>
                  <Folders parentFolder={{name: child.name, id: child.id}} key={child.folderid} setTargetId={setTargetId} drive={drive} />
                </div>
              );
            })
          ) : (
            <></>
          )}
            </section>
    )
}

export default Folders