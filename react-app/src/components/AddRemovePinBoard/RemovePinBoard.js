import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { getSingleBoardThunk , removePinBoardThunk} from "../../store/board"
import "./AddRemovePinBoard.css"

const RemovePinBoard = ({ pinId }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const board = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getSingleBoardThunk(board.id))
    }, [dispatch, board.id])

    const removePin = async (e) => {
        e.preventDefault()
        await dispatch(removePinBoardThunk(board.id, pinId))

        await history.push(`/boards/${board.id}`)
        await closeModal()
    };

    const keepPin = () => {
        closeModal()
    }

    return (
        <div className="add-pin-container">
            <h1>Remove Pin from Board?</h1>
            <div className="add-pin-button">
                <button onClick={removePin}>Remove</button>
                <button onClick={keepPin}>Cancel</button>
            </div>
        </div>
    )
}

export default RemovePinBoard
