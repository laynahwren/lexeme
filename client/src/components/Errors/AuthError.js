import { useSelector, useDispatch } from 'react-redux'
import { setLoginOpen, setSignupOpen } from '../../slices/AuthSlice'
import { BiErrorCircle } from 'react-icons/bi'
import './styles.css'

const AuthError = (props) => {
    useSelector(state => state.auth)
    const dispatch = useDispatch()

    const loginInstead = () => {
        dispatch(setSignupOpen(false))
        dispatch(setLoginOpen(true))
    }

    const signupInstead = () => {
        dispatch(setLoginOpen(false))
        dispatch(setSignupOpen(true))
    }

    return (
        <div className='auth-error-container'>
            <div className='auth-error-content'>
                <BiErrorCircle className='auth-error-icon' size={20} />
                <div className='auth-error-text'>{props.children}</div>
            </div>
            {props.action ?
                <button className='auth-error-action' onClick={() => {
                    props.action.action === 'login' ? loginInstead() : signupInstead()
                }}>{props.action.text}</button> : null}
        </div>
    )
}

export default AuthError