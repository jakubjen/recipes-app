import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [NotFoundPageComponent],
	imports: [CommonModule, RouterModule],
	exports: [NotFoundPageComponent],
})
export class SharedModule {}
