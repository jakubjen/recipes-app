import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [NotFoundPageComponent, FormErrorComponent],
	imports: [CommonModule, TranslateModule],
	exports: [NotFoundPageComponent, FormErrorComponent],
})
export class SharedModule {}
