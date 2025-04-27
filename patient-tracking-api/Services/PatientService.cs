using System;
using Microsoft.EntityFrameworkCore;
using patient_tracking_api.Data;
using patient_tracking_api.DTOs;
using patient_tracking_api.Models;
using patient_tracking_api.Models.Base;

namespace patient_tracking_api.Services;
public class PatientService : IPatientService
{
    private readonly ApplicationDbContext _context;

    public PatientService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GenericResponse<List<Patient>>> GetAllAsync()
    {
        var data = await _context.Patients.Include(p => p.History).ToListAsync();
        var response = new GenericResponse<List<Patient>>
        {
            IsSuccess = true,
            Message = data.Count() == 0 ? "" : "Patient not found",
            Data = data,
            Status = 200
        };
        return response;
    }

    public async Task<GenericResponse<Patient>> GetByIdAsync(int id)
    {
        var data = await _context.Patients.Include(p => p.History).FirstOrDefaultAsync(p => p.Id == id);
        var response = new GenericResponse<Patient>
        {
            IsSuccess = true,
            Message = data != null ? "" : "Patient not found",
            Data = data,
            Status = 200
        };
        return response;
    }

    public async Task<GenericResponse<Patient>> AddAsync(PatientDto dto)
    {
        var patient = new Patient
        {
            Name = dto.Name,
            Surname = dto.Surname,
            Birthdate = DateTime.SpecifyKind(dto.Birthdate, DateTimeKind.Utc),
            DoctorRemarks = dto.Name + " " + dto.Surname + " " + dto.Birthdate.ToString("yyyy-MM-dd") + " for generic sample data",
            History = new List<PatientHistory>()
        };

        var patientAdded = _context.Patients.Add(patient);
        patientAdded.Entity.History = new List<PatientHistory>() {
            new PatientHistory
            {
                Description = "Initial checkup 1 sample data",
                Date = DateTime.UtcNow,
                PatientId = patientAdded.Entity.Id
            },
            new PatientHistory
            {
                Description = "Initial checkup 2 sample data",
                Date = DateTime.UtcNow,
                PatientId = patientAdded.Entity.Id
            }
        };
        await _context.SaveChangesAsync();

        return new GenericResponse<Patient>
        {
            IsSuccess = true,
            Message = "Added successfully",
            Data = patient,
            Status = 200
        };
    }

    public async Task<GenericResponse<bool>> DeleteAsync(int id)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null) throw new Exception("Patient not found");

        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();
        return new GenericResponse<bool>
        {
            IsSuccess = true,
            Message = "Patient deleted successfully",
            Data = true,
            Status = 200
        };
    }
}
