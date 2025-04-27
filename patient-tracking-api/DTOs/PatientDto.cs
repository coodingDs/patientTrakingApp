using System;

namespace patient_tracking_api.DTOs;

public class PatientDto
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public DateTime Birthdate { get; set; }
     public string? DoctorRemarks { get; set; }
}
