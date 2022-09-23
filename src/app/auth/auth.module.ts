import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRouterModule } from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthRouterModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		NgbProgressbarModule,
		SharedModule,
	],
	providers: [AuthService],
	exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
