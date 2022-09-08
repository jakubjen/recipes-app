import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable()
export class AuthService {
	constructor(private auth: AngularFireAuth) {}

	public async registerUser(email: string, password: string) {
		return this.auth.createUserWithEmailAndPassword(email, password);
	}

	public loginWithPassword(email: string, password: string) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	public async loginWithGoogle() {
		return await this.auth.signInWithPopup(
			new firebase.auth.GoogleAuthProvider()
		);
	}

	public logOut() {
		this.auth.signOut();
	}

	public getUserStatus() {
		return this.auth.authState;
	}
}
