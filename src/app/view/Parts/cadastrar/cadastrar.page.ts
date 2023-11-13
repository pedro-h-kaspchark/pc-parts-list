import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { GoBackPage } from 'src/app/common/goBackPage';
import { Part } from 'src/app/model/entities/part';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  registerForm!: FormGroup;
  user: any;

  constructor(private router: Router, private firebase: FirebaseService, private alert: Alert, private goBack: GoBackPage, private auth: AuthService, private builder: FormBuilder){
    this.user = this.auth.getUserLogged();
    this.registerForm = new FormGroup({
      type: new FormControl(''),
      brand: new FormControl(''),
      model: new FormControl(''),
      definitions: new FormControl(''),
      power: new FormControl(''),
      imagem: new FormControl('')
    });
  }

  ngOnInit() {
    this.registerForm = this.builder.group({
      type: ['', [Validators.required]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      definitions: ['', [Validators.required]],
      power: ['', [Validators.required]],
      imagem: ['', [Validators.required]]
    })
  }
  uploadFile(event: any) {
  const imagem = event.target.files;

  if (imagem && imagem.length > 0) {
    this.registerForm.patchValue({ imagem: imagem });
  }
}
  submitForm(){
    if(!this.registerForm.valid){
      this.alert.presentAlert("OK", "Erro ao cadastrar!");
    }else{
      this.register();
    }
  }

  private register(){
    if(this.registerForm.valid){
      const new_part: Part = new Part(
        this.registerForm.value.type,
        this.registerForm.value.brand,
        this.registerForm.value.model
      );
      new_part.definitions = this.registerForm.value.definitions;
      new_part.power = this.registerForm.value.power;
      new_part.uid = this.user.uid;
  
      if(this.registerForm.value.imagem){
        this.firebase.uploadImage(this.registerForm.value.imagem, new_part)?.then(() =>{
          this.router.navigate(['/home']);
        });
      }else{
        this.firebase
          .registerPart(new_part)
          .then(() => this.router.navigate(['/home']))
          .catch((error) => {
            console.log(error);
            this.alert.presentAlert('Erro', 'Erro ao salvar as partes!');
          });
      }
    }else{
      this.alert.presentAlert('Erro!', 'Verifique os campos obrigatórios!');
    }
  }
  goBackPage(){
    this.goBack.goBackPage();
  }
}
