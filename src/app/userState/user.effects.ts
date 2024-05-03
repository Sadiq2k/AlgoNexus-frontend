// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { UserService } from "../userService/user.service";
// import { UserControllerService } from "../user-services/services/user-controller.service";
// import { AuthenticationService } from "../services/services/authentication.service";
// import { catchError, map, of, switchMap } from "rxjs";
// import * as userActions from './user.action';
// import { Injectable } from "@angular/core";


// @Injectable()
// export class UserEffects {

//     constructor(
//         private actions$: Actions,
//         private userService: UserService,
//         private userController : UserControllerService,
//         private authService: AuthenticationService,
//       ) {}

      
//       loadUserProfile$ = createEffect(() =>
//         this.actions$.pipe(
//           ofType(userActions.loadUserProfile),
//           switchMap(() =>
//             this.userController.getLoginUser().pipe(
//               map(user => userActions.loadUserProfileSuccess({ user })),
//               catchError(error => of(userActions.loadUserProfileFailure({ error })))
//             )
//           )
//         )
//       );
      

      
      
// }