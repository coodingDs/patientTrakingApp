using Xunit;
using Moq;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using patient_tracking_api.Controllers;
using patient_tracking_api.Services;
using patient_tracking_api.Models;
using patient_tracking_api.Models.Base;

public class PatientsControllerTests
{
    private readonly PatientsController _controller;
    private readonly Mock<IPatientService> _mockPatientService;

    public PatientsControllerTests()
    {
        _mockPatientService = new Mock<IPatientService>();
        _controller = new PatientsController(_mockPatientService.Object);
    }

    [Fact]
    public async Task Get_ShouldReturnPatientsList()
    {
        var patients = new List<Patient>
        {
            new Patient { Id = 1, Name = "Duygu", Surname = "Saygın", Birthdate = new DateTime(1996, 3, 5) }
        };
        var response = new GenericResponse<List<Patient>> { Data = patients, IsSuccess = true };
        _mockPatientService.Setup(x => x.GetAllAsync()).ReturnsAsync(response);

        var result = await _controller.Get();

        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var returnValue = okResult.Value.Should().BeAssignableTo<GenericResponse<List<Patient>>>().Subject;

        returnValue.Data.Should().HaveCount(1);
        returnValue.Data[0].Name.Should().Be("Duygu");
    }
}
