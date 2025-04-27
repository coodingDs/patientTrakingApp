using System;

namespace patient_tracking_api.Models;

  public class LoginResponse
   {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Token { get; set; } = null!;
   }
