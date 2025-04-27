using System;

namespace patient_tracking_api.Models.Base;


    public class GenericResponse<T>
    {

        public GenericResponse(bool IsSuccess = false, string msg = "")
        {
            this.IsSuccess = IsSuccess;
            this.Message = msg;

        }

        public int Status { get; set; } = 1;
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = null!;
        public List<string> ValidationErrors { get; set; } = null!;
        public T Data { get; set; } = default;
    }
