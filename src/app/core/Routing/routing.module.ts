import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { LogoutComponent } from '../../components/logout/logout.component';
import { CanActivateThisRoute } from '../Guard/RouterGuard';
import { MenuComponent } from '../../components/menu/menu.component';
import { BusinessComponent } from 'src/app/components/business/business.component';
import { BookingComponent } from 'src/app/components/booking/booking.component';
import { Boost_listingComponent } from 'src/app/components/boost_listing/boost_listing.component';
import { Boost_pricingComponent } from 'src/app/components/boost_pricing/boost_pricing.component';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { Service_prodComponent } from 'src/app/components/service_prod/service_prod.component';
import { RegisterComponent } from 'src/app/components/register/register.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'business', component: BusinessComponent,canActivate: [CanActivateThisRoute]},
    {path: 'booking', component: BookingComponent,canActivate: [CanActivateThisRoute]},
    {path: 'boost-listing', component: Boost_listingComponent,canActivate: [CanActivateThisRoute]},
    {path: 'boost-pricing', component: Boost_pricingComponent,canActivate: [CanActivateThisRoute]},
    {path: 'feedback', component: FeedbackComponent,canActivate: [CanActivateThisRoute]},
    {path: 'service-prod', component: Service_prodComponent,canActivate: [CanActivateThisRoute]},
    {path: 'register', component: RegisterComponent},
    {path: 'menu', component: MenuComponent, canActivate: [CanActivateThisRoute]},
    {path: '**', component: LoginComponent}
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule]
})
export class RoutingModule {}
