import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.scss']
})
export class YourProfileComponent {
  public usernameAcc: string = '';
  public first_nameAcc: string = '';
  public last_nameAcc: string = '';

  public dictToUpload: any ;
  public description : string= '';
  public file:any;
  public myPhotos: any;
  public currentItem: any;
  public slides: any = [];
  constructor(private router: Router,private http: HttpClient) {
  }

  ngOnInit(){

    this.getAccInfo()

    const myObjectString = localStorage.getItem('loggedUser');
    const myObject: { id: number, username: string } | null = myObjectString ? JSON.parse(myObjectString) : null;
    const headers = new HttpHeaders({
      Authorization: "abc123"
    });
    if (myObject) {
      const myId: number = myObject.id;
      console.log("VIEW Photos")
      this.http.get(`http://localhost:500/photo_api/user/${myId}`, {headers})
        .subscribe((res) =>{
          this.myPhotos = res
          console.log(this.myPhotos)
          console.log("Cycle")
          for (let item of this.myPhotos) {

            const data = item["photo_base64"]["data"]
            const uint8Array = new Uint8Array(data);
            const decoder = new TextDecoder();
            const decodedString = decoder.decode(uint8Array);


            item.photo_base64 = decodedString;
            this.currentItem = item.photo_base64

            this.slides.push([item["photo_description"],item.photo_base64])
            // HERE

            console.log(item["photo_description"])
            console.log("NEXT")

          }
          console.log(this.slides)
        })
    }

  }

  editInfo() {
    this.router.navigate(['/update_profile']);
  }

  delete() {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      console.log("DELETED")

      const headers = new HttpHeaders({
        Authorization: "abc123"
      });

      let accInfo : any = localStorage.getItem('loggedUser');
      accInfo = JSON.parse(accInfo)

      this.http.delete(`http://localhost:500/user_api/user/delete/${accInfo.id}`, {headers})
        .subscribe((res) => {
          console.log(res)
        })
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
  getAccInfo() {
    let accInfo : any = localStorage.getItem('loggedUser');
    accInfo = JSON.parse(accInfo)

    if (accInfo) {
      this.usernameAcc = accInfo.username
      this.first_nameAcc = accInfo.first_name
      this.last_nameAcc = accInfo.last_name

    }



  }
  uploadPhotoDB(dictionaryToDB: any) {



    console.log(this.dictToUpload["photo_description"])
    const headers = new HttpHeaders({
      Authorization: "abc123"
    });
    this.http.post("http://localhost:500/photo_api/new_photo" , dictionaryToDB, {headers})
        .subscribe((res) => {
        console.log({res})
        this.description = '';
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.value = '';
        })

  }



  getFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)

    console.log('Selected file is an image');



  }

  submit(){
    this.dictToUpload = {};

    if(this.description && this.file){
      // let formData = new FormData()
      // formData.set("photo_description",this.description)
      // formData.set("photo_base64",this.file)
      // console.log(formData)
      if (this.file && this.file.type && this.file.type.startsWith('image/')) {

        // Convert the file to base64 if it is image
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          const base64String = reader.result as string;
          // Update the dictionary with the base64 string
          this.file= base64String;
          //console.log(base64String)
          console.log('Selected file is an image');
          //Local Storage Id
          const myObjectString = localStorage.getItem('loggedUser');
          const myObject: { id: number, username: string } | null = myObjectString ? JSON.parse(myObjectString) : null;

          if (myObject) {
            const myId: number = myObject.id;
            console.log(myId);
            this.dictToUpload["user_id"] = myId
            this.dictToUpload["photo_description"] = this.description
            this.dictToUpload["photo_base64"] = this.file





            // POST to database
            console.log(this.dictToUpload["photo_description"])
            this.uploadPhotoDB(this.dictToUpload)


          }
          else {
            console.log('LocalStorage Object is null');
          }
        }





      }
      else {
        alert("Upload file with type image!")
      }

    }
    else {
      alert("Need description and image")
    }
  }



}
