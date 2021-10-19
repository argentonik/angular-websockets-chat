import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat/:username',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: '',
    loadChildren: () => import('./chat-name-getter/chat-name-getter.module').then(m => m.ChatNameGetterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
