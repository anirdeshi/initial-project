import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Form1Component } from './form/form1/form1.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalformComponent } from './form/modalform/modalform.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Comp1Component } from './form/comp1/comp1.component';
import { InnerlayoutComponent } from './layout/innerlayout/innerlayout.component';

@NgModule({
  declarations: [
    AppComponent,
    Form1Component,
    ModalformComponent,
    Comp1Component,
    InnerlayoutComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [Comp1Component]
})
export class AppModule { }
