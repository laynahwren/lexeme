import { FaRegStar, FaStar } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import './WordContainer.css'

const WordContainer = (props) => {
    const navigate = useNavigate()

    const getDefCount = () => {
        return props.word.meanings.map(def => {
            return (
                <div key={def.partOfSpeech}>
                    <span>{def.partOfSpeech === 'adjective' ? 'adj' : def.partOfSpeech}</span>: {def.definitions.length}
                </div>
            )
        })
    }

    return (
        <div className='word-display-container'>
            <div className='word-display-title'>{props.word.word}</div>
            {props.word.favorite ? <FaStar className='favorite-icon-lexicon' size={20} /> :
                <FaRegStar className='favorite-icon-lexicon' size={20} />}
            <div className='definition-count-container'>
                {getDefCount()}
            </div>
            <div className='word-display-action'>
                View <button onClick={() => navigate(`/lexicon/${props.word.word}`)}><BsArrowRightCircle size={20} /></button>
            </div>
        </div>
    )
}

export default WordContainer