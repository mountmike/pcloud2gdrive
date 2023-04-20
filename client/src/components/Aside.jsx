import { useState } from 'react'
import './Aside.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCloud } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'

export default function Aside() {


    return (
        <aside>
            <Link to="/add-cloud">
                <button className='asideBtn'>
                    <FontAwesomeIcon id='addCloudIcon' icon={faCirclePlus} size="lg" color='#042A2B' fixedWidth />
                <span>Add Cloud</span>
                </button>
            </Link>
            <button className='asideBtn'>
                <FontAwesomeIcon id='addCloudIcon' icon={faCloud} size="lg" color='#042A2B' fixedWidth />
                <span>Pcloud</span>
            </button>
            <button className='asideBtn'>
                <FontAwesomeIcon id='addCloudIcon' icon={faGoogleDrive} size="lg" color='#042A2B' fixedWidth />
                <span>Google Drive</span>
            </button>
        </aside>
    )
}