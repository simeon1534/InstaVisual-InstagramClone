import { Component, Input } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-gallery-single-user',
  templateUrl: './gallery-single-user.component.html',
  styleUrls: ['./gallery-single-user.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: false } }
  ]
})
export class GallerySingleUserComponent {
  @Input() slides = [];

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    console.log("GALLERY")

    console.log(this.slides)
  }

}
