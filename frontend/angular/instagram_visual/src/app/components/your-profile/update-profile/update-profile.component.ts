import { Component } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup,FormBuilder,Validator} from "@angular/forms";

type Users = {
  user_id: number,
  username: string,
  password: string,
  email: string,
  first_name?: string,
  last_name?: string

}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  public userForm: FormGroup;
  public users: any;
  constructor(private router: Router,
              private http: HttpClient,
              private formBuilder: FormBuilder) {

    this.userForm=this.formBuilder.group({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    })

  }

  submit() {
    const headers = new HttpHeaders({
      Authorization: "abc123"
    });

    // Check in database for same username or email or both

    this.http.get("http://localhost:500/user_api/users", {headers})
      .subscribe((res) => {
        this.users = res as Users[];
        const formValues = this.userForm.value;
        console.log(formValues)

        const userExist = this.users.find((u: Users) => u.email == formValues.email || u.username == formValues.username)

        if (userExist===undefined){
          console.log("OK")

          let accInfo : any = localStorage.getItem('loggedUser');
          accInfo = JSON.parse(accInfo)

          const loggedUser = {
            id: accInfo.id,
            username: accInfo.username,
            first_name: accInfo.first_name  ,
            last_name: accInfo.last_name
          }


          // Initialize updateUserData object
          let updateUserData: any = {};

          // Loop through form fields and add non-empty values to updateUserData
          if (formValues.username !== '') {
            updateUserData.username = formValues.username;

            accInfo.username = updateUserData.username
          }

          if (formValues.first_name !== '') {
            updateUserData.first_name = formValues.first_name;

            accInfo.first_name = updateUserData.first_name
          }

          if (formValues.email !== '') {
            updateUserData.email = formValues.email;


          }

          if (formValues.password !== '') {
            updateUserData.password = formValues.password;


          }

          if (formValues.last_name !== '') {
            updateUserData.last_name = formValues.last_name;

            accInfo.last_name = updateUserData.last_name
          }
          this.http.put(`http://localhost:500/user_api/user/update/${accInfo.id}`, updateUserData,{headers})
            .subscribe((res) => {
              console.log(res)
              localStorage.setItem("loggedUser",JSON.stringify(accInfo));
              alert("Successfully updated profile!")
            })
        }
        else {
          alert("Already exist username or email")
        }
      })


  }
}
