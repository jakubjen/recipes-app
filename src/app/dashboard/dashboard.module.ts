import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
	declarations: [HeaderComponent, NotificationsComponent],
	imports: [CommonModule, RouterModule, TranslateModule],
	exports: [HeaderComponent, NotificationsComponent],
})
export class DashboardModule {}
