import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { GoBackPage } from 'src/app/common/goBackPage';
import { Part } from 'src/app/model/entities/part';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public type! : number;
  public brand! : string;
  public model! : string;
  public definitions! : string;
  public power! : number;
  public imagem!: any;

  constructor(private router: Router, private firebase: FirebaseService, private alert: Alert, private goBack: GoBackPage) {
    
   }

  ngOnInit() {
  }
  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  register(){
    if(this.type && this.brand && this.model && this.definitions && this.power && this.imagem){
      if(this.brand.length >= 2){
        if(this.model.length >= 2){
          let new_part : Part = new Part(this.type, this.brand, this.model);
          new_part.definitions = this.definitions;
          new_part.power = this.power;
          if(this.imagem){
            this.firebase.uploadImage(this.imagem, new_part)?.then(() =>{this.router.navigate(['/home'])})
          }else{
            this.firebase.registerPart(new_part).then(() => this.router.navigate(['/home'])).catch((error) => {console.log(error); this.alert.presentAlert("Erro", "Erro ao salvar as partes!")});
          }
        }else{this.alert.presentAlert('Erro!', 'O campo modelo deve ter no mínimo dois caracteres!');}
      }else{this.alert.presentAlert('Erro!', 'O campo marca deve ter no mínimo dois caracteres!');}
    }else{this.alert.presentAlert('Erro!', 'Todos os campos são obrigatórios!');}
  }
  goBackPage(){
    this.goBack.goBackPage();
  }
}
