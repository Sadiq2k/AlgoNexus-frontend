import { FileHandle } from "./user-file-handler-model";

export class User {

    [x: string]: any;

    public id: any = '';
    public firstname: string = '';
    public lastname: string = '';
    public email?: string;
    public dateOfBirth?: Date;
    public gender?: string;
    public github?: string;
    public linkedin?: string;
    public work?: string;
    public eduction?: string;
    public location?: string;
    public userImageUrl?: FileHandle[];

}
