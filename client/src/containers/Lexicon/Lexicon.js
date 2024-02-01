import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    FaChevronDown, FaChevronUp, FaStar, FaSortAlphaDown, FaSortAlphaDownAlt,
    FaSortNumericDown, FaSortNumericDownAlt, FaCheck
} from "react-icons/fa";
import NavBar from '../../components/Nav/NavBar'
import WordContainer from '../../components/WordContainer/WordContainer';
import { sortCollection, search } from '../../utils/sortSearch';
import { setUser } from '../../slices/UserSlice';
import { setInWord } from '../../slices/DefinitionSlice';
import EmptyState from '../../components/EmptyState/EmptyState';
import DefinitionBox from '../../components/PopupBox/DefinitionBox';
import './Lexicon.css'

const Lexicon = () => {
    const user = useSelector(state => state.user)
    const { definitionOpen } = useSelector(state => state.definition)
    const [sortOpen, setSortOpen] = useState(false)
    const [sorted, setSorted] = useState([...user.words])
    const [selected, setSelected] = useState(user.wordSort.opt)
    const [searchTerm, setSearchTerm] = useState('')
    const [searched, setSearched] = useState([...user.words])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setInWord(false))
    })

    useEffect(() => {
        if (searched.length === 0) {
            setSearched(user.words)
            setSearchTerm('')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.words])

    const onSelect = (opt, sortBy, sortDirection) => {
        setSelected(opt)

        let res = sortCollection([...user.words], sortBy, sortDirection)

        setSorted(res)
        onSearch(res, searchTerm)
        setSortOpen(false)
        dispatch(setUser({
            ...user,
            words: res,
            wordSort: {
                opt: opt,
                sortBy: sortBy,
                sortDirection: sortDirection
            }
        }))
    }

    const onSearch = (res, term) => {
        if (term === '') {
            setSearched(sorted)
        }
        setSearched(search([...res], 'word', term))
    }

    return (user.name ?
        <>
            <NavBar />
            <div className='page-title inner-page-title'>
                {user.name}'s<span> Lexicon</span>
                <div className='lexicon-word-count'><span>{user.words.length}</span> word{user.words.length > 1 || user.words.length === 0 ? 's' : null}</div>
            </div>
            <div className='lexicon-action-bar'>
                <div className='sort-label'>
                    Sort By
                    <button className='sort-open-btn' onClick={() => setSortOpen(!sortOpen)}>
                        {!sortOpen ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                </div>
                {sortOpen ? <div className='sort-menu'>
                    <div className='sort-option' onClick={() => onSelect('fav', 'favorite', 'desc')}>
                        <FaStar size={16} />Favorite
                        {selected === 'fav' ? <div className='selected-svg'><FaCheck size={12} /></div> : null}
                    </div>
                    <div className='sort-option' onClick={() => onSelect('a-z', 'word', 'asc')}>
                        <FaSortAlphaDown size={16} />Word (A-Z)
                        {selected === 'a-z' ? <div className='selected-svg'><FaCheck size={12} /></div> : null}
                    </div>
                    <div className='sort-option' onClick={() => onSelect('z-a', 'word', 'desc')}>
                        <FaSortAlphaDownAlt size={16} />Word (Z-A)
                        {selected === 'z-a' ? <div className='selected-svg'><FaCheck size={12} /></div> : null}
                    </div>
                    <div className='sort-option' onClick={() => onSelect('new', 'date', 'desc')}>
                        <FaSortNumericDown size={16} />Date Added (Newest)
                        {selected === 'new' ? <div className='selected-svg'><FaCheck size={12} /></div> : null}
                    </div>
                    <div className='sort-option' onClick={() => onSelect('old', 'date', 'asc')}>
                        <FaSortNumericDownAlt size={16} />Date Added (Oldest)
                        {selected === 'old' ? <div className='selected-svg'><FaCheck size={12} /></div> : null}
                    </div>
                </div> : null}

                <input className='lexicon-search' type='text' placeholder='Search' value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value)
                    onSearch(sorted, e.target.value)
                }} />
            </div>
            <div className='page-container'>
                {searched.length !== 0 ?
                    <div className='lexicon-word-display'>
                        {searched.map(word => { return <WordContainer key={word.word} word={word} /> })}
                    </div> :
                    <EmptyState context={user.words.length === 0 ? 'words' : searchTerm}
                        subtitle={'Search and add word'}
                        type='word'
                        searchWord={user.words.length !== 0 ? true : false}
                    />
                }
            </div>
            {definitionOpen && <DefinitionBox />}
        </> :
        <Navigate to='/' />
    )
}

export default Lexicon