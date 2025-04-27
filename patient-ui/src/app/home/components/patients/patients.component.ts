import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'amatis-patients',
  standalone: false,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private modalService: ModalService, private patientService: PatientService,
    private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getList().subscribe((res) => {
      if (res.isSuccess && res.data) {
        this.patients = res.data;
      } else {
        this.toaster.error("Error", res.message);
      }
    });
  }


  openAddPatientModal() {
    const modalRef = this.modalService.open(AddNewPatientComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.getPatients();
      }
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }

  viewPatient(patientId: number) {
    this.router.navigateByUrl('/home/patient-detail?patientId=' + patientId);
  }

  deletePatient(patientId: number) {
    this.patientService.deletePatient(patientId).subscribe((res) => {
      if (res.isSuccess && res.data) {
        this.getPatients();
      } else {
        this.toaster.error("Error", res.message);
      }
    });
  }
}
