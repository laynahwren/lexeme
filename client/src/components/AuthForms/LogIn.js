import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiShow, BiHide } from 'react-icons/bi'
import { setLoginOpen } from '../../slices/AuthSlice'
import { login } from '../../utils/userAccount'
import './styles.css'

const LogInForm = () => {
    const [showType, setShowType] = useState('password')
    useSelector(state => state.auth.loginOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = () => {
        login({
            email: document.getElementById('emailInput').value,
            password: document.getElementById('passwordInput').value,
        })
        navigate('/home')
    }

    return (
        <div className='auth-form-container'>
            <div className='form-title'>
                Welcome Back
            </div>
            <button id='closeBtn' onClick={() => dispatch(setLoginOpen(false))}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <form className='auth-form' id='loginForm'>
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