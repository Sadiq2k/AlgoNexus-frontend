import { UserProfileImage } from "../../user-services/models";
import { FileHandle } from "./file-handle-model";


export class Users {
  [x: string]: any;

  public id: any = '';
  public firstname: string = '';
  public lastname: string = '';
  public role?: string;
  public email: string = '';
  public enable?: boolean;
  public blocked?: boolean;
  // public userImages: FileHandle[]=[];
  // public hasPic:boolean = true;
  dateOfBirth?: string;
  education?: string;
  gender?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  profileImage?: UserProfileImage;
  work?: string;

  

}

export interface UserModel {
  list: Users[],
  userObj: Users,
  errormessage: string
}