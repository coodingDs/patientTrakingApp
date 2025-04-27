import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'amatis-add-new-patient',
  standalone: false,
  templateUrl: './add-new-patient.component.html',
  styleUrl: './add-new-patient.component.scss'
})
export class AddNewPatientComponent {
  addPatientForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required)
  });

  constructor(public activeModal: NgbActiveModal,private patientService: PatientService,private toaster:ToastrService) { }

  onSubmit() {
    if (this.addPatientForm.valid) {
      this.patientService.addNewPatient(this.addPatientForm.value).subscribe((res) => {
        if (res.isSuccess && res.data) {
          this.activeModal.close(this.addPatientForm.value);
        } else {
          this.toaster.error("Error", res.message);
        }
      });
    }
  }
}
