import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ResponseCreateUser } from '../../interfaces/responses.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    terminos: [false, Validators.required],
  }, {
    validators: this.passwordAreEquals('password', 'confirmPassword')
  });

  public formSubmitted = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  public createUser() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      this.usuarioService.createUser(this.registerForm.value).subscribe((response: ResponseCreateUser) => {
        if (response.ok) {
          Swal.fire({
            title: 'Fantástico',
            text: 'El usuario se ha creado correctamente',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });

          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/dashboard');
        }
      }, (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.msg,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
    }
  }


  public fieldInvalid(field: string) {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public termnFieldInvalid() {
    if (!this.registerForm.get('terminos')?.value && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public passwordsAreTheSame() {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public passwordAreEquals(password1: string, password2: string) {
    return (formgroup: FormGroup) => {
      const password1Control = formgroup.get(password1);
      const password2Control = formgroup.get(password2);

      if (password1Control?.value === password2Control?.value) {
        password2Control?.setErrors(null);
      } else {
        password2Control?.setErrors({notEqual: true});
      }
    }

  }

}
