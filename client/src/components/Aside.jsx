import { useState } from 'react'
import './Aside.css'

export default function Aside() {
    const [isPcloud, setIsPcloud] = useState(false)
    const [isGdrive, setIsGdrive] = useState(false)


    return (
        <aside>
            <button>Add Cloud</button>
            {isPcloud && <button>PCloud</button>}
            {isGdrive && <button>Google Drive</button>}
        </aside>
    )
}