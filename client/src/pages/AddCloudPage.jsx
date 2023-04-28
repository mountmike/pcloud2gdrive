import './AddCloudPage.css'
import {useEffect, useState} from "react";

export default function AddCloudPage() {
    const [externalPopup, setExternalPopup] = useState(null);

    const connectClick = (e) => {
        if (e.currentTarget.id === "connectPcloud") {
            const width = 800;
            const height = 700;
            const left = window.screenX + (window.outerWidth - width) / 2;
            const top = window.screenY + (window.outerHeight - height) / 2.5;
            const title = `CONNECT TO PLCOUD`;
            const url = `https://my.pcloud.com/oauth2/authorize?redirect_uri=${process.env.REACT_APP_PCLOUD_REDIRECT_URI}&client_id=${process.env.REACT_APP_PCLOUD_CLIENT_ID}&response_type=code`;
            const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
            setExternalPopup(popup);

        } else if (e.currentTarget.id === "connectGdrive") {
            const width = 800;
            const height = 700;
            const left = window.screenX + (window.outerWidth - width) / 2;
            const top = window.screenY + (window.outerHeight - height) / 2.5;
            const title = `CONNECT TO GDRIVE`;
            const url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https://www.googleapis.com/auth/drive&response_type=code&client_id=${process.env.REACT_APP_GDRIVE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GDRIVE_REDIRECT_URI}&approval_prompt=force`
            const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
            setExternalPopup(popup);
        }

    }
    
    return (
        <main className="add-cloud-page">
            <h3>Select Cloud Service</h3>
            <p>Click on the cloud drive to connect to it</p>
            <div className="btn-wrapper">
                <button id='connectPcloud' onClick={connectClick}>
                    <img className='cloud-logo-img' src="/images/logo_pcloud.png" alt="" srcset="" />
                    <p>PCloud Drive</p>
                </button>
                <button id='connectGdrive' onClick={connectClick}>
                    <img className='cloud-logo-img' src="/images/logo_gdrive.png" alt="" srcset="" />
                    <p>Google Drive</p>
                </button>
            </div>
        </main>
    )
}