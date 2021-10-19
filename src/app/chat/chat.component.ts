import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";
import IMessage from "../interfaces/message.interface";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messages: IMessage[] = [];
  public message = new FormGroup({
    text: new FormControl('')
  });

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.messages$.subscribe((messages: IMessage[]) => {
      this.messages = messages;
    })
  }

  public sendMessage(event: Event) {
    event.preventDefault();
    this.chatService.sendMessage(this.message.value.text);
  }
}
