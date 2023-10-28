import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Part } from 'src/app/model/entities/part';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  index! : number;
  type! : number;
  brand! : string;
  model! : string;
  definitions! : string;
  power! : number;
  part! : Part;
  imagem!: any;

  constructor(private alertController: AlertController, private actRoute : ActivatedRoute, private router: Router, private firebase: FirebaseService){}

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
                  }else{new_part.downloadURL = this.part.downloadURL;
                    this.firebase.updatePart(new_part, this.part.id).then(() => this.router.navigate(["/home"]))
                    .catch((error) => {console.log(error); this.firebase.presentAlert("Erro", "Erro ao atualizar a parte!")});
                  }
                }else{this.firebase.presentAlert('Erro!', 'O campo modelo deve ter no mínimo dois caracteres!');}
              }else{this.firebase.presentAlert('Erro!', 'O campo marca deve ter no mínimo dois caracteres!');}
            }else{this.firebase.presentAlert('Erro', 'O campo potência é obrigatório!')}
          }else{this.firebase.presentAlert('Erro', "O campo denifições é obrigatório! ")}
        }else{this.firebase.presentAlert('Erro!', 'O campo modelo é obrigatório!');}
      }else{this.firebase.presentAlert('Erro!', 'O campo marca é obrigatório!');}
    }else{this.firebase.presentAlert('Erro!', 'O campo tipo é obrigatório!');}
  }

  confirmDelete(){
    this.presentConfirmAlert('Alerta!', 'Tem certeza que deseja deletar a parte?');
  }

  deletePart(){
    this.firebase.deletePart(this.part.id).then(() => {this.router.navigate(["/home"]);}).catch((error => {console.log(error); this.firebase.presentAlert("Erro", "Erro ao excluir a parte!")}));
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de partes',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar'},
        {text: 'Confirmar', role: 'confirmar', handler: (alert_action)=>{this.deletePart()}}
      ],
    });
  await alert.present();
  }

  goBackPage(){
    this.firebase.goBackPage();
  }
}
