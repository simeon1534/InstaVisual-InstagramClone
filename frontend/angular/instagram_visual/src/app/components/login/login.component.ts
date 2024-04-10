import {Component} from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthguardService} from "../../services/authguard.service";

type Users = {
  user_id: number,
  username: string,
  password: string,
  email: string,
  first_name?: string,
  last_name?: string

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public users: Users[] = [];

  //form inputs
  public email_input: string = '';
  public password_input: string = '';

  //data for local storage
  private loggedUser = {
    id:20,
    username: "dido",
    first_name: "dido",
    last_name: "dido"
  }
  public token: string = '';

  constructor(private router: Router,private http: HttpClient, private authService: AuthguardService) {
  }

  ngOnInit(): void {
    if (this.authService.userExists()) {
      this.router.navigateByUrl("/users")
    }
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
  login() {
    console.log("CHECK")

    const headers = new HttpHeaders({
      Authorization: "abc123"
    });

    this.http.get("http://localhost:5000/user_api/users",{headers})
      .subscribe((res) => {
        this.users = res as Users[];
        const userExist = this.users.find(u => u.email == this.email_input && u.password == this.password_input)

        //SHA256(this.password_input).toString() or this.password_input
        if (userExist){
          this.loggedUser = {
            id: userExist.user_id,
            username: userExist.username,
            first_name: userExist.first_name ?? '' ,
            last_name: userExist.last_name ?? ''
          }
          localStorage.setItem("loggedUser",JSON.stringify(this.loggedUser));
          localStorage.setItem("accessToken","abc123")
          this.authService.isLoggedIn.next(true);

          this.router.navigateByUrl("/users")
        }
        else {
          alert("Wrong credentials")
        }
        })


    // email (READY)
    // password (READY)
    // API login
    // token
    // redirect (READY)




}
}
