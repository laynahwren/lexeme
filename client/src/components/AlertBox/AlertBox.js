import { useSelector, useDispatch } from 'react-redux'
import { setAlertOpen } from '../../slices/AlertBoxSlice'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './AlertBox.css'

const AlertBox = () => {
    const alert = useSelector(state => state.alertBox)
    const dispatch = useDispatch()

    return (
        <div className='dialogue-container'>
            <div className='alert-box-content'>
                <span className='alert-box-subject'>{alert.subject}</span>
                <span className='alert-box-body'>{alert.body}</span>
            </div>
            <button className='alert-close-btn' onClick={() => dispatch(setAlertOpen(false))}>
                <AiOutlineCloseCircle size={20} />
            </button>
            <div className='alert-box-actions'>
                {alert.actions.map(item => {
                    return (
                        <button key={item.text} className='alert-action-btn'>{item.text}</button>
                    )
                })}
                <button className='alert-action-btn' onClick={() => {
                    dispatch(setAlertOpen(false))
                    return
                }}>{alert.closeText}</button>
            </div>
        </div>
    )
}

export default AlertBox