import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }
  videos:any

  public setVideo(video:any){
this.videos = video;
  }

  public getVideos(){
    return this.videos;
  }
}
