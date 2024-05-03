import { SafeUrl } from "@angular/platform-browser";

export interface FileHandle{
    // userImage:File
    file: File,
    imageUrl: SafeUrl
    picByte: string;
    type:string;
    
  }