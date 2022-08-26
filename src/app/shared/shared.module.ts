import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [NotFoundPageComponent],
	imports: [CommonModule, RouterModule, TranslateModule],
	exports: [NotFoundPageComponent],
})
export class SharedModule {}
