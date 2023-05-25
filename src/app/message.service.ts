import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  clearMessages() {
    this.messages = [];
  }
  public messages!: string[] ;

  constructor() {
    this.messages = [];
   }

   newMessage(message: string){
      this.messages.unshift(message);
      this.messages = this.messages.slice(0,1);
   }
}
