// admin.effects.ts

import { Injectable } from '@angular/core';
import {  Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as adminActions from './admin.action';
import { loadUsersSuccess ,updateUserSuccess ,updateUserFailure } from './admin.action';
import { UserService } from '../userService/user.service';
import { UserControllerService } from '../user-services/services';
import { User, UserResponse } from '../user-services/models';
import { Users } from './file-handler/users';
import { AuthenticationService } from '../services/services';


@Injectable()
export class AdminEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userController : UserControllerService,
    private authService: AuthenticationService,
  ) {}

loadUsers$ = createEffect(() =>
    this.actions$.pipe(
        ofType(adminActions.loadUsers),
        exhaustMap((action) =>
            this.userController.getAllUser().pipe(
                map((data: UserResponse[]) => {
                    const users: Users[] = data.map((user: UserResponse) => ({
                        id: user.id,
                        firstname: user.firstname ?? '', 
                        lastname: user.lastname ?? '', 
                        role: user.role, 
                        email: user.email ?? '',
                        enable: false ,
                        blocked: user.block
                    }));
                    return adminActions.loadUsersSuccess({ users });
                }),
                catchError((error) =>
                    of(adminActions.loadUsersFail({ errormessage: error.message }))
                )
            )
        )
    )
);

updateUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(adminActions.updateUser),
    exhaustMap((action) => {
      return this.userController.updateUser({body:action.user}).pipe(
        map((updatedUser) => adminActions.updateUserSuccess({ user: updatedUser })),
        catchError((error) => of(adminActions.updateUserFailure({ error })))
      );
    })
  );
});

blockUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(adminActions.blockUser),
    exhaustMap(action =>
      this.authService.blockUser(action.userId).pipe(
        map(() => adminActions.blockUserSuccess({ userId: action.userId })),
        catchError(error => of(adminActions.blockUserFailure({ error: error.message })))
      )
    )
  )
);
 
}


