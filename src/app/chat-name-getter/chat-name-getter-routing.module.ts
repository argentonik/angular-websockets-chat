import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatNameGetterComponent } from './chat-name-getter.component';

const routes: Routes = [{ path: '', component: ChatNameGetterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatNameGetterRoutingModule { }
