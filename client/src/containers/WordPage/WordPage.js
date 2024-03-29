import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../../components/Nav/NavBar'
import { BsArrowLeftCircle } from 'react-icons/bs'
import {
    FaRegStar, FaStar, FaChevronDown,
    FaChevronUp, FaSortAlphaDown, FaSortAlphaDownAlt,
    FaSortNumericDown, FaSortNumericDownAlt
} from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Navigate, useNavigate } from 'react-router-dom'
import { fetchWord } from '../../utils/fetcher'
import { setDefinition, setDefinitionOpen, setInWord } from '../../slices/DefinitionSlice'
import { updateLexicon } from '../../utils/userAccount'
import { setUser } from '../../slices/UserSlice'
import { sortCollection } from '../../utils/sortSearch'
import { setAlert, setAlertOpen } from '../../slices/AlertBoxSlice'
import DefinitionBox from '../../components/PopupBox/DefinitionBox'
import EmptyState from '../../components/EmptyState/EmptyState'
import './WordPage.css'

const WordPage = () => {
    const { word } = useParams()
    const user = useSelector(state => state.user)
    const { definitionOpen } = useSelector(state => state.definition)
    const [sortOpen, setSortOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const definition = user.words.find(item => item.word === word)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setInWord(true))
    })

    const setFavorite = async () => {
        let res = await updateLexicon({ ...definition, favorite: !definition.favorite })
        let sortedRes = sortCollection(res.value.words, user.wordSort.sortBy, user.wordSort.sortDirection)
        dispatch(setUser({ ...user, words: sortedRes }))
    }

    const onDelete = async () => {
        let res = await updateLexicon({ ...definition, meanings: [] })

        dispatch(setAlert({
            subject: word,
            body: ' has been removed your lexicon.',
            closeText: 'Close'
        }))

        let sortedRes = sortCollection(res.value.words, user.wordSort.sortBy, user.wordSort.sortDirection)

        dispatch(setAlertOpen(true))
        dispatch(setUser({ ...user, words: sortedRes }))

        navigate('/lexicon')
    }

    const onWordSearch = async () => {
        const def = await fetchWord(word)
        dispatch(setDefinition(def[0]))
        dispatch(setDefinitionOpen(true))
    }

    const getSynonyms = (item) => {
        return (
            <>
                <div className='definition-inner-title'>Synonyms</div>
                <div className='definition-inner-content'>{item.synonyms?.join(' - ')}</div>
            </>
        )
    }

    const getAntonyms = (item) => {
        return (
            <>
                <div className='definition-inner-title'>Antonyms</div>
                <div className='definition-inner-content'>{item.antonyms?.join(' - ')}</div>
            </>
        )
    }

    const getDefinitions = (item) => {
        return (
            <>
                <div className='definition-inner-title'>Definitions</div>
                <div className='definition-inner-content'>
                    <ul>
                        {item.definitions.map(def => {
                            return (
                                <li key={def}>{def}</li>
                            )
                        })}
                    </ul>
                </div>
            </>
        )
    }

    return (user.name ?
        <>
            <NavBar />
            <div className='word-page-header'>
                <div className='return-from-single-view'>
                    <button onClick={() => navigate('/lexicon')}><BsArrowLeftCircle size={20} /></button>Return to Lexicon
                </div>
                <div className='page-title single-view-title'>
                    <button onClick={setFavorite}>{definition?.favorite ? <FaStar size={28} /> : <FaRegStar size={28} />}</button>
                    {word}
                </div>
                <div className='single-view-subtitle'>{definition?.phonetic}</div>
            </div>
            <div className='page-container'>
                <button className='word-page-delete-btn' onClick={() => setDeleteOpen(true)}><RiDeleteBin6Fill size={20} /></button>
                <div className='word-definitions-display-container'>
                    {definition?.meanings.map(item => {
                        return (
                            <div key={item.partOfSpeech}>
                                <div className='definition-pos-title'>{item.partOfSpeech}</div>
                                {item.synonyms.length ? <div className='definition-inner-item'>{getSynonyms(item)}</div> : null}
                                {item.antonyms.length ? <div className='definition-inner-item'>{getAntonyms(item)}</div> : null}
                                <div className='definition-inner-item'>{getDefinitions(item)}</div>
                            </div>
                        )
                    })}
                    <div className='add-more-definitions'>
                        Add definitions<button onClick={(onWordSearch)}><IoIosAddCircleOutline size={24} /></button>
                    </div>
                </div>
                <div className='context-title'><div></div>Contexts<div></div></div>
                <div className='word-contexts-container'>
                    <div className='inner-action-bar'>
                        <div className='sort-label'>
                            Sort By
                            <button className='sort-open-btn' onClick={() => setSortOpen(!sortOpen)}>
                                {!sortOpen ? <FaChevronDown /> : <FaChevronUp />}
                            </button>
                        </div>
                        {sortOpen ? <div className='sort-menu'>
                            <div className='sort-option'><FaSortAlphaDown size={16} />Title (A-Z)</div>
                            <div className='sort-option'><FaSortAlphaDownAlt size={16} />Title (Z-A)</div>
                            <div className='sort-option'><FaSortNumericDown size={16} />Date Added (Newest)</div>
                            <div className='sort-option'><FaSortNumericDownAlt size={16} />Date Added (Oldest)</div>
                        </div> : null}

                        <input className='lexicon-search' type='text' placeholder='Search' />
                    </div>
                    <EmptyState context={'contexts'} type='book' subtitle={'Search and add context'} />
                </div>
                {definitionOpen && <DefinitionBox />}
            </div>
            {deleteOpen ?
                <div className='dialogue-container' id='wordDeleteConfirm'>
                    <span>{word}</span> will be removed from your lexicon.
                    <div className='delete-actions'>
                        <button onClick={() => onDelete()}>Remove from Lexicon</button>
                        <button onClick={() => setDeleteOpen(false)}>Cancel</button>
                    </div>
                </div>
                : null}
        </>
        : <Navigate to='/' />
    )
}

export default WordPage