import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormularioDinamico: FormGroup = this.fb.group ({
    nombrePersona: [ '', [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array( [
      [ 'Livingstone Supongo', Validators.required ],
      [ 'Sir Fred', Validators.required ],
    ], Validators.required)
  })

  nuevoFavorito: FormControl = this.fb.control ( '', Validators.required );

  get favoritosArr() {
    return this.miFormularioDinamico.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  campoEsValido(campo : string) {
    return this.miFormularioDinamico.controls[campo].errors 
           && this.miFormularioDinamico.controls[campo].touched
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) { return; }

    this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    // this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );    // igual que new FormControl pero con el FormControl ya inyectado

    this.nuevoFavorito.reset();

  }

  guardar() {

    if (this.miFormularioDinamico.invalid) {
      this.miFormularioDinamico.markAllAsTouched();
      return;
    }

    console.log(this.miFormularioDinamico.value)
    this.miFormularioDinamico.reset();
  }

  borrar(pos: number) {
    this.favoritosArr.removeAt(pos);
  }

}
