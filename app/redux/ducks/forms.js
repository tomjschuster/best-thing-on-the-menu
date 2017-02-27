import { actions as uxActions } from './ux'

/*----------  INITIAL STATE  ----------*/
export const initialState = {
  addReview: {
    item: { isSet: false, isNew: false, id: null, name: '' },
    stars: null,
    comment: ''
  }
}


/*----------  ACTION TYPES  ----------*/
const UPDATE_ITEM_ID = 'UPDATE_ITEM_ID'
const UPDATE_NEW_ITEM = 'UPDATE_NEW_ITEM'
const UPDATE_ITEM_NAME = 'UPDATE_ITEM_NAME'
const UPDATE_STARS = 'UPDATE_STARS'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const CLEAR_ADD_REVIEW = 'CLEAR_ADD_REVIEW'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  updateItemId: (id, name) => (
    { type: UPDATE_ITEM_ID,
      id,
      name
    }),

  updateNewItem: name => (
    { type: UPDATE_NEW_ITEM,
      name
    }),

  updateItemName: name => (
    { type: UPDATE_ITEM_NAME,
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

  clearAddReview: () => (
    { type: CLEAR_ADD_REVIEW,
    }),

  // Thunk Creators
  updateItemNewOrOld: (chosenRequest, idx) => dispatch => {
    const { updateNewItem, updateItemId } = actions
    if (idx === -1) dispatch(updateNewItem(chosenRequest))
    else dispatch(updateItemId(chosenRequest.id, chosenRequest.name))
  },

  closeAndClearAddReview: () => dispatch => {
    dispatch(uxActions.hideAddReview())
    dispatch(actions.clearAddReview())
  }
}


/*----------  REDUCER  ----------*/
const reducer =  {

  [UPDATE_ITEM_ID]: (state, { id, name }) => ({ ...state,
    addReview: { ...state.addReview,
      item: { isSet: true, isNew: false, id, name: name }
    }
  }),

  [UPDATE_NEW_ITEM]: (state, { name }) => ({ ...state,
    addReview: { ...state.addReview,
      item: { isSet: true, isNew: true, id: null, name }
    }
  }),

  [UPDATE_ITEM_NAME]: (state, { name }) => ({ ...state,
    addReview: { ...state.addReview,
      item: { isSet: false, isNew: false, id: null, name }
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
  }),

  [CLEAR_ADD_REVIEW]: (state) => ({ ...state,
    addReview: {
      item: { isSet: false, isNew: false, id: null, name: '' },
      stars: null,
      comment: ''
    }
  })

}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
