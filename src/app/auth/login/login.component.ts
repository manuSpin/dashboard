import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResponseLogin } from '../../interfaces/responses.interface';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  @ViewChild('googleBtn') public googleBtn?: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  public formSubmitted = false;
  public auth2: any;

  public loginSubscription?: Subscription;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }


  ngAfterViewInit(): void {
    this.renderButton();
  }


  public login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response: ResponseLogin) => {
        if (response.ok) {

          if (this.loginForm.get('rememberMe')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);

          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');
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
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  public async renderButton() {
    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: 'outline', size: 'large' }
    );

    await this.authService.googleInit();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
