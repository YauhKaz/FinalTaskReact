import { FETCHED_FILMS, DELETE_FILMS } from "../constants";

const initialState = {
  films: [],
}


export const addFilmsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHED_FILMS:     
      return action.films;
    case DELETE_FILMS:
      return action.payload;
    default: return state;
  }
}