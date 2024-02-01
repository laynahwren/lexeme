import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { setDefinition, setDefinitionOpen } from '../../slices/DefinitionSlice'
import { updateLexicon } from '../../utils/userAccount'
import { setUser } from '../../slices/UserSlice'
import { setAlert, setAlertOpen } from '../../slices/AlertBoxSlice'
import { useNavigate } from 'react-router-dom'
import { sortCollection } from '../../utils/sortSearch'
import './PopupBox.css'

const DefinitionBox = () => {
    const definition = useSelector(state => state.definition)
    const user = useSelector(state => state.user)
    const existing = user.words.find(item => item.word === definition.definition.word)
    const [chosenDefinitions, setChosenDefinitions] = useState(existing ? [...existing.meanings] : [])
    const [favorited, setFavorited] = useState(existing ? existing.favorite : false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteText, setDeleteText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClose = () => {
        dispatch(setDefinition({}))
        dispatch(setDefinitionOpen(false))
    }

    const setLexicon = async (action) => {
        let res = await updateLexicon(
            {
                word: definition.definition.word,
                phonetic: definition.definition.phonetic,
                favorite: favorited,
                meanings: action === 'delete' ? [] : chosenDefinitions,
                contexts: {},
                date: existing ? existing.date : null
            })

        if (action === 'delete') {
            dispatch(setAlert({
                subject: definition.definition.word,
                body: ' has been removed your lexicon.',
                closeText: 'Close',
                actions: !definition.inWord ? [
                    {
                        text: 'View Lexicon',
                        path: '/lexicon'
                    }
                ] : null
            }))
        } else if (existing) {
            dispatch(setAlert({
                subject: definition.definition.word,
                body: ' has been updated in your lexicon!',
                closeText: 'Close',
                actions: !definition.inWord ? [
                    {
                        text: 'View in Lexicon',
                        path: `/lexicon/${definition.definition.word}`
                    }
                ] : null
            }))
        } else {
            dispatch(setAlert({
                subject: definition.definition.word,
                body: ' has been added to your lexicon!',
                closeText: 'Close',
                actions: [
                    {
                        text: 'View in Lexicon',
                        path: `/lexicon/${definition.definition.word}`
                    }
                ]
            }))
        }

        let sortedRes = sortCollection(res.value.words, user.wordSort.sortBy, user.wordSort.sortDirection)

        dispatch(setAlertOpen(true))
        dispatch(setUser({ ...user, words: sortedRes }))

        if (definition.inWord && action === 'delete') {
            navigate('/lexicon')
        }

        onClose()
    }

    const onCheck = (e, item, def) => {
        if (e.target.checked) {
            addDefinition(item, def)
        } else {
            deleteDefinition(item, def)
        }
    }

    const addDefinition = (item, def) => {
        let currPos = chosenDefinitions.findIndex((el) => el.partOfSpeech === def.partOfSpeech)
        if (currPos !== -1) {
            let newDefs = {
                ...chosenDefinitions[currPos],
                definitions: [...chosenDefinitions[currPos].definitions, item.definition]
            }
            setChosenDefinitions(chosenDefinitions.toSpliced(currPos, 1, newDefs))
        } else {
            setChosenDefinitions([...chosenDefinitions,
            {
                partOfSpeech: def.partOfSpeech,
                definitions: [item.definition],
                synonyms: def.synonyms,
                antonyms: def.antonyms
            }])
        }
    }

    const deleteDefinition = (item, def) => {
        let currPos = chosenDefinitions.findIndex((el) => el.partOfSpeech === def.partOfSpeech)
        if (chosenDefinitions[currPos].definitions.length > 1) {
            let currDef = chosenDefinitions[currPos].definitions.findIndex(el => el === item.definition)
            let newDefs = {
                ...chosenDefinitions[currPos],
                definitions: [...chosenDefinitions[currPos].definitions.toSpliced(currDef, 1)]
            }
            setChosenDefinitions(chosenDefinitions.toSpliced(currPos, 1, newDefs))
        } else {
            setChosenDefinitions(chosenDefinitions.toSpliced(currPos, 1))
        }
    }

    const getDefinitions = (def) => {
        return (
            <fieldset className='definition-options'>
                <legend className='part-of-speech-title'>{def.partOfSpeech}</legend>
                {def.synonyms.length ?
                    <section className='item-info-section'>
                        <div className='items-title'>Synonyms</div>
                        <>{def.synonyms.join(', ')}</>
                    </section> : null
                }
                {def.antonyms.length ?
                    <section className='item-info-section'>
                        <div className='items-title'>Antonyms</div>
                        <>{def.antonyms.join(', ')}</>
                    </section> : null
                }
                <section className='definition-section'>
                    <div className='items-title'>definitions</div>
                    {def.definitions.map((item, index) => {
                        let existingPos = existing?.meanings.find(el => el.partOfSpeech === def.partOfSpeech)
                        let existingDef = !!existingPos?.definitions.includes(item.definition)
                        return (
                            <div key={`${def.partOfSpeech}-${index}`} className='definition-selection'>
                                <input type='checkbox' id={`${def.partOfSpeech}-${index}`} disabled={deleteOpen}
                                    onChange={(e) => onCheck(e, item, def)} defaultChecked={existingDef} />
                                <label htmlFor={`${def.partOfSpeech}-${index}`}>{item.definition}</label>
                            </div>
                        )
                    })}
                </section>
            </fieldset>
        )
    }

    return (
        <>
            <div className='dialogue-container'>
                <div className='popup-box-title'>
                    {definition.definition.word}{definition.definition.phonetic ? <span>{definition.definition.phonetic}</span> : null}
                    <button disabled={deleteOpen} className='favorite-btn-popup' onClick={() => setFavorited(!favorited)}>
                        {favorited ? <FaStar size={20} /> : <FaRegStar size={20} />}
                    </button>
                    {existing && !definition.inWord ? <button disabled={deleteOpen} className='existing-word-popup-btn'
                        onClick={() => {
                            navigate(`/lexicon/${definition.definition.word}`)
                            onClose()
                        }}>
                        View in Lexicon{<BsArrowRightCircle size={16} />}
                    </button> : null}
                </div>
                <button className='close-btn' disabled={deleteOpen}
                    onClick={onClose}>
                    <AiOutlineCloseCircle size={20} />
                </button>
                <div className='items-container'>
                    {definition.definition.meanings.map((def) => { return getDefinitions(def) })}
                </div>
                {chosenDefinitions.length || existing ?
                    <div className='add-item-container'>
                        {existing ? <button disabled={deleteOpen}
                            onClick={() => {
                                setDeleteText(' will be removed from your lexicon.')
                                setDeleteOpen(true)
                            }}>Remove from Lexicon</button> : null}
                        <button disabled={deleteOpen}>Add to Current Read</button>
                        <button disabled={deleteOpen}
                            onClick={() => {
                                if (!chosenDefinitions.length) {
                                    setDeleteText(' has no selected definitions and will be removed from your lexicon.')
                                    setDeleteOpen(true)
                                } else {
                                    setLexicon()
                                }
                            }}>{existing ? 'Update Lexicon' : 'Add to Lexicon'}</button>
                    </div> : null
                }
            </div>
            {deleteOpen ?
                <div className='dialogue-container' id='deleteConfirmation'>
                    <span>{definition.definition.word}</span>{deleteText}
                    <div className='delete-actions'>
                        <button onClick={() => setLexicon('delete')}>Remove from Lexicon</button>
                        <button onClick={() => setDeleteOpen(false)}>Cancel</button>
                    </div>
                </div>
                : null}
        </>
    )
}

export default DefinitionBox