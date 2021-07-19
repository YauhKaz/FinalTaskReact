import { CHENGED_PAGINATION } from "../constants";

const initialState = {
  buttons: [
    {
      buttonName: 1,
      id: 1,
      isActiveButton: true,
      isActiveSpan: false,
    },
    {
      buttonName: 2,
      id: 2,
      isActiveButton: false,
      isActiveSpan: false,
    },
    {
      buttonName: 3,
      id: 3,
      isActiveButton: false,
      isActiveSpan: false,
    },
    {
      buttonName: 4,
      id: 4,
      isActiveButton: false,
      isActiveSpan: true,
    },
    {
      buttonName: 15,
      id: 5,
      isActiveButton: false,
      isActiveSpan: false,
    },
  ],
}

export const chengePaginationReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHENGED_PAGINATION:   
      return action.payload;
    default: return state;
  }
}