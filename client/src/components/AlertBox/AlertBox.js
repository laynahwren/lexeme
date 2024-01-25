import { useSelector, useDispatch } from 'react-redux'
import { setAlertOpen } from '../../slices/AlertBoxSlice'
import { useNavigate } from 'react-router-dom'
import './AlertBox.css'

const AlertBox = () => {
    const alert = useSelector(state => state.alertBox)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='dialogue-container' id='alertContainer'>
            <div className='alert-box-content'>
                <span className='alert-box-subject'>{alert.subject}</span>
                <span className='alert-box-body'>{alert.body}</span>
            </div>
            <div className='alert-box-actions'>
                {alert.actions.map(item => {
                    return (
                        <button key={item.text} className='alert-action-btn' onClick={() => {
                            navigate(item.path)
                            dispatch(setAlertOpen(false))
                        }}>
                            {item.text}</button>
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