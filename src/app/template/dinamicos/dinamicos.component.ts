import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  @ViewChild('miFormularioDinamico') miFormularioDinamico!: NgForm;

  nuevoJuego: string = '';
  
  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      { id: 1, nombre: 'Sir Fred' },
      { id: 2, nombre: 'Livingstone, supongo' }
    ]
  }
  

  guardar() {
    console.log('Formulario Posteado', this.miFormularioDinamico);
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  nombrePersonaValido(): boolean {
    console.log('nombrePersona', this.miFormularioDinamico?.controls.nombrePersona);
    return (this.miFormularioDinamico?.controls.nombrePersona?.invalid 
            && this.miFormularioDinamico?.controls.nombrePersona?.touched)
  }

  agregarJuego() {

    console.log("agregarJuego", this.nuevoJuego);
    

    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({ ...nuevoFavorito});
    this.nuevoJuego = '';

  }

}
