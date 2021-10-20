import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import IMessage from "../interfaces/message.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public username: string = 'User';
  public messages: IMessage[] = [];
  public message = new FormGroup({
    text: new FormControl('')
  });

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') ?? 'User';
      this.chatService.connect(this.username);
    });

    this.chatService.messages$.subscribe((messages: IMessage[]) => {
      this.messages = messages;
    });
  }

  public sendMessage(event: Event): void {
    event.preventDefault();
    this.chatService.sendMessage(this.message.value.text);
    this.message.setValue({text: ''});
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}
