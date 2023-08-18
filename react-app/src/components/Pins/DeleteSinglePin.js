import { useModal } from '../../context/Modal'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { deleteSinglePinThunk } from '../../store/pin';
import './Pins.css'

const DeleteSinglePin = ({ pinId }) => {

    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


    const deletePin = async (e) => {
        e.preventDefault()
        await dispatch(deleteSinglePinThunk(pinId))
        await history.push('/user')
        await closeModal()
    };

    const dontDeletePin = () => {
        closeModal()
    }

    return (
        <div id='delete-pin-container'>
            <div id='delete-pin-container'>
            <h2>Are you sure?</h2>
            <h3>Once you delete a Pin, you can't undo it!</h3>
            <div className='delete-pin-buttons'>
                <button onClick={deletePin}>Delete</button>
                <button onClick={dontDeletePin}>Cancel</button>
            </div>
            </div>
        </div>
    )
}

export default DeleteSinglePin
