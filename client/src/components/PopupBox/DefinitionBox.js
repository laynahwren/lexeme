import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { setDefinition, setDefinitionOpen } from '../../slices/DefinitionSlice'
import './PopupBox.css'

const DefinitionBox = () => {
    const definition = useSelector(state => state.definition)
    const [chosenDefinition, setChosenDefinition] = useState({})
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(setDefinition({}))
        dispatch(setDefinitionOpen(false))
    }

    const onCheck = (e, item, pos) => {
        // Defintion needs reformatting before it can be saved to user
        if (e.target.checked) {
            setChosenDefinition({
                word: definition.definition.word,
                partOfSpeech: pos,
                definition: item.definition
            })
        } else {
            setChosenDefinition({})
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
                                    disabled={chosenDefinition.word && chosenDefinition.definition !== item.definition}
                                    onChange={(e) => onCheck(e, item, def.partOfSpeech)} />
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
            {chosenDefinition.word &&
                <div className='add-item-container'>
                    <button id='addToReadBtn'>Add to Current Read</button>
                    <button id='addToLexiconBtn'>Add to Lexicon</button>
                </div>
            }
        </div>
    )
}

export default DefinitionBox