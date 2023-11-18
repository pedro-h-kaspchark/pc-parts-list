import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private firebase: FirebaseService, private auth: AngularFireAuth, private router: Router, private ngZone: NgZone){
    this.auth.authState.subscribe(user =>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      }else{
        localStorage.setItem('user', 'null');
      }
    });
  }
  public login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  public register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  public recoverPassword(email: string){
    return this.auth.sendPasswordResetEmail(email);
   }
   public logOut(){
    return this.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
   }
   public isLoggedIn() : boolean{
    const user : any = JSON.parse(localStorage.getItem('user') || 'null');
    return (user !== null) ? true : false;
   }
   public getUserLogged(){
    const user : any = JSON.parse(localStorage.getItem('user') || 'null');
    return (user !== null) ? user : null;
   }
   public logInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
   }
   public loginWithGithub(){
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
   }
}
