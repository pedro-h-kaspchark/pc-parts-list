import { Injectable } from '@angular/core';
import { Part } from '../entities/part';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  public listOfParts : Part[] = [];

  constructor(private alertController: AlertController, private router: Router){}

  getAllParts(): Part[]{
    return this.listOfParts;
  }

  getPartByIndex(index: number): Part{
    return this.listOfParts[index];
  }

  registerPart(part : Part){
    this.listOfParts.push(part);
  }

  updatePart(index : number, new_part : Part){
    this.listOfParts[index] = new_part;
  }

  deletePart(index: number){
    this.listOfParts.splice(index, 1);
  }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Lista de partes',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  goBackPage(){
    this.router.navigate(['../'])
  }
}
