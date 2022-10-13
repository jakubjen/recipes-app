import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NumberValidationDirective } from 'src/helpers/number-validation.directive';

@NgModule({
	declarations: [
		NotFoundPageComponent,
		FormErrorComponent,
		NumberValidationDirective,
	],
	imports: [CommonModule, RouterModule, TranslateModule],
	exports: [
		NotFoundPageComponent,
		FormErrorComponent,
		NumberValidationDirective,
	],
})
export class SharedModule {}
