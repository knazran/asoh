import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentInputPage } from './comment-input';

@NgModule({
  declarations: [
    CommentInputPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentInputPage),
  ],
})
export class CommentInputPageModule {}
