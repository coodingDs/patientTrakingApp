using System;
using patient_tracking_api.DTOs;
using patient_tracking_api.Models;
using patient_tracking_api.Models.Base;

namespace patient_tracking_api.Services;
public interface IAuthService
{
    Task<GenericResponse<LoginResponse>> Register(RegisterDto dto);
    Task<GenericResponse<LoginResponse>> Login(LoginDto dto);
}