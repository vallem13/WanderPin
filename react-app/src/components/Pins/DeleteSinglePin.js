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
        <div>
            <h2>Are you sure?</h2>
            <h3>Once you delete a Pin, you can't undo it!</h3>
            <div>
                <button onClick={deletePin}>Delete</button>
                <button onClick={dontDeletePin}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteSinglePin
