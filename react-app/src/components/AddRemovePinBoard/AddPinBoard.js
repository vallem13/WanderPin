import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { addPinBoardThunk, getAllBoardsThunk } from "../../store/board";
import './AddRemovePinBoard.css'

const AddPinBoard = ({ pin_id }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const boardsObj = useSelector(state => state.boards.allBoards)
    const user = useSelector(state => state.session.user)
    const boards = Object.values(boardsObj)
    const user_boards = boards.filter(boards => boards.user_id === user.id)
    const [board_id, setBoardId] = useState('')
    const [errors, setErrors] = useState([])


    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append("pin_id", pin_id);
        formData.append("board_id", board_id);

        try {
            const addPin = await dispatch(addPinBoardThunk(formData));
            if (addPin && addPin.errors) {
                setErrors(addPin.errors);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }

        await history.push(`/boards/${board_id}`)
        await closeModal();
    };

    const selectBoard = (board) => {
        setBoardId(board.id)
    };


    return (
        <div>
            <h2>Choose a Board to add the Pin</h2>
            <div>
                {user_boards.map((board) => (
                    <div
                        className={`board-names ${board.id === board_id ? "active" : ""}`}
                        onClick={() => selectBoard(board)}
                        key={board.id}
                    >
                    <img src={board.pinImgs[0] ? board.pinImgs[0] : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt={board.title} style={{ width: '100px', height: '100px' }} />
                    {board.title}
                </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Add Pin</button>
        </div>
    )
}

export default AddPinBoard
