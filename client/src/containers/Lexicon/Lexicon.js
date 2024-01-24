import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    FaChevronDown, FaChevronUp, FaStar, FaSortAlphaDown, FaSortAlphaDownAlt,
    FaSortNumericDown, FaSortNumericDownAlt
} from "react-icons/fa";
import NavBar from '../../components/Nav/NavBar'
import WordContainer from '../../components/WordContainer/WordContainer';
import './Lexicon.css'

const Lexicon = () => {
    const user = useSelector(state => state.user)
    const [sortOpen, setSortOpen] = useState(false)

    return (user.name ?
        <>
            <NavBar />
            <div className='page-title'>
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
                    <div className='sort-option'><FaStar size={16} />Favorite</div>
                    <div className='sort-option'><FaSortAlphaDown size={16} />Word (A-Z)</div>
                    <div className='sort-option'><FaSortAlphaDownAlt size={16} />Word (Z-A)</div>
                    <div className='sort-option'><FaSortNumericDown size={16} />Date Added (Newest)</div>
                    <div className='sort-option'><FaSortNumericDownAlt size={16} />Date Added (Oldest)</div>
                </div> : null}

                <input className='lexicon-search' type='text' placeholder='Search' />
            </div>
            <div className='lexicon-word-display'>
                {user.words.map(word => { return <WordContainer key={word.word} word={word} /> })}
            </div>
        </> :
        <Navigate to='/' />
    )
}

export default Lexicon