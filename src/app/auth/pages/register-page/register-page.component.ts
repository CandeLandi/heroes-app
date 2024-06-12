import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }


  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required, Validators.minLength(6)]],
  })


  register() {
    const user = this.myForm.value;

    this.authService.register( user )
      .subscribe({
        next: () => this.router.navigateByUrl('/heroes'),
        error: (message) => {
          Swal.fire('Error', message, 'error' )
        }
      })
  }
}
