using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using patient_tracking_api.Models.Base;

namespace patient_tracking_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictionController : ControllerBase
    {
         [HttpGet()]
    public IActionResult GetPrediction()
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "prediction-data.json");
        if (!System.IO.File.Exists(filePath)) return NotFound("Prediction file not found.");

        var json = System.IO.File.ReadAllText(filePath);
        var predictions = JsonSerializer.Deserialize<PredictionResult>(json);
        var result = predictions;
        var response = new GenericResponse<PredictionResult>
        {
            IsSuccess = true,
            Message = "Prediction data retrieved successfully.",
            Data = result,
            Status = 200
        };
        return Ok(response);
    }

    public class PredictionResult
    {
        public string Diagnosis { get; set; }
        public double Probability { get; set; }
    }
    }
}
