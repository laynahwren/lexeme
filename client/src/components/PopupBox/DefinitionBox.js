import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { BsArrowRightCircle } from "react-icons/bs"
import { useSelector, useDispatch } from 'react-redux'
import { setDefinition, setDefinitionOpen } from '../../slices/DefinitionSlice'
import { updateLexicon } from '../../utils/userAccount'
import { setUser } from '../../slices/UserSlice'
import { setAlert, setAlertOpen } from '../../slices/AlertBoxSlice'
import './PopupBox.css'

const DefinitionBox = () => {
    const definition = useSelector(state => state.definition)
    const user = useSelector(state => state.user)
    const existing = user.words.find(item => item.word === definition.definition.word)
    const [chosenDefinitions, setChosenDefinitions] = useState(existing ? [...existing.meanings] : [])
    const [favorited, setFavorited] = useState(existing ? existing.favorite : false)
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(setDefinition({}))
        dispatch(setDefinitionOpen(false))
    }

    const setLexicon = async () => {
        // Need delete confirmation
        // if (!chosenDefinitions.length) {
        //     dispatch(setAlert({
        //         subject: definition.definition.word,
        //         body: ' has no selected defintions and will be removed from your lexicon.',
        //         closeText: 'Cancel',
        //         actions: [
        //             {
        //                 text: 'Remove from Lexicon'
        //             }
        //         ]
        //     }))
        //     dispatch(setAlertOpen(true))
        // }

        let res = await updateLexicon(
            {
                word: definition.definition.word,
                phonetic: definition.definition.phonetic,
                favorite: favorited,
                meanings: chosenDefinitions,
                contexts: {}
            })

        if (existing && chosenDefinitions.length) {
            dispatch(setAlert({
                subject: definition.definition.word,
                body: ' has been updated in your lexicon!',
                closeText: 'Close',
                actions: [
                    {
                        text: 'View in Lexicon',
                    }
                ]
            }))
        } else if (!chosenDefinitions.length) {
            dispatch(setAlert({
                subject: definition.definition.word,
                body: ' has been removed your lexicon.',
                closeText: 'Close',
                actions: [
                    {
                        text: 'View Lexicon',
                    }
                ]
            }))
        } else {
            dispatch(setAlert({
                subject: definition.definition.word,
                body: ' has been added to your lexicon!',
                closeText: 'Close',
                actions: [
                    {
                        text: 'View in Lexicon',
                    }
                ]
            }))
        }

        dispatch(setAlertOpen(true))
        dispatch(setUser({ ...user, words: res.value.words }))

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
                    <div className='items-title'>Defintions</div>
                    {def.definitions.map((item, index) => {
                        let existingPos = existing?.meanings.find(el => el.partOfSpeech === def.partOfSpeech)
                        let existingDef = !!existingPos?.definitions.includes(item.definition)
                        return (
                            <div className='definition-selection'>
                                <input type='checkbox' id={`${def.partOfSpeech}-${index}`}
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
        <div className='dialogue-container'>
            <div className='popup-box-title'>
                {definition.definition.word}{definition.definition.phonetic ? <span>{definition.definition.phonetic}</span> : null}
                <button className='favorite-btn-popup' onClick={() => setFavorited(!favorited)}>
                    {favorited ? <FaStar size={20} /> : <FaRegStar size={20} />}
                </button>
                {existing ? <button className='existing-word-popup-btn'>
                    View in Lexicon{<BsArrowRightCircle size={16} />}
                </button> : null}
            </div>
            <button className='close-btn' onClick={onClose}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <div className='items-container'>
                {definition.definition.meanings.map((def) => { return getDefinitions(def) })}
            </div>
            {chosenDefinitions.length || existing ?
                <div className='add-item-container'>
                    <button id='addToReadBtn' disabled={true}>Add to Current Read</button>
                    <button id='setLexiconBtn' onClick={setLexicon}>{existing ? 'Update Lexicon' : 'Add to Lexicon'}</button>
                </div> : null
            }
        </div>
    )
}

export default DefinitionBox