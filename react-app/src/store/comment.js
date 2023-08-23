// // Action
// const CREATE_SINGLE_COMMENT = "boards/CREATE_SINGLE_COMMENT";
// const DELETE_SINGLE_COMMENT = "boards/DELETE_SINGLE_COMMENT";


// // Action Creator
// const createSingleComment = (comment) => ({
//     type: CREATE_SINGLE_COMMENT,
//     board
// });

// const deleteSingleComment = (commentId) => ({
//     type: DELETE_SINGLE_COMMENT,
//     boardId,
// });



// // Thunk
// export const createSingleCoomentThunk = (formData, pinId) => async (dispatch) => {
//     const response = await fetch(`/api/comments/${pinId}`, {
//         method: 'POST',
//         body: formData
//     })

//     if(response.ok) {
//         const comment = await response.json()
//         dispatch(createSingleComment(comment))
//         return response
//     } else if (response.status < 500) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// }

// // export const deleteSingleBoardThunk = (boardId) => async (dispatch) => {
// //     const response = await fetch(`/api/boards/${boardId}`, {
// //         method: 'DELETE',
// //     });

// //     if(response.ok) {
// //         const board = await response.json()
// //         dispatch(deleteSingleBoard(boardId))
// //         return response
// //     } else if (response.status < 500) {
// // 		const data = await response.json();
// // 		if (data.errors) {
// // 			return data.errors;
// // 		}
// // 	} else {
// // 		return ["An error occurred. Please try again."];
// // 	}
// // };

// // export const editSingleBoardThunk = (boardId, formData) => async (dispatch) => {
// //     const response = await fetch(`/api/boards/edit/${boardId}`, {
// //         method: 'PUT',
// //         body: formData
// //     });

// //     if(response.ok) {
// //         const data = await response.json()
// //         dispatch(createSingleBoard(formData))
// //         return response
// //     } else if (response.status < 500) {
// // 		const data = await response.json();
// // 		if (data.errors) {
// // 			return data.errors;
// // 		}
// // 	} else {
// // 		return ["An error occurred. Please try again."];
// // 	}
// // }

// // Initial State
// const initialState = {
//     pin: {},
// };


// // Reducer
// export default function reducer(state = initialState, action) {

//     let newState;

//     switch (action.type) {

//         case CREATE_SINGLE_COMMENT:
//             newState = { ...state, pin: { ...state.pin } };
//             newState.pin[action.comment.id] = action.comment;
//         return newState;

//         case DELETE_SINGLE_COMMENT:
//             newState = { ...state, pin: { ...state.pin } };
//             delete newState.pin[action.commentId];
//         return newState;

//         default:
//             return state;
//     }

// }
