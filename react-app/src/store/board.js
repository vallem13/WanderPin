// Action
const GET_ALL_BOARDS = "baords/GET_ALL_BOARDS";
const GET_SINGLE_BOARD = "boards/GET_SINGLE_BOARD";
const CREATE_SINGLE_BOARD = "boards/CREATE_SINGLE_BOARD";
const DELETE_SINGLE_BOARD = "boards/DELETE_SINGLE_BOARD";


// Action Creator
const getAllBoards = (boards) => ({
    type: GET_ALL_BOARDS,
    boards
});

const getSingleBoard = (boardId) => ({
    type: GET_SINGLE_BOARD,
    boardId
});

const createSingleBoard = (board) => ({
    type: CREATE_SINGLE_BOARD,
    board
});

const deleteSingleBoard = (boardId) => ({
    type: DELETE_SINGLE_BOARD,
    boardId,
});



// Thunk
export const getAllBoardsThunk = () => async (dispatch) => {
    const response = await fetch('/api/boards');

    if (response.ok) {
        const boards = await response.json();
        dispatch(getAllBoards(boards));
        return response;
    } else {
        const errors = await response.json();
        return errors
    }
}

export const getSingleBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`)

    if (response.ok) {
        const board = await response.json()
        dispatch(getSingleBoard(board))
        return response
    } else {
        const errors = await response.json();
        return errors
    }
}

export const createSingleBoardThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/boards/new-board', {
        method: 'POST',
        body: formData
    })

    if(response.ok) {
        const board = await response.json()
        dispatch(createSingleBoard(board))
        return response
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const deleteSingleBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        const board = await response.json()
        dispatch(deleteSingleBoard(boardId))
        return response
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editSingleBoardThunk = (boardId, formData) => async (dispatch) => {
    const response = await fetch(`/api/boards/edit/${boardId}`, {
        method: 'PUT',
        body: formData
    });

    if(response.ok) {
        const data = await response.json()
        dispatch(createSingleBoard(formData))
        return response
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}


// Initial State
const initialState = {
    allBoards: {},
    singleBoard: {},
};


// Reducer
export default function reducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case GET_ALL_BOARDS:
            newState = { ...state, allBoards: {}, singleBoard: {} };
            action.boards.forEach((board) => {
                newState.allBoards[board.id] = board;
            });
        return newState

        case GET_SINGLE_BOARD:
            newState = { ...state, allBoards: {}, singleBoard: {} };
            newState.singleBoard = action.boardId
        return newState

        case CREATE_SINGLE_BOARD:
            newState = { ...state, allBoards: { ...state.allBoards}, singleBoard: { ...action.board} }
        return newState

        case DELETE_SINGLE_BOARD:
            newState = { ...state, allBoards: { ...state.allBoards}, singleBoard: {}}
            delete newState.allBoards[action.boardId]
        return newState

        default:
            return state;
    }

}
