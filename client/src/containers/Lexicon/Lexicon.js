import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    FaChevronDown, FaChevronUp, FaStar, FaSortAlphaDown, FaSortAlphaDownAlt,
    FaSortNumericDown, FaSortNumericDownAlt, FaCheck
} from "react-icons/fa";
import NavBar from '../../components/Nav/NavBar'
import WordContainer from '../../components/WordContainer/WordContainer';
import { sortAsc, sortDesc, search } from '../../utils/sortSearch';
import './Lexicon.css'

const Lexicon = () => {
    const user = useSelector(state => state.user)
    const [sortOpen, setSortOpen] = useState(false)
    // Need to save sorted in store
    const [sorted, setSorted] = useState([...user.words].reverse())
    const [selected, setSelected] = useState('new')
    const [searchTerm, setSearchTerm] = useState('')
    const [searched, setSearched] = useState([...user.words].reverse())

    const onSelect = (opt, sortBy, sortDirection) => {
        setSelected(opt)
        let res
        if (sortDirection === 'asc') {
            res = sortAsc([...user.words], sortBy)
        } else {
            res = sortDesc([...user.words], sortBy)
        }
        setSorted(res)
        onSearch(res, searchTerm)
        setSortOpen(false)
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

                <input className='lexicon-search' type='text' placeholder='Search' onChange={(e) => {
                    setSearchTerm(e.target.value)
                    onSearch(sorted, e.target.value)
                }} />
            </div>
            <div className='page-container'>
                <div className='lexicon-word-display'>
                    {searched.map(word => { return <WordContainer key={word.word} word={word} /> })}
                </div>
            </div>
        </> :
        <Navigate to='/' />
    )
}

export default Lexicon