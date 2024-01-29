import { IoIosAddCircleOutline } from 'react-icons/io'
import './EmptyState.css'

const EmptyState = (props) => {
    return (
        <div className='empty-state-container'>
            <div className='empty-state-title'>No <span>{props.context}</span> here...</div>
            <button><IoIosAddCircleOutline size={40} /></button>
            <div className='empty-state-subtitle'>{props.subtitle}</div>
        </div>
    )
}

export default EmptyState