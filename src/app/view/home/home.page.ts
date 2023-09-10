import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from 'src/app/model/entities/part';
import { PartsService } from 'src/app/model/services/parts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listOfParts : Part[] = [];
  constructor(private router : Router, private partService : PartsService){
    this.listOfParts = this.partService.getAllParts();
  }

  goToRegister(){
    this.router.navigate(["/register"]);
  }

  goToDetails(index : number){
    this.router.navigate(["/details", index])
  }
}
