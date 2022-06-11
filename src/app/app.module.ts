import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Main-components/navbar/navbar.component';
import { FooterComponent } from './Main-components/footer/footer.component';
import { NotfoundComponent } from './Main-components/notfound/notfound.component';
import { HomeComponent } from './Main-components/home/home.component';
import { ProductComponent } from './Main-components/product/product.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ImagePipe } from './Pipes/image.pipe';
import { EmptyParamPipe } from './Pipes/empty-param.pipe';
import { ProfileComponent } from './Main-components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    HomeComponent,
    ProductComponent,
    ImagePipe,
    EmptyParamPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule
 
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
