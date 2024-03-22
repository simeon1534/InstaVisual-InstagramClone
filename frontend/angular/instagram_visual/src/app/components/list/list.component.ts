import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  private headers : HttpHeaders = new HttpHeaders({
    Authorization: "abc123"
  });
  public photoUserInfo : any = [];
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get("http://localhost:500/photo_api/photos", {headers: this.headers})
      .subscribe((res) => {
        this.photoUserInfo = res ;
        this.photoUserInfo.reverse();
        console.log(this.photoUserInfo)

        for (let item of this.photoUserInfo) {
          const data = item["photo_base64"]["data"]
          const uint8Array = new Uint8Array(data);
          const decoder = new TextDecoder();
          const decodedString = decoder.decode(uint8Array);
          item.photo_base64 = decodedString;

          const dateStr = item.date_of_upload;
          const dateObj = new Date(dateStr);
          const localDate = dateObj.toLocaleString('en-US', { timeZone: 'Europe/Sofia' });

          item.date_of_upload = localDate;

        }
        console.log(this.photoUserInfo)

        //console.log(this.photos)

      })

  }


}
