import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from '../../components/Nav/NavBar'
import './Library.css'

const Library = () => {
    const user = useSelector(state => state.user)

    return (user.name ?
        <>
            <NavBar />
        </> :
        <Navigate to='/' />
    )
}

export default Library