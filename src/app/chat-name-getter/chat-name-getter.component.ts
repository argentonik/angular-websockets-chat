import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat-name-getter',
  templateUrl: './chat-name-getter.component.html',
  styleUrls: ['./chat-name-getter.component.scss']
})
export class ChatNameGetterComponent implements OnInit {
  public form = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
