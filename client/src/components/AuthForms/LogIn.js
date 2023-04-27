import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiShow, BiHide } from 'react-icons/bi'
import { setLoginOpen } from '../../slices/AuthSlice'
import { setUser } from '../../slices/UserSlice'
import { login } from '../../utils/userAccount'
import { AuthError } from '../Errors'
import './styles.css'

const LogInForm = () => {
    const [showType, setShowType] = useState('password')
    const [error, setError] = useState({})
    useSelector(state => state.auth.loginOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async () => {
        await login({
            email: document.getElementById('emailInput').value,
            password: document.getElementById('passwordInput').value,
        }).then((res) => {
            if (!res) {
                setError({ message: 'An unexpected error occured' })
            } else if (res.message === 'Incorrect email') {
                setError({
                    message: 'An account with that email doesn\'t exist.',
                    action: 'signup',
                    actionText: 'Create account'
                })
            } else if (res.message === 'Incorrect password') {
                setError({
                    message: 'Incorrect password',
                })
            } else {
                dispatch(setLoginOpen(false))
                dispatch(setUser(res))
                navigate('/home')
            }
        })
    }

    return (
        <div className='dialogue-container'>
            <div className='form-title'>
                Welcome Back
            </div>
            <button className='close-btn' onClick={() => dispatch(setLoginOpen(false))}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <form className='auth-form' id='loginForm'>
            {error.message &&
                    <AuthError action={{ action: error.action, text: error.actionText }}>{error.message}</AuthError>}
                <label htmlFor='emailInput'>Email</label>
                <input id='emailInput' type='text' placeholder='Enter your email' required autoComplete='off' />
                <label id='passwordLabel' htmlFor='passwordInput'>
                    Password
                    {showType === 'password' ?
                        <button className='show-hide-password' type='button' onClick={() => setShowType('text')}>
                            <BiShow size={16} />
                        </button> :
                        <button className='show-hide-password' type='button' onClick={() => setShowType('password')}>
                            <BiHide size={16} />
                        </button>
                    }
                </label>
                <input id='passwordInput' type={showType} placeholder='Enter a password' required />
                <button className='submit-btn' id='loginBtn' type='button' onClick={onSubmit}>Log In</button>
            </form>
        </div>
    )
}

export default LogInForm