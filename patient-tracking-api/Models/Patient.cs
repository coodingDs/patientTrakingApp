using System;

namespace patient_tracking_api.Models;

public class Patient
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public DateTime Birthdate { get; set; }
    public string? DoctorRemarks { get; set; }
    public ICollection<PatientHistory>? History { get; set; }
}

public class PatientHistory
{
    public int Id { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }

    public int PatientId { get; set; }
    
}
