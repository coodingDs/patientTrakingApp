using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using patient_tracking_api.Data;
using patient_tracking_api.DTOs;
using patient_tracking_api.Models;
using patient_tracking_api.Models.Base;

namespace patient_tracking_api.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<GenericResponse<LoginResponse>> Register(RegisterDto dto)
    {
        var response = new GenericResponse<LoginResponse>() { IsSuccess = false };
        if (_context.Users.Any(u => u.Username == dto.Username))
        {
            response.Message = "User already exist";
            return response;
        }

        using var hmac = new HMACSHA512();

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        var loginResponse = new LoginResponse()
        {
            Username = user.Username,
            Token = CreateToken(user)
        };

        response.IsSuccess = true;
        response.Message = "Register successful";
        response.Data = loginResponse;
        response.Status = 200;
        return response;
    }

    public async Task<GenericResponse<LoginResponse>> Login(LoginDto dto)
    {
        var response = new GenericResponse<LoginResponse>() { IsSuccess = false };
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user is null)
        {
            response.Message = "User not found";
            return response;
        }

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));

        if (!computedHash.SequenceEqual(user.PasswordHash))
        {
            response.Message = "username-or-password-is-incorrect";
            return response;
        }

        var loginResponse = new LoginResponse()
        {
            Username = user.Username,
            Token = CreateToken(user)
        };
        response.Data = loginResponse;
        response.Status = 200;
        response.IsSuccess = true;
        response.Message = "Login successful";

        return response;
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Issuer"],
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}