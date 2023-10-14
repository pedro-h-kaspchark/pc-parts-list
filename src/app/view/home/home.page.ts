import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from 'src/app/model/entities/part';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listOfParts : Part[] = [];

  constructor(private router : Router, private firebase: FirebaseService){
    this.firebase.getAllParts().subscribe(res => {this.listOfParts = res.map(parts => {return{id:parts.payload.doc.id,...parts.payload.doc.data() as any}as Part})})
  }

  goToRegister(){
    this.router.navigate(["/register"]);
  }

  goToDetails(part: Part){
    this.router.navigateByUrl("/details", {state: {part: part}});
  }
}
