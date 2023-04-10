import { BsArrowDownCircle } from 'react-icons/bs'
import Icon from '../../assets/LexemeIcon.png'
import LandingGraphicOne from '../../assets/LandingGraphic1.png'
import LandingGraphicTwo from '../../assets/LandingGraphic2.png'
import './LandingPage.css'

const LandingPage = () => {
    return (<>
        <div className='landing-nav-container'>
            <img id='lexemeIcon' src={Icon} alt='Lexeme Icon' />
            <div className='landing-lexeme-title'>Lex<span>eme</span></div>
            <button id='loginButton'>Log In</button>
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
            <button id='getStartedButton'>Get Started</button>
            <div className='intro-description'>
                Want to learn more?
            </div>
            <BsArrowDownCircle id='learnMoreIcon' size={32} />
            <img className='landing-graphic' id='graphicOne' src={LandingGraphicOne} alt='Graphic One' />
            <img className='landing-graphic' id='graphicTwo' src={LandingGraphicTwo} alt='Graphic Two' />
        </div>
    </>)
}

export default LandingPage