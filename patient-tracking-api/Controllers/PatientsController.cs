using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using patient_tracking_api.DTOs;
using patient_tracking_api.Services;

namespace patient_tracking_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
          private readonly IPatientService _patientService;

    public PatientsController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _patientService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id) => Ok(await _patientService.GetByIdAsync(id));

    [HttpPost]
    public async Task<IActionResult> Create(PatientDto dto) => Ok(await _patientService.AddAsync(dto));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) => Ok(await _patientService.DeleteAsync(id));
    
    }
}
