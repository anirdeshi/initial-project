import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnerlayoutComponent } from './layout/innerlayout/innerlayout.component';
import { Form1Component } from './form/form1/form1.component';


const routes: Routes = [
  { path: 'orderss', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) },
  {
    path: '',
    component: InnerlayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: Form1Component,
        pathMatch: 'full'
      },
      {
        path: 'userlist',
        component: Form1Component,
        data: {
          title: 'list of user'
        }
      },
      {
        path: 'userlist/:id',
        component: Form1Component,
        data: {
          title: 'Add/Edit user'
        }
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
