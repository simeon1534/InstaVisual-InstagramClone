import { Component, Input } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: false } }
  ]
})
export class GalleryComponent {

  @Input() slides = [];

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    console.log("GALLERY")

    console.log(this.slides)
  }
}
