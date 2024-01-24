import { FaRegStar, FaStar } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import './WordContainer.css'

const WordContainer = (props) => {

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
            <button className='favorite-btn-lexicon'>
                {props.word.favorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
            </button>
            <div className='definition-count-container'>
                {getDefCount()}
            </div>
            {/* Need minimized display with arrow on right of container when on smaller screens */}
            <div className='word-display-action'>
                View <button><BsArrowRightCircle size={20} /></button>
            </div>
        </div>
    )
}

export default WordContainer