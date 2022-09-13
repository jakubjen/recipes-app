import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRouterModule } from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthRouterModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
	providers: [AuthService],
	exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
