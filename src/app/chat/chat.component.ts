import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../services/chat.service";
import IMessage from "../interfaces/message.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  public username: string = 'User';
  public messages: IMessage[] = [];
  public message = new FormGroup({
    text: new FormControl('')
  });

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') ?? 'User';
      this.chatService.connect(this.username);
    });

    this.chatService.messages$.subscribe((messages: IMessage[]) => {
      this.messages = messages;
    });
  }

  public ngAfterViewChecked(): void {
    this.scrollChatToBottom();
  }

  public ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  public sendMessage(event: Event): void {
    event.preventDefault();
    this.chatService.sendMessage(this.message.value.text);
    this.message.setValue({text: ''});
  }

  private scrollChatToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
