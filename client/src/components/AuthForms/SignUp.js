import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSignupOpen } from '../../slices/AuthSlice'
import { setUser } from '../../slices/UserSlice'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiShow, BiHide } from 'react-icons/bi'
import { login, signup } from '../../utils/userAccount'
import { AuthError } from '../Errors'
import './styles.css'

const SignUpForm = () => {
    const [showType, setShowType] = useState('password')
    const [error, setError] = useState({})
    useSelector(state => state.auth.signupOpen)
    const dispatch = useDispatch()
    const naviagte = useNavigate()

    const onSubmit = async () => {
        await signup({
            name: document.getElementById('firstNameInput').value,
            email: document.getElementById('newEmailInput').value,
            password: document.getElementById('newPasswordInput').value,
            books: [],
            words: []
        })
            .then(async (res) => {
                if (!res) {
                    setError({ message: 'An unexpected error occured' })
                } else if (res.message === 'Existing user') {
                    setError({
                        message: 'An account with that email already exists',
                        action: 'login',
                        actionText: 'Log in'
                    })
                } else {
                    await login(res)
                        .then((res) => {
                            if (!res) {
                                setError({ message: 'An unexpected error occured' })
                            } else {
                                dispatch(setSignupOpen(false))
                                dispatch(setUser(res))
                                naviagte('/home')
                            }
                        })
                    }
            })
    }

    return (
        <div className='dialogue-container'>
            <div className='form-title'>
                Create an Account
            </div>
            <button className='close-btn' onClick={() => dispatch(setSignupOpen(false))}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <form className='auth-form' id='signupForm'>
                {error.message &&
                    <AuthError action={{ action: error.action, text: error.actionText }}>{error.message}</AuthError>}
                <label htmlFor='firstNameInput'>First Name</label>
                <input id='firstNameInput' type='text' placeholder='Enter your name' required autoComplete='off' />
                <label htmlFor='newEmailInput'>Email</label>
                <input id='newEmailInput' type='text' placeholder='Enter your email' required autoComplete='off' />
                <label id='newPasswordLabel' htmlFor='passwordInput'>
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
                <input id='newPasswordInput' type={showType} placeholder='Enter a password' required />
                <button className='submit-btn' id='signupButton' type='button' onClick={onSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm