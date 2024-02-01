import { useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { BsSearch } from 'react-icons/bs'
import { setDefinitionOpen } from '../../slices/DefinitionSlice'
import { fetchWord } from '../../utils/fetcher'
import { useDispatch } from 'react-redux'
import { setAlert, setAlertOpen } from '../../slices/AlertBoxSlice'
import { setDefinition } from '../../slices/DefinitionSlice'
import './EmptyState.css'

const EmptyState = (props) => {
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(props.searchWord || props.searchBook ? props.context : '')
    const dispatch = useDispatch()

    const onWordSearch = async () => {
        let search = props.searchWord || props.searchBook ? props.context : searchTerm
        const def = await fetchWord(search)
        if (def.message) {
            dispatch(setAlert({
                subject: search,
                body: ' not found in dictionary.',
                closeText: 'Cancel',
                actions: [
                    {
                        text: 'Enter manually'
                    }
                ]
            }))
            dispatch(setAlertOpen(true))
        } else {
            dispatch(setDefinition(def[0]))
            dispatch(setDefinitionOpen(true))
        }
        setSearchTerm('')
    }

    const onBookSearch = () => {
        return
    }

    return (
        <div className='empty-state-container'>
            <div className='empty-state-title'>No <span>{props.context}</span> here...</div>
            {!searchOpen ? <button onClick={() => {
                if (props.searchWord) {
                    onWordSearch()
                } else if (props.searchBook) {
                    // fetch book
                } else {
                    setSearchOpen(true)
                }
            }}><IoIosAddCircleOutline size={44} /></button> :
                <div className='empty-state-search-container'>
                    <div className='empty-state-search'>
                        <input type='text'
                            placeholder={props.type === 'word' ? 'Search for a word' : 'Enter book title'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <button onClick={() => {
                            if (props.type === 'word') {
                                onWordSearch()
                            } else {
                                onBookSearch()
                            }
                        }}><BsSearch size={20} /></button>
                    </div>
                    {props.type === 'word' ?
                        <div className='empty-state-book-term'>Book term? <button>Enter definition manually</button></div> : null}
                </div>
            }
            <div className='empty-state-subtitle'>{props.subtitle}</div>
        </div>
    )
}

export default EmptyState