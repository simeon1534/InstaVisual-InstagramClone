import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import {AuthguardService} from "./services/authguard.service";
import { SingleUserComponent } from './components/nav/single-user/single-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavComponent } from './components/nav/nav.component';
import { YourProfileComponent } from './components/your-profile/your-profile.component';
import { GalleryComponent } from './components/your-profile/gallery/gallery.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {CarouselModule} from "ngx-bootstrap/carousel";
import { UpdateProfileComponent } from './components/your-profile/update-profile/update-profile.component';
import { CommonModule } from '@angular/common';
import { GallerySingleUserComponent } from './components/nav/single-user/gallery-single-user/gallery-single-user.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NotFoundComponent,
    LoginComponent,
    ListComponent,
    SingleUserComponent,
    NavComponent,
    YourProfileComponent,
    GalleryComponent,
    UpdateProfileComponent,
    GallerySingleUserComponent,
    AboutComponent,



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    CarouselModule,
    CarouselModule.forRoot(),
    CommonModule
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class MainAppModule { }
