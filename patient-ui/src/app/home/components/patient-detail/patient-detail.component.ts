import { Component } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'amatis-patient-detail',
  standalone: false,
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss'
})
export class PatientDetailComponent {
  aiPrediction = 'Low Risk - Probability 23%';
  patient?: Patient;

  constructor(private patinerService: PatientService, private activatedRouter: ActivatedRoute,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      const patientId = params['patientId'];
      if (patientId) {
        this.patinerService.getListById(patientId).subscribe((res) => {
          if (res.isSuccess && res.data) {
            this.patient = res.data;
            this.getAiPrediction();
          } else {
            this.toaster.error("Error", res.message);
          }
        });
      }
    });
  }

  getAiPrediction() {
    this.patinerService.getPrediction().subscribe((res) => {
      if (res.isSuccess && res.data) {
        this.aiPrediction ="Description " + res.data.diagnosis + ' - Probability ' + res.data.probability + '%';
      } else {
        this.toaster.error("Error", res.message);
      }
    });
  }

  back() {
    this.router.navigateByUrl('/home/patients');
  }

}
