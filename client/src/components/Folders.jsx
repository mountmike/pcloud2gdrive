import { useEffect, useState } from 'react'
import Pcloud from '../utils/pcloud_api'
import { ColorRing } from  'react-loader-spinner'

function Folders({ parentFolder }) {
    const [folderList, setFolderList] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const expand = () => {
      if (!folderList) {
        setIsLoading(!isLoading)
        Pcloud.fetchFolders(parentFolder.id).then(folders => {
          setFolderList({ name: parentFolder.name, folders})
          setIsLoading(false)
          setIsVisible(!isVisible);
        })
      } else {
        setIsVisible(!isVisible);
      }
    };

   
    return (
        <section className="folder-browser" style={{ paddingLeft: 10 }}>
          <header><span onClick={expand}>{isVisible ? "-" : "+"}</span><input type="checkbox" /><label>{parentFolder.name}</label>
          {isLoading && <ColorRing className="folder-loading"
            visible={true}
            height="1em"
            width="1em"
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
                  <Folders parentFolder={{name: child.name, id: child.folderid}} key={child.folderid}/>
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