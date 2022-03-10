import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageUploadModule } from 'angular2-image-upload';
// import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

import { CanActivateThisRoute } from './core/Guard/RouterGuard';
import { MaterialModule } from './core/Material/material.module';
import { RoutingModule } from './core/Routing/routing.module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { MyHttpInterceptor } from './core/Interceptor/interceptor.service';
// import { DirectionsMapDirective } from './core/Directives/DirectionsMapDirective';
import { MenuComponent } from './components/menu/menu.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonService } from './core/services/common.service';
import { SignalRService } from './core/services/SignalRService';
import { Proxy } from './core/services/proxy.service';
import { BusinessComponent } from './components/business/business.component';
import { BookingComponent } from './components/booking/booking.component';
import { Boost_listingComponent } from './components/boost_listing/boost_listing.component';
import { Boost_pricingComponent } from './components/boost_pricing/boost_pricing.component';
import { Service_prodComponent } from './components/service_prod/service_prod.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LocalStorageService } from './core/services/local-storage.service';
import { SaveCredentialsService } from './core/services/save-credentials.service';
import { RegisterComponent } from './components/register/register.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DeleteConfirmationComponent,
    MenuComponent,
    BusinessComponent,
    BookingComponent,
    Boost_listingComponent,
    Boost_pricingComponent,
    Service_prodComponent,
    FeedbackComponent,
    RegisterComponent

  ],
  entryComponents: [DeleteConfirmationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    ImageUploadModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCkBsM4-NKYM-ivEHOLrFJCxL00fhcQsMY'
    // }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    Proxy,
    CommonService,
    CanActivateThisRoute,
    LocalStorageService,
    SaveCredentialsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    SignalRService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
