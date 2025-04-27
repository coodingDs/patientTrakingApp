using System;
using patient_tracking_api.DTOs;
using patient_tracking_api.Models;
using patient_tracking_api.Models.Base;

namespace patient_tracking_api.Services;

public interface IPatientService
{
    Task<GenericResponse<List<Patient>>> GetAllAsync();
    Task<GenericResponse<Patient>> GetByIdAsync(int id);
    Task<GenericResponse<Patient>> AddAsync(PatientDto dto);
    Task<GenericResponse<bool>> DeleteAsync(int id);
}
