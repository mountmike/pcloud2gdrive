import { useState, useEffect } from 'react'
import axios from 'axios';
import './Aside.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCloud } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'

export default function Aside({ user }) {

    return (
        <aside>
            <Link to="/add-cloud">
                <button className='asideBtn'>
                    <FontAwesomeIcon id='addCloudIcon' icon={faCirclePlus} size="lg" color='#042A2B' fixedWidth />
                <span>Add Cloud</span>
                </button>
            </Link>
            
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