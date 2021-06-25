// External imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Internal imports
import { Iuser } from '../authentication';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup; // holds registration form details
  public submitted: boolean = false; // on click of register button click
  constructor(private formBuilder: FormBuilder, private router: Router) { }
  /**
   * @author om kanada
   * @description This function is used to register user.
   */
  public register(): void {
    this.submitted = true;
    // to check required fields are filled
    if (this.registrationForm.valid) {
      const details: Iuser = this.registrationForm.value;
      // create normal user
      details.isAdmin = false;
      const userList: Iuser[] = JSON.parse(localStorage.getItem('userList')) || [];
      // check in userlist to register user
      const index = userList.findIndex(x => x.userName === details.userName);
      if (index === -1) {
        userList.push(details);
        // update userList and add to localstorage
        localStorage.setItem('userList', JSON.stringify(userList));
        // redirect to login page
        this.router.navigate(['login']);
      } else {
        window.alert('This UserName is already used.Please try another UserName.');
      }
    }
  }
  /**
   * @author om kanada
   * @description This function is used to create registration form.
   */
  private initRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  // intialization.
  ngOnInit(): void {
    this.initRegistrationForm();
  }

}

