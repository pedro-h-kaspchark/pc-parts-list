import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { confirmAlert } from 'src/app/common/confirmAlert';
import { GoBackPage } from 'src/app/common/goBackPage';
import { Part } from 'src/app/model/entities/part';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  detailsForm!: FormGroup;
  user: any;
  part!: Part;
  imagem: any;

  constructor(
    private firebase: FirebaseService, private router: Router, private alert: Alert, private confirmAlert: confirmAlert, private goBack: GoBackPage, private auth: AuthService, private formBuilder: FormBuilder){
    this.user = this.auth.getUserLogged();
  }

  ngOnInit(){
    this.part = history.state.part;

    this.detailsForm = this.formBuilder.group({
      type: [this.part.type, [Validators.required]],
      brand: [this.part.brand, [Validators.required, Validators.minLength(2)]],
      model: [this.part.model, [Validators.required, Validators.minLength(2)]],
      definitions: [this.part.definitions, [Validators.required]],
      power: [this.part.power, [Validators.required]],
      imagem: [null],
    });
  }

  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  editPart() {
    if (this.detailsForm.valid){
      const new_part: Part = {...this.detailsForm.value,uid: this.user.uid,id: this.part.id,downloadURL: this.part.downloadURL};

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, new_part)?.then(() =>{
          this.router.navigate(['/home'])
        });
      }else{
        new_part.downloadURL = this.part.downloadURL;

        this.firebase.updatePart(new_part, this.part.id).then(() => this.router.navigate(['/home'])).catch((error) =>{
          console.log(error);
          this.alert.presentAlert('Erro', 'Erro ao atualizar a parte!');
        });
      }
    }else{
      this.alert.presentAlert('Erro!', 'Verifique os campos obrigatórios!');
    }
  }
  confirmDelete(){
    this.confirmAlert.presentConfirmAlert('ATENÇÃO', 'Deseja realmente excluir a Parte?', (confirmed) =>{
      if(confirmed){
        this.deletePart();
      }
    });
  }

  deletePart(){
    this.firebase.deletePart(this.part.id).then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {console.log(error);
        this.alert.presentAlert('Erro', 'Erro ao excluir a Parte!');
      });
  }

  goBackPage(){
    this.goBack.goBackPage();
  }
}
