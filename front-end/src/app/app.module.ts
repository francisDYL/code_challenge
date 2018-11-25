import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './auth/authentication.service';
import {ShopService} from './shop/shop.service';
import {HttpClientModule} from '@angular/common/http';
import {PreloadService} from './preload/preload.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService, ShopService, PreloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
