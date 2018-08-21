import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { FormsModule } from '@angular/forms';
import { backendProvider } from './mock/BackendInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    DiscountFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [backendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
