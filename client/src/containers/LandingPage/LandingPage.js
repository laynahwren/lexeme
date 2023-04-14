import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setSignupOpen, setLoginOpen } from '../../slices/AuthSlice'
import { SignUpForm, LogInForm } from '../../components/AuthForms'
import { BsArrowDownCircle } from 'react-icons/bs'
import Icon from '../../assets/LexemeIcon.png'
import LandingGraphicOne from '../../assets/LandingGraphic1.png'
import LandingGraphicTwo from '../../assets/LandingGraphic2.png'
import './LandingPage.css'

const LandingPage = () => {
    const { signupOpen, loginOpen } = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (user.name ? <Navigate to='/home' /> :
        <>
            <div className='landing-nav-container'>
                <img id='lexemeIcon' src={Icon} alt='Lexeme Icon' />
                <div className='landing-lexeme-title'>Lex<span>eme</span></div>
                <button id='loginButton' onClick={() => dispatch(setLoginOpen(true))}>Log In</button>
            </div>
            <div className='landing-intro-container'>
                <div className='tag-line'>
                    <div className='triangle' />
                    <div className='tag-line-text'>The Reader's Lexicon</div>
                </div>
                <hr />
                <div className='intro-description'>
                    Define and save the words you encounter on your reading journey.
                </div>
                <button id='getStartedButton' onClick={() => dispatch(setSignupOpen(true))}>Get Started</button>
                <div className='intro-description'>
                    Want to learn more?
                </div>
                <BsArrowDownCircle id='learnMoreIcon' size={32} />
                <img className='landing-graphic' id='graphicOne' src={LandingGraphicOne} alt='Graphic One' />
                <img className='landing-graphic' id='graphicTwo' src={LandingGraphicTwo} alt='Graphic Two' />
            </div>
            {signupOpen && <SignUpForm />}
            {loginOpen && <LogInForm />}
        </>
    )
}

export default LandingPage