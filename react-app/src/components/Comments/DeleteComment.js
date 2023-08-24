import { useModal } from '../../context/Modal'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { deleteSingleCommentThunk } from '../../store/comment';
import { getSinglePinThunk } from '../../store/pin';
import './Comments.css'

const DeleteComment = ({ pinId, commentId }) => {

    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(deleteSingleCommentThunk(commentId))
        await dispatch(getSinglePinThunk(pinId))
        await closeModal()
    };

    const dontDeleteComment = () => {
        closeModal()
    }

    return (
        <div id='delete-pin-container'>
            <div id='delete-pin-container'>
            <h2>Are you sure?</h2>
            <h3>Once you delete a Comment, you can't undo it!</h3>
            <div className='delete-pin-buttons'>
                <button onClick={deleteComment}>Delete</button>
                <button onClick={dontDeleteComment}>Cancel</button>
            </div>
            </div>
        </div>
    )
}

export default DeleteComment
