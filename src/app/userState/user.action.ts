import { createAction, props } from '@ngrx/store';
import { User } from './user-file-handler/user';

export const loadUserProfile = createAction('[User] Load User Profile',props<{email:string}>());
export const loadUserProfileSuccess = createAction('[User] Load User Profile Success', props<{ user: User }>());
export const loadUserProfileFailure = createAction('[User] Load User Profile Failure', props<{ error: any }>());
export const updateUserProfile = createAction('[User] Update User Profile',props<{ user: User }>());
export const updateUserProfileSuccess = createAction('[User] Update User Profile Success',props<{ userProfile: User }>());
export const updateUserProfileFailure = createAction('[User] Update User Profile Failure',props<{ error: any }>());


