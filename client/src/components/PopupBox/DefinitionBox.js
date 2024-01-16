import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { setDefinition, setDefinitionOpen } from '../../slices/DefinitionSlice'
import { updateLexicon } from '../../utils/userAccount'
import { setUser } from '../../slices/UserSlice'
import './PopupBox.css'

const DefinitionBox = () => {
    const definition = useSelector(state => state.definition)
    const user = useSelector(state => state.user)
    const [chosenDefinitions, setChosenDefinitions] = useState([])
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(setDefinition({}))
        dispatch(setDefinitionOpen(false))
    }

    const addToLexicon = async () => {
        let res = await updateLexicon(
            {
                word: definition.definition.word,
                meanings: chosenDefinitions,
                contexts: {}
            })

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
                        return (
                            <div className='definition-selection'>
                                <input type='checkbox' id={`${def.partOfSpeech}-${index}`}
                                    onChange={(e) => onCheck(e, item, def)} />
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
                {definition.definition.word}
            </div>
            <button className='close-btn' onClick={onClose}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <div className='items-container'>
                {definition.definition.meanings.map((def) => { return getDefinitions(def) })}
            </div>
            {chosenDefinitions.length ?
                <div className='add-item-container'>
                    <button id='addToReadBtn' disabled={true}>Add to Current Read</button>
                    <button id='addToLexiconBtn' onClick={addToLexicon}>Add to Lexicon</button>
                </div> : null
            }
        </div>
    )
}

export default DefinitionBox