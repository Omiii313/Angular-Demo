//  Extrenal imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private router: Router) { }

  /**
   * @author om kanada
   * @description This function is used to logout user using social media (Invoked form HTML).
   */
  public logOut(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
    if (userDetails.type === 'social') {
      this.socialAuthService.signOut();
    }
    localStorage.removeItem('userDetails');
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
