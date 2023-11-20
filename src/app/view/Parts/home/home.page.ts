import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from 'src/app/model/entities/part';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listOfParts : Part[] = [];

  constructor(private router : Router, private firebase: FirebaseService, private auth: AuthService){
    console.log(this.auth.getUserLogged());
    this.firebase.getAllParts().subscribe(res => {this.listOfParts = res.map(part => {return{id:part.payload.doc.id,...part.payload.doc.data() as any}as Part})})
  }

  goToRegister(){
    this.router.navigate(["/cadastrar"]);
  }

  goToDetails(part: Part){
    this.router.navigateByUrl("/detalhar", {state: {part: part}});
  }

  logout(){
    this.auth.logOut().then(() =>{
      this.router.navigate(['login']);
    })
  }
}