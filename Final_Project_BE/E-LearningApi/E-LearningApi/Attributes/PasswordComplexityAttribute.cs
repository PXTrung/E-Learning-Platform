﻿using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace E_LearningApi.Attributes
{
    public class PasswordComplexityAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {


            var password = value.ToString();

            if (password.Length < 8)
            {
                return new ValidationResult("Password must be at least 8 characters long.");
            }

            if (!Regex.IsMatch(password, @"[a-z]"))
            {
                return new ValidationResult("Password must contain at least one lowercase letter.");
            }

            if (!Regex.IsMatch(password, @"[A-Z]"))
            {
                return new ValidationResult("Password must contain at least one uppercase letter.");
            }

            if (!Regex.IsMatch(password, @"\d"))
            {
                return new ValidationResult("Password must contain at least one number.");
            }

            if (!Regex.IsMatch(password, @"[\W_]"))
            {
                return new ValidationResult("Password must contain at least one special character.");
            }

            return ValidationResult.Success;
        }
    }
}
