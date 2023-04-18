import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store, select} from "@ngrx/store";
import {registerAction} from "../store/actions/register.action";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../store/selectors";

import {RegisterRequestInterface} from "../types/registerRequest.interface";

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  isSubmitting$: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  // @ts-ignore
  initializeValues(): void {
    // @ts-ignore
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log('isSubmitting$', this.isSubmitting$)
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: ''
    })
    console.log(this.form.valid)
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))

  /*  this.authService.register(request).subscribe((currentUser: CurrentUserInterface)=>{
        console.log('currentUser',currentUser)
    })*/
  }
}
