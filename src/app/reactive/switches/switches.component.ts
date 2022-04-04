import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormularioSwitches: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true, Validators.required ],
    condiciones: [ false, Validators.requiredTrue ]
  })

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.miFormularioSwitches.reset({ 
      ...this.persona,
      condiciones: true
    });

    // this.miFormularioSwitches.get('condiciones')?.valueChanges.subscribe( form => {
    //   console.log('Condiciones:', form); 
    // })

    // this.miFormularioSwitches.valueChanges.subscribe( form => {
    //   delete form.condiciones;
    //   this.persona = form;
    //   console.log(form); 
    // })

    this.miFormularioSwitches.valueChanges.subscribe( ({ condiciones, ...restoDeArgumentos })=> {
      //delete form.condiciones;
      this.persona = restoDeArgumentos;
    })


  }

  guardar() {
    const formValue = { ...this.miFormularioSwitches.value}
    delete formValue.condiciones;

    this.persona = formValue;
  }

}
