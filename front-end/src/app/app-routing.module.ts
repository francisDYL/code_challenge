import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NearByShopComponent } from './near-by-shop/near-by-shop.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  /*{path: 'nearByShops', component: NearByShopComponent}*/
  {path: 'nearByShops', canActivate: [AuthGuard], component: NearByShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [NearByShopComponent, WelcomeComponent];
