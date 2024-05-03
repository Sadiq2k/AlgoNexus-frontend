import { User } from "./user-file-handler/user";
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '././user.action'


export interface UserState {
  userProfile: User | null;
  error: any;
}

export const initialState: UserState = {
  userProfile: null,
  error: null
};

const UserReducer = createReducer(
  initialState,
  on(UserActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    userProfile: user,
    error: null
  })),
  on(UserActions.loadUserProfileFailure, (state, { error }) => ({
    
    ...state,
    userProfile: null,
    error: error
  }))
);


export function userReducer(state:any, action: any) {
  return UserReducer(state, action);
}
