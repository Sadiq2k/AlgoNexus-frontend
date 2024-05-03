// admin.actions.ts

import { createAction, props } from '@ngrx/store';
import { Users } from './file-handler/users';

export const loadUsers = createAction('[Admin] Load Users');
export const loadUsersSuccess = createAction('[Admin] Load Users Success', props<{ users: Users[] }>());
export const loadUsersFail = createAction('[Admin] Load Users Fail', props<{ errormessage: string }>());
export const updateUser = createAction('[Admin] Update User', props<{ user: Users }>());
export const updateUserSuccess = createAction('[Admin] Update User Success', props<{ user: any }>());
export const updateUserFailure = createAction('[Admin] Update User Failure', props<{ error: any }>());
export const blockUser = createAction('[Admin] Block User', props<{ userId: any }>());
export const blockUserSuccess = createAction('[Admin] Block User Success', props<{ userId: string }>());
export const blockUserFailure = createAction('[Admin] Block User Fail', props<{ error: string }>());
