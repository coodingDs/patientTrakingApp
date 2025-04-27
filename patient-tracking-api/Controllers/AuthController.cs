using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using patient_tracking_api.DTOs;
using patient_tracking_api.Models;
using patient_tracking_api.Models.Base;
using patient_tracking_api.Services;

namespace patient_tracking_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<GenericResponse<LoginResponse>>> Register(RegisterDto dto) => Ok(await _authService.Register(dto));

        [HttpPost("login")]
        public async Task<ActionResult<GenericResponse<LoginResponse>>> Login(LoginDto dto) => Ok(await _authService.Login(dto));
    }
}
