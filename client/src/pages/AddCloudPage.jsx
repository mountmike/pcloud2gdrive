import axios from 'axios';
import './AddCloudPage.css'
import {useEffect, useState} from "react";
import jwt_decode from 'jwt-decode'


export default function AddCloudPage() {
    const [externalPopup, setExternalPopup] = useState(null);
    const [tokenClient, setTokenClient] = useState({})

    function handleCallbackResponse(response) {
        console.log("JWT ID " + response.credential);
        const userObject = jwt_decode(response.credential)
        console.log(userObject);
    }

    function getGdriveToken() {
        tokenClient.requestAccessToken()
    }

    useEffect(() => {
        /* global google */    
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GDRIVE_CLIENT_ID,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )

        setTokenClient(
            google.accounts.oauth2.initTokenClient({
            client_id: process.env.REACT_APP_GDRIVE_CLIENT_ID,
            scope: process.env.REACT_APP_GDRIVE_SCOPES,
            callback: (tokenResponse) => {
                console.log(tokenResponse);
                // we now have access to a live token that's working.
            }
        }))

    }, [])

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
                {/* <a id='connectPcloud' href={`https://my.pcloud.com/oauth2/authorize?redirect_uri=${process.env.REACT_APP_PCLOUD_REDIRECT_URI}&client_id=${process.env.REACT_APP_PCLOUD_CLIENT_ID}&response_type=code`} > */}
                <button id='connectPcloud' onClick={connectClick}>
                    <img className='cloud-logo-img' src="/images/logo_pcloud.png" alt="" srcset="" />
                    <p>PCloud Drive</p>
                </button>
                   
                {/* </a> */}
                <button id='connectGdrive' onClick={getGdriveToken}>
                    <img className='cloud-logo-img' src="/images/logo_gdrive.png" alt="" srcset="" />
                    <p>Google Drive</p>
                </button>
                <div id='signInDiv'>   
                </div>
            </div>
        </main>
    )
}