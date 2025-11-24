import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesPage } from './features-page/features-page'; 

const routes: Routes = [
  {
    path: '',
    component: FeaturesPage
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeaturesPage
  ]
})
export class FeaturesModule { }
