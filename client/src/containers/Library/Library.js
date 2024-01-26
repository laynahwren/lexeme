import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from '../../components/Nav/NavBar'
import './Library.css'

const Library = () => {
    const user = useSelector(state => state.user)

    return (user.name ?
        <>
            <NavBar />
            <div className='page-title inner-page-title'>{user.name}'s<span> Library</span></div>
        </> :
        <Navigate to='/' />
    )
}

export default Library