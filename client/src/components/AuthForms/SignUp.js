import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSignupOpen } from '../../slices/AuthSlice'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiShow, BiHide } from 'react-icons/bi'
import { login } from '../../utils/userAccount'
import './styles.css'

const SignUpForm = () => {
    const [showType, setShowType] = useState('password')
    useSelector(state => state.auth.signupOpen)
    const dispatch = useDispatch()
    const naviagte = useNavigate()

    const onSubmit = async () => {
        await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('firstNameInput').value,
                email: document.getElementById('newEmailInput').value,
                password: document.getElementById('newPasswordInput').value,
                books: [],
                words: []
            })
        }).then(response => response.json())
        .then((body) => {
                login(body)
                naviagte('home')
        }); 
    }

    return (
        <div className='auth-form-container'>
            <div className='form-title'>
                Create an Account
            </div>
            <button id='closeBtn' onClick={() => dispatch(setSignupOpen(false))}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <form className='auth-form' id='signupForm'>
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