import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, RouterModule, TranslateModule],
	exports: [HeaderComponent],
})
export class DashboardModule {}
