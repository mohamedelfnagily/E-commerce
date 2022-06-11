import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/Components/login/login.component';
import { RegisterComponent } from './authentication/Components/register/register.component';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './Main-components/home/home.component';
import { NotfoundComponent } from './Main-components/notfound/notfound.component';
import { ProductComponent } from './Main-components/product/product.component';
import { ProfileComponent } from './Main-components/profile/profile.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home' , canActivate:[AuthGuard] ,component:HomeComponent},
  {path:'product/:id' , canActivate:[AuthGuard] , component:ProductComponent},
  {path:'profile' , canActivate:[AuthGuard] , component:ProfileComponent},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'**' , canActivate:[AuthGuard]  , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
