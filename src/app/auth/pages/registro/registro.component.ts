import { emailPattern } from './../../../shared/validators/validaciones';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';
import { ValidatorService } from '../../../shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {




  noPuedeSerStrider (control: FormControl) {
    const valor: string = control.value?.trim();

    if (valor === 'fgededico') {
      return  {
        noStrider: true
      }
    } 
    
    return null;
    console.log(valor);
    
  }

  miFormulario: FormGroup = this.fb.group( { 
    //nombre: ['', [ Validators.required, Validators.pattern( nombreApellidoPattern ) ] ],   // Con constante en valicaciones.ts, o ...
    nombre: ['', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ] ],  // ...Tirando del servicio
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidator ] ],   // Validación async con servicio http
    username: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    password2: ['', [ Validators.required ] ]
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  })

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.required ) {
      return 'El email es obligatorio';
    } else if (errors?.pattern ) {
      return 'El formato del correo no es correcto'
    } else if (errors?.emailTomado) {
      return 'El correo ya está en uso'
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset( {
      nombre: 'Fgededigo Tonto',
      email: 'fgdegdgfgo@esgpaja.com',
      username: 'fgededigo',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido ( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched
  }

  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.required
  //           && this.miFormulario.get('email')?.touched
  // }

  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.pattern
  //           && this.miFormulario.get('email')?.touched
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTomado
  //           && this.miFormulario.get('email')?.touched
  // }



  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
    
  }

}

