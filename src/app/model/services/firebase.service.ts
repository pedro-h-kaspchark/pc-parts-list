import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Part } from '../entities/part';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "parts";

  constructor(private firestore: AngularFirestore, private alertController: AlertController, private router: Router) { }


  getAllParts(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  registerPart(part: Part){
    return this.firestore.collection(this.PATH).add({type: part.type, brand: part.brand, model: part.model, definitions: part.definitions, power: part.power});
  }

  updatePart(part: Part, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({type: part.type, brand: part.brand, model: part.model, definitions: part.definitions, power: part.power});
  }

  deletePart(id: string){
    return this.firestore.collection(this.PATH).doc(id).delete();
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
