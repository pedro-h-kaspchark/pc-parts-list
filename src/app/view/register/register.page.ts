import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from 'src/app/model/entities/part';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public type! : number;
  public brand! : string;
  public model! : string;
  public definitions! : string;
  public power! : number;

  constructor(private firebase: FirebaseService, private router : Router){}

  ngOnInit() {
  }

  register(){
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
                  this.firebase.registerPart(new_part).then(() => this.router.navigate(['/home'])).catch((error) => {console.log(error); this.firebase.presentAlert("Erro", "Erro ao salvar as partes!")});
                }else{this.firebase.presentAlert('Erro!', 'O campo modelo deve ter no mínimo dois caracteres!');}
              }else{this.firebase.presentAlert('Erro!', 'O campo marca deve ter no mínimo dois caracteres!');}
            }else{this.firebase.presentAlert('Erro', 'O campo potência é obrigatório!')}
          }else{this.firebase.presentAlert('Erro', "O campo denifições é obrigatório! ")}
        }else{this.firebase.presentAlert('Erro!', 'O campo modelo é obrigatório!');}
      }else{this.firebase.presentAlert('Erro!', 'O campo marca é obrigatório!');}
    }else{this.firebase.presentAlert('Erro!', 'O campo tipo é obrigatório!');}
  }

  goBackPage(){
    this.firebase.goBackPage();
  }
}
