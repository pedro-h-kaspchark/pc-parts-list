import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Part } from '../entities/part';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "parts";

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage){

  }
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
}
