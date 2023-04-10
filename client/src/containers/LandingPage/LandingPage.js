import Icon from '../../assets/LexemeIcon.png'
import './LandingPage.css'

const LandingPage = () => {
    return (<>
        <div className='landing-nav-container'>
            <img id='lexemeIcon' src={Icon} aria-label='Lexeme Icon' />
            <div className='landing-lexeme-title'>Lex<span>eme</span></div>
            <button id='loginButton'>Log In</button>
        </div>
    </>)
}

export default LandingPage