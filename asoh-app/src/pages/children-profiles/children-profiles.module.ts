import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildrenProfilesPage } from './children-profiles';

@NgModule({
  declarations: [
    ChildrenProfilesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildrenProfilesPage),
  ],
})
export class ChildrenProfilesPageModule {}
