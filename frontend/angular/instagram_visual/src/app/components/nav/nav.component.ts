import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public searchText: string = '';
  public currentUser: any;

  constructor(private router: Router, private http: HttpClient) {
  }


  search() {

    const headers = new HttpHeaders({
      Authorization: "abc123"
    });
    console.log(this.searchText)
    this.http.get(`http://localhost:500/user_api/username/${this.searchText}`, {headers})
      .subscribe((res) => {
        this.currentUser = res;
        if (this.currentUser.length !== 0)  {
          const userId = this.currentUser[0].user_id

          this.router.navigate([`/user/${userId}`]);
        }

      })
  }
  redirectToProfile() {
    this.router.navigate(['/your_profile']);
  }

  redirectToHome() {
    this.router.navigate(['/users']);
  }

  redirectToAbout() {
    this.router.navigate(['/about']);
  }

  sign_out() {
    if (window.confirm("Are you sure you want to sign out?")) {
      console.log("SIGNED OUT")
      localStorage.clear();
      this.router.navigate(['/login']);
    }

  }
}
