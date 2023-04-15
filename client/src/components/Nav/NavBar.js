import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { GiWhiteBook, GiBookshelf } from 'react-icons/gi'
import { IoHome, IoLogOutOutline } from 'react-icons/io5'
import { logout } from '../../utils/userAccount'
import { setUser } from '../../slices/UserSlice'
import './NavBar.css'

const NavBar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [active, setActive] = useState(location.pathname)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        setActive(location.pathname)
    }, [location])

    const onLogout = async () => {
        await logout()
        .then((res) => {
            if(res) {
                dispatch(setUser({
                    name: null,
                    email: null,
                    books: [],
                    words: []
                }))
            }
        })
    }

    return (
        <div className='navbar-container'>
            <Link to='/library' className={active === '/library' ? 'nav-active' : null}><GiBookshelf size={32} /></Link>
            <Link to='/lexicon' className={active === '/lexicon' ? 'nav-active' : null}><GiWhiteBook size={32} /></Link>
            <Link to='/home' className={active === '/home' ? 'nav-active' : null}><IoHome size={32} /></Link>
            <button id='userMenuBtn' onClick={() => setMenuOpen(!menuOpen)}>
                <FaUserCircle size={32} />
                {menuOpen &&
                    <div className='user-menu'>
                       <div id='logoutBtn' onClick={onLogout}><IoLogOutOutline size={24} />{'Log Out'}</div>
                    </div>
                }
            </button>
        </div>
    )
}

export default NavBar