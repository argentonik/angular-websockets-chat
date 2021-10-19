import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatNameGetterRoutingModule } from './chat-name-getter-routing.module';
import { ChatNameGetterComponent } from './chat-name-getter.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ChatNameGetterComponent
  ],
  imports: [
    CommonModule,
    ChatNameGetterRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ChatNameGetterModule { }
