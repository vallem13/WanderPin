// Action
const CREATE_SINGLE_COMMENT = "boards/CREATE_SINGLE_COMMENT";
const DELETE_SINGLE_COMMENT = "boards/DELETE_SINGLE_COMMENT";


// Action Creator
const createSingleComment = (comment) => ({
    type: CREATE_SINGLE_COMMENT,
    comment
});

const deleteSingleComment = (commentId) => ({
    type: DELETE_SINGLE_COMMENT,
    commentId,
});



// Thunk
export const createSingleCommentThunk = (formData, pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}/comments`, {
        method: 'POST',
        body: formData
    })

    if(response.ok) {
        const comment = await response.json()
        dispatch(createSingleComment(comment))
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

export const deleteSingleCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        const comment = await response.json()
        dispatch(deleteSingleComment(commentId))
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

export const editSingleCommentThunk = (commentId, formData) => async (dispatch) => {
    const response = await fetch(`/api/comments/edit/${commentId}`, {
        method: 'PUT',
        body: formData
    });

    if(response.ok) {
        const data = await response.json()
        dispatch(createSingleComment(formData))
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
    singlePin: {},
};


// Reducer
export default function reducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case CREATE_SINGLE_COMMENT:
            newState = { ...state, singlePin: { ...state.pin } };
            newState.singlePin[action.comment.id] = action.comment;
        return newState;

        case DELETE_SINGLE_COMMENT:
            newState = { ...state, pin: { ...state.pin } };
            delete newState.pin[action.commentId];
        return newState;

        default:
            return state;
    }

}
