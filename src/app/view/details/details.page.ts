import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Part } from 'src/app/model/entities/part';
import { PartsService } from 'src/app/model/services/parts.service';

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

  constructor(private alertController: AlertController, private actRoute : ActivatedRoute, private router: Router, private partsService : PartsService){}

  ngOnInit() {
    this.actRoute.params.subscribe((params_) => {
      if(params_["index"]){
        this.index = params_["index"];
      }

      this.part = this.partsService.getPartByIndex(this.index);
      this.type = this.part.type;
      this.brand = this.part.brand;
      this.model = this.part.model;
      this.definitions = this.part.definitions;
      this.power = this.part.power;
    })
  }

  editPart(){
    if(this.type){
      if(this.brand){
        if(this.model){
          if(this.brand.length >= 2){
            if(this.model.length >= 2){
              let new_part : Part = new Part(this.type, this.brand, this.model);
              new_part.definitions = this.definitions;
              new_part.power = this.power;
              this.partsService.updatePart(this.index, new_part);
              this.router.navigate(['/home']);
            }else{this.partsService.presentAlert('Erro!', 'O campo modelo deve ter no mínimo dois caracteres!');}
          }else{this.partsService.presentAlert('Erro!', 'O campo marca deve ter no mínimo dois caracteres!');}
        }else{this.partsService.presentAlert('Erro!', 'O campo modelo é obrigatório!');}
      }else{this.partsService.presentAlert('Erro!', 'O campo marca é obrigatório!');}
    }else{this.partsService.presentAlert('Erro!', 'O campo tipo é obrigatório!');}
  }

  confirmDelete(){
    this.presentConfirmAlert('Alerta!', 'Tem certeza que deseja deletar a parte?');
  }

  deletePart(){
    this.partsService.deletePart(this.index);
    this.router.navigate(['/home']);
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
    this.partsService.goBackPage();
  }
}
