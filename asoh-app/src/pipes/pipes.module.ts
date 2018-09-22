import { NgModule } from '@angular/core';
import { BillionPipe } from './billion/billion';
@NgModule({
	declarations: [BillionPipe],
	imports: [],
	exports: [BillionPipe]
})
export class PipesModule {}
