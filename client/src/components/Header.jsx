import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'


function Header({ user, onLogout }) {
    return (
        <header className="main-header">
            <div className="spacer">
                <FontAwesomeIcon icon={faCloudArrowUp} size="2x" color='#5EB1BF' />
                <span className='tag-line'>pcloud2gdrive</span>
            </div>

            <div className="current-user">
                <FontAwesomeIcon className='icons' icon={faUser} size="xl" color='#CDEDF6' />
                <div className='dropdown-content'>
                    <header>
                        <h4>{user.username}</h4>
                    </header>
                    <button id='logoutBtn' onClick={onLogout}>logout</button>
                </div>
            </div>
        </header>
    )
}

export default Header