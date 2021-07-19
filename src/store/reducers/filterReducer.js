import { CHENGED_FILTER } from "../constants";

const initialState = {
  filter: 'popularity.desc',
}

export const chengeFilterReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHENGED_FILTER:
      console.log('CHENGED_FILTER');
      return action.payload;
    default: return state;
  }
}