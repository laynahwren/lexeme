import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Home.css'

export const HomePage = () => {
    const user = useSelector(state => state.user)

    return (user.name ? <></> : <Navigate to='/' />)
}