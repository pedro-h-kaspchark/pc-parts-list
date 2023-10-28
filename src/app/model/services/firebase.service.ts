import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Part } from '../entities/part';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "parts";

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private alertController: AlertController, private router: Router) { }


  getAllParts(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  registerPart(part: Part){
    return this.firestore.collection(this.PATH).add({type: part.type, brand: part.brand, model: part.model, definitions: part.definitions, power: part.power, downloadURL: part.downloadURL});
  }

  updatePart(part: Part, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({type: part.type, brand: part.brand, model: part.model, definitions: part.definitions, power: part.power, downloadURL: part.downloadURL});
  }

  deletePart(id: string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  uploadImage(imagem: any, part: Part){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error("Tipo não suportado!");
      return;
    }
    const path = `images/${part.brand}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {let uploadFileURL = fileRef.getDownloadURL(); uploadFileURL.subscribe(resp => {
        part.downloadURL = resp;
      if(!part.id){
        this.registerPart(part);
      }else{
        this.updatePart(part, part.id);
      }})})).subscribe();
      return task;
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
