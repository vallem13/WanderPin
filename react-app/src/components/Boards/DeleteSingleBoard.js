import { useModal } from '../../context/Modal'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { deleteSingleBoardThunk } from '../../store/board';
import './Boards.css'

const DeleteSingleBoard = ({ boardId, board }) => {

    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


    const deletePin = async (e) => {
        e.preventDefault()
        await dispatch(deleteSingleBoardThunk(boardId))
        await history.push('/user')
        await closeModal()
    };

    const dontDeletePin = () => {
        closeModal()
    }

    return (
        <div>
            <h2>Delete this board?</h2>
            <h3>The board {board.title} will be removed from your profile.</h3>
            <div>
                <button onClick={deletePin}>Delete</button>
                <button onClick={dontDeletePin}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteSingleBoard
