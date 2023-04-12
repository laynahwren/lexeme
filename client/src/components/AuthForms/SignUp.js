import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpen } from '../../slices/SignUpSlice'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiShow, BiHide, BiSearch } from 'react-icons/bi'
import './styles.css'

const SignUpForm = () => {
    const [showType, setShowType] = useState('password')
    useSelector(state => state.signUp)
    const dispatch = useDispatch()

    const onSubmit = async () => {
        const res = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('firstNameInput').value,
                email: document.getElementById('emailInput').value,
                password: document.getElementById('passwordInput').value,
                books: [],
                words: []
            })
        })
        console.log(res)
    }

    return (
        <div className='signup-container'>
            <div className='create-account'>
                Create an Account
            </div>
            <button id='closeBtn' onClick={() => dispatch(setOpen(false))}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <form id='signupForm' onSubmit={onSubmit}>
                <label htmlFor='firstNameInput'>First Name</label>
                <input id='firstNameInput' type='text' placeholder='Enter your name' required />
                <label htmlFor='emailInput'>Email</label>
                <input id='emailInput' type='text' placeholder='Enter your email' required />
                <label id='passwordLabel' htmlFor='passwordInput'>
                    Password
                    {showType === 'password' ?
                        <button id='showPassword' type='button' onClick={() => setShowType('text')}><BiShow size={16} /></button> :
                        <button id='hidePassword' type='button' onClick={() => setShowType('password')}><BiHide size={16} /></button>
                    }
                </label>
                <input id='passwordInput' type={showType} placeholder='Enter a password' required />
                <label htmlFor='currentBookInput'>Current Read</label>
                <div className='signup-search-container'>
                    <input id='currentBookInput' type='search' placeholder='Add your current read (optional)' />
                    <button id='signupSearch' type='button' onClick={() => {}}><BiSearch size={18} /></button>
                </div>
                <input id='signupButton' type='submit' value='Sign Up' />
            </form>
        </div>
    )
}

export default SignUpForm