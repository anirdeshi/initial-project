import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Comp1Component } from './form/comp1/comp1.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice';
  @ViewChild('containeref', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;


  constructor(private resolver: ComponentFactoryResolver) {


  }
  //  dynamic componenet created
  createComponent(message) {
    debugger;
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(Comp1Component);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.message = message;
  }
}
