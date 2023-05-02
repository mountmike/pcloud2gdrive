import { useState, useEffect } from 'react'
import axios from 'axios';
import './Aside.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCloud } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../db/firebase'

export default function Aside({ user }) {
    const [cloudDrives, setCloudDrives] = useState(null)

    useEffect(() => {
        const q = query(collection(db, "users", user.uid, "cloudDrives"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const accounts = [];
        querySnapshot.forEach((doc) => {
            accounts.push(doc.data());
        });
        setCloudDrives(accounts)
        });
    }, [])

    return (
        <aside>
            <Link to="/add-cloud">
                <button className='asideBtn'>
                    <FontAwesomeIcon id='addCloudIcon' icon={faCirclePlus} size="lg" color='#042A2B' fixedWidth />
                <span>Add Cloud</span>
                </button>
            </Link>
            {/* {cloudDrives.filter(drive => drive.name === "Pcloud").length && <p>Pcloud Connected</p>} */}
            
            {user.hasPcloud &&<button className='asideBtn'>
                <FontAwesomeIcon id='addCloudIcon' icon={faCloud} size="lg" color='#042A2B' fixedWidth />
                <span>Pcloud</span>
            </button>}
            {user.hasGdrive && <button className='asideBtn'>
                <FontAwesomeIcon id='addCloudIcon' icon={faGoogleDrive} size="lg" color='#042A2B' fixedWidth />
                <span>Google Drive</span>
            </button> }
        </aside>
    )
}