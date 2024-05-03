import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {

  isActive: string | null = null;

  public setIsActivete(buttonName: string | null){
    this.isActive = buttonName;
  }
  public getIsActive(){
    return this.isActive;
  }

  constructor() { }
}
