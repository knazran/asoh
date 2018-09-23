import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicListPage } from './clinic-list';

@NgModule({
  declarations: [
    ClinicListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicListPage),
  ],
})
export class ClinicListPageModule {}
