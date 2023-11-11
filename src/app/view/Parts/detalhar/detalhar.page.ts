import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { confirmAlert } from 'src/app/common/confirmAlert';
import { GoBackPage } from 'src/app/common/goBackPage';
import { Part } from 'src/app/model/entities/part';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  type! : number;
  brand! : string;
  model! : string;
  definitions! : string;
  power! : number;
  part! : Part;
  imagem!: any;

  constructor(private firebase: FirebaseService, private router: Router, private alert: Alert, private confirmAlert: confirmAlert, private goBack: GoBackPage) {
  
   }

  ngOnInit() {
    this.part = history.state.part;
    this.type = this.part.type;
    this.brand = this.part.brand;
    this.model = this.part.model;
    this.definitions = this.part.definitions;
    this.power = this.part.power;

  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }
  editPart(){
    if(this.type){
      if(this.brand){
        if(this.model){
          if(this.definitions){
            if(this.power){
              if(this.brand.length >= 2){
                if(this.model.length >= 2){
                  let new_part : Part = new Part(this.type, this.brand, this.model);
                  new_part.definitions = this.definitions;
                  new_part.power = this.power;
                  if(this.imagem){
                    this.firebase.uploadImage(this.imagem, new_part)?.then(() => {this.router.navigate(["/home"]);})
                    this.firebase.deletePart(this.part.id);
                  }else{new_part.downloadURL = this.part.downloadURL;
                    this.firebase.updatePart(new_part, this.part.id).then(() => this.router.navigate(["/home"]))
                    .catch((error) => {console.log(error); this.alert.presentAlert("Erro", "Erro ao atualizar a parte!")});
                  }
                }else{this.alert.presentAlert('Erro!', 'O campo modelo deve ter no mínimo dois caracteres!');}
              }else{this.alert.presentAlert('Erro!', 'O campo marca deve ter no mínimo dois caracteres!');}
            }else{this.alert.presentAlert('Erro', 'O campo potência é obrigatório!')}
          }else{this.alert.presentAlert('Erro', "O campo denifições é obrigatório! ")}
        }else{this.alert.presentAlert('Erro!', 'O campo modelo é obrigatório!');}
      }else{this.alert.presentAlert('Erro!', 'O campo marca é obrigatório!');}
    }else{this.alert.presentAlert('Erro!', 'O campo tipo é obrigatório!');}
  }
  
  confirmDelete(){
    this.confirmAlert.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir a Parte?", (confirmed) => {if(confirmed){this.deletePart()}})
  }
    
  deletePart(){
    this.firebase.deletePart(this.part.id).then(() => {this.router.navigate(["/home"]);})
    .catch((error) => {console.log(error); this.alert.presentAlert("Erro", "Erro ao excluir a Parte!")});
  }
  goBackPage(){
    this.goBack.goBackPage();
  }
}
