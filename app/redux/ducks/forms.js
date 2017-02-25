/*----------  INITIAL STATE  ----------*/
export const initialState = {
  addReview: {
    item: { isNew: false, id: null, name: null },
    stars: null,
    comment: ''
  }
}


/*----------  ACTION TYPES  ----------*/
const UPDATE_ITEM_ID = 'UPDATE_ITEM_ID'
const UPDATE_NEW_ITEM = 'UPDATE_NEW_ITEM'
const UPDATE_STARS = 'UPDATE_STARS'
const UPDATE_COMMENT = 'UPDATE_COMMENT'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  updateItemId: id => (
    { type: UPDATE_ITEM_ID,
      id
    }),

  updateNewItem: name => (
    { type: UPDATE_NEW_ITEM,
      name
    }),

  updateStars: stars => (
    { type: UPDATE_STARS,
      stars
    }),

  updateComment: comment => (
    { type: UPDATE_COMMENT,
      comment
    }),

  // Thunk Creators
  updateItemNewOrOld: (chosenRequest, idx) => dispatch => {
    const { updateNewItem, updateItemId } = actions
    if (idx === -1) dispatch(updateNewItem(chosenRequest))
    else dispatch(updateItemId(chosenRequest.id))
  }
}


/*----------  REDUCER  ----------*/
const reducer =  {

  [UPDATE_ITEM_ID]: (state, { id }) => ({ ...state,
    addReview: { ...state.addReview,
      item: { isNew: false, id, name: null }
    }
  }),

  [UPDATE_NEW_ITEM]: (state, { name }) => ({ ...state,
    addReview: { ...state.addReview,
      item: { isNew: true, id: null, name }
    }
  }),

  [UPDATE_STARS]: (state, { stars }) => ({ ...state,
    addReview: { ...state.addReview,
      stars
    }
  }),

  [UPDATE_COMMENT]: (state, { comment }) => ({ ...state,
    addReview: { ...state.addReview,
      comment
    }
  })

}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
