import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from '../../components/Nav/NavBar'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { Navigate, useNavigate } from 'react-router-dom'
import './WordPage.css'

const WordPage = () => {
    const { word } = useParams()
    const user = useSelector(state => state.user)
    const definition = user.words.find(item => item.word === word)
    const navigate = useNavigate()

    return (user.name ?
        <>
            <NavBar />
            <div className='word-page-header'>
                <div className='return-from-single-view'>
                    <button onClick={() => navigate('/lexicon')}><BsArrowLeftCircle size={20} /></button>Return to Lexicon
                </div>
                <div className='page-title single-view-title'>
                    {definition.favorite ? <button><FaStar size={28} /></button> :
                        <button><FaRegStar size={28} /></button>}
                    {word}
                </div>
                <div className='single-view-subtitle'>{definition.phonetic}</div>
            </div>
        </>
        : <Navigate to='/' />
    )
}

export default WordPage