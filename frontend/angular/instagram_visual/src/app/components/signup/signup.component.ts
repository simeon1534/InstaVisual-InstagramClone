import { Component } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup,FormBuilder,Validator} from "@angular/forms";
import {AuthguardService} from "../../services/authguard.service";




type Users = {
  user_id: number,
  username: string,
  password: string,
  email: string,
  first_name?: string,
  last_name?: string

}

// type User = {
//   username: string,
//   password: string,
//   email: string,
//   first_name?: string,
//   last_name?: string
//
// }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public users: Users[] = [];
  public userForm: FormGroup;
  //form inputs
  // public username_input: string = '';
  // public email_input: string = '';
  // public password_input: string = '';
  // public firstName_input: string = '';
  // public lastName_input: string = '';

  private loggedUser = {
    id:20,
    username: "dido",
    first_name: "dido",
    last_name: "dido"
  }

  constructor(private router: Router,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private authService: AuthguardService) {

    this.userForm=this.formBuilder.group({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    })

  }

  ngOnInit(): void {
    if (this.authService.userExists()) {
      this.router.navigateByUrl("/users")
    }
  }
  goToLogIn() {
    this.router.navigate(['/login']);

  }
  signup() {
    console.log("CHECK")

    const headers = new HttpHeaders({
      Authorization: "abc123"
    });

    this.http.get("http://localhost:5000/user_api/users", {headers})
      .subscribe((res) => {
        this.users = res as Users[];
        const formValues = this.userForm.value;
        console.log(formValues)




        const userExist = this.users.find(u => u.email == formValues.email || u.username == formValues.username)

        if (formValues.username === '' || formValues.email === '' || formValues.password === ''){
          alert("You need username,password and email to continue");
        }
        else {
          if (userExist===undefined) {
            console.log("SIGNED UPPED")

            // POST to db
            this.http.post("http://localhost:5000/user_api/new_user", formValues, {headers})
              .subscribe( (res) => {
                console.log({res})

                // GET USERS AGAIN to take user_id for token
                this.http.get("http://localhost:5000/user_api/users", {headers})
                  .subscribe((res) => {
                    this.users = res as Users[];
                    const userExistWhenSigned = this.users.find(u => u.email == formValues.email && u.username == formValues.username)
                    console.log(userExistWhenSigned)
                    if (userExistWhenSigned!==undefined) {
                      this.loggedUser = {
                        id: userExistWhenSigned.user_id,
                        username: userExistWhenSigned.username,
                        first_name: userExistWhenSigned.first_name ?? '' ,
                        last_name: userExistWhenSigned.last_name ?? ''
                      }
                      localStorage.setItem("accessToken","abc123")
                      localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
                      this.router.navigateByUrl("/users")
                    }
                    else {
                      alert("User already exists")
                    }
                  })
                //TOKEN TAKEN
              })



          }
          else {
            alert("Try different username or email")
          }
        }
      })


  }




}
