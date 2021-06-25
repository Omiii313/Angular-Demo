import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showHead: boolean = false;
  constructor(private router: Router) {  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event['url'] === '/login' || event['url'] === '/register') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
    this.addAdmin();
  }
  // This function is used to add admin details to local .
  // to perform CRUD
  private addAdmin(): void {
    const adminDetails = [{ userName: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin', isAdmin: true }];
    localStorage.setItem('userList', JSON.stringify(adminDetails));
  }
}
