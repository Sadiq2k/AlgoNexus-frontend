import { createReducer, on } from "@ngrx/store";
import * as adminActions from './admin.action';
import { User } from "../user-services/models";
import { Users } from "./file-handler/users";

export interface AdminState {
  [x: string]: any;
  users: Users[];
}

export const initialState: AdminState = {
  users: [],
};

const AdminReducer = createReducer(initialState,
  on(adminActions.loadUsersSuccess, (state, { users }) => {
    // console.log('State before update:', state);
    // console.log('Action payload:', users);
    return {
      ...state,
      users: [...users],
    };
  }),
  // on(adminActions.updateUserSuccess, (state, { user }) => {
  //     const index = state.users.findIndex(u => u.id === user.id);
  //     if (index !== -1) {
  //       const updatedUsers = [...state.users];
  //       updatedUsers[index] = user;
  
  //       return {
  //         ...state,
  //         users: updatedUsers
  //       };
  //     }
  
  //     return state;
  //   }),
  
    on(adminActions.blockUserSuccess, (state, { userId }) => {
      return {
        ...state,
        users: state.users.filter(user => user.id !== userId),
      };
    })
);



export function adminReducer(state: any, action:any) {
  return AdminReducer(state, action);
}
