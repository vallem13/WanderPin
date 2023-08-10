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
        await history.push('/home')
        await closeModal()
    };

    const dontDeletePin = () => {
        closeModal()
    }

    return (
        <div>
            <h3>Confirm Delete</h3>
            <h2>Are you sure you want to delete this Pin?</h2>
            <div>
                <button onClick={deletePin}>Yes (Delete Pin)</button>
                <button onClick={dontDeletePin}>No (Keep Pin)</button>
            </div>
        </div>
    )
}

export default DeleteSinglePin
