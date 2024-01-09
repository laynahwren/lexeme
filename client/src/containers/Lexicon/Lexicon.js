import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from '../../components/Nav/NavBar'
import './Lexicon.css'

const Lexicon = () => {
    const user = useSelector(state => state.user)

    return (user.name ?
        <>
            <NavBar />
            <div className='page-title'>{user.name}'s<span> Lexicon</span></div>
        </> :
        <Navigate to='/' />
    )
}

export default Lexicon