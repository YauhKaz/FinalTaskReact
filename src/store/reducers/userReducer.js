import { ADD_USER, CHANGE_USER, READ_USER } from "../constants";

const initialState = {
  users: [
    {
      id: 0,
      name: 'admin',
      mail: 'admin@admin',
      password: 'admin',
      isAuth: false,
    },
    {
      id: 1,
      name: 'ivan',
      mail: 'ivan@ivan',
      password: '123',
      isAuth: false,
    },
  ],
}

const addUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      console.log('ADD_USER config');
      return {
        ...state, users: [...state.users, action.payload],
      };
    case READ_USER:
      return state.users;
    case CHANGE_USER:
      return action.payload;
    default: return state;
  }
}

export default addUserReducer;

