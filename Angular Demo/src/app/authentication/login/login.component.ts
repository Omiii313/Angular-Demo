// External imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
// Internal imports
import { Iuser } from '../authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup; // holds login form details
  public submitted: boolean = false; // when click to login button

  constructor(private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router) { }
  /**
   * @author om kanada
   * @description This function is used to create login form.
   */
  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  /**
   * @author om kanada
   * @description This function is used to login user using social media (Invoked form HTML).
   * @param name // hold name of social media
   */
  public loginWithSocialMedia(name: string): void {
    // used to decide name of provider
    if (name === 'google') {
      name = GoogleLoginProvider.PROVIDER_ID;
    } else {
      name = FacebookLoginProvider.PROVIDER_ID;
    }
    // social auth service provided by angularx to signin using social media.
    this.socialAuthService.signIn(name);
    localStorage.setItem('login', JSON.stringify(true));
  }
  /**
   * @author om kanada
   * @description This function is used to login user(Invoked form HTML).
   */
  public login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const details: Iuser = this.loginForm.value;
      const userList: Iuser[] = JSON.parse(localStorage.getItem('userList')) || [];
      if (userList.length) {
        // check whether entered user name and password is correct or not.
        const index = userList.findIndex(x => x.userName === details.userName && x.password === details.password);
        if (index > -1) {
          localStorage.setItem('login', JSON.stringify(true));
          this.adduserDetails(userList[index]);
        } else {
          window.alert('UserName Or Password is Incorrect.');
        }
      } else {
        window.alert('There is no user registered.Please register!!');
      }
    }
  }
  /**
   * @author om kanada
   * @description This function is used to add user Details to localstorage.
   */
  private adduserDetails(user): void {
    if (user) {
      user.type = user.authToken ? 'social' : 'normal';
      user.userName = user.authToken ? user.name : user.userName;
      localStorage.setItem('userDetails', JSON.stringify(user));
      this.router.navigate(['post', 'index']);
    }
  }

  // intialization of component.
  ngOnInit() {
    this.initLoginForm();
    // for get user details after login from social media. 
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      const login = JSON.parse(localStorage.getItem('login'));
      if (login) {
        this.adduserDetails(user);
      }
    });
  }

}
