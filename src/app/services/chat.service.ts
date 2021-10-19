import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import IMessage from "../interfaces/message.interface";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private static _URL = 'ws://localhost:3000';
  private socket: WebSocket;

  private _messages: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  public messages$: Observable<IMessage[]> = this._messages.asObservable();

  private get url(): string {
    return ChatService._URL;
  }

  public get messages(): IMessage[] {
    return this._messages.value;
  }

  public set messages(value: IMessage[]) {
    this._messages.next(value);
  }

  constructor() {}

  public connect(username: string) {
    console.log('generate websocket connection');
    this.socket = new WebSocket(`${this.url}?username=${username}`);
    this.messages$ = this._messages.asObservable();

    this.socket.onmessage = (res: MessageEvent<string>) => {
      const message: IMessage = JSON.parse(res.data);
      this.messages = this.messages.concat(message);
    }
  }

  public sendMessage(message: string): void {
    this.socket.send(JSON.stringify({text: message}));
  }
}
