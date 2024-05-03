import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

const selectUserState  = createFeatureSelector<UserState>('user');

export const getusers = createSelector( selectUserState ,(state: UserState) => state.userProfile);