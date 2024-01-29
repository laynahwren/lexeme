import { FaRegStar, FaStar } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import { setUser } from '../../slices/UserSlice'
import { updateLexicon } from '../../utils/userAccount'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './WordContainer.css'

const WordContainer = (props) => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setFavorite = async () => {
        let res = await updateLexicon({...props.word, favorite: !props.word.favorite})
        dispatch(setUser({ ...user, words: res.value.words }))
    }

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
            <button className='favorite-btn-lexicon' onClick={setFavorite}>
                {props.word.favorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
            </button>
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