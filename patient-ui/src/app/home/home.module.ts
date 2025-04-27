import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AddNewPatientComponent } from './components/add-new-patient/add-new-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    PatientsComponent,
    AddNewPatientComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
