import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnDestroy {
  private headers : HttpHeaders = new HttpHeaders({
    Authorization: "abc123"
  });

  public userId: string | null = '';
  public userName: string | null = '';
  public firstName: string | null = '';
  public lastName: string | null = '';

  public userPhotos: any;
  public slides: any = [];

  private paramMapSubscription: Subscription | any ;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramMapSubscription = this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('user_id');
      console.log(this.userId);
      this.loadUserDetails();
      this.loadUserPhotos();
    });
  }

  ngOnDestroy() {
    this.paramMapSubscription.unsubscribe();
  }

  loadUserDetails() {
    this.http.get(`http://localhost:500/user_api/user/${this.userId}`, {headers: this.headers})
      .subscribe((res: any) => {
        console.log(res)
        this.userName = res[0].username
        this.firstName = res[0].first_name
        this.lastName = res[0].last_name
      });
  }

  loadUserPhotos() {
    this.http.get(`http://localhost:500/photo_api/user/${this.userId}`, {headers: this.headers})
      .subscribe((res) => {
        this.userPhotos = res;
        console.log(this.userPhotos);

        this.slides = [];

        for (let item of this.userPhotos) {
          const data = item["photo_base64"]["data"]
          const uint8Array = new Uint8Array(data);
          const decoder = new TextDecoder();
          const decodedString = decoder.decode(uint8Array);

          item.photo_base64 = decodedString;
          this.slides.push([item["photo_description"],item.photo_base64]);
        }
      });
  }
}
