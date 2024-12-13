﻿using E_LearningApi.Common;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Level
{
    public class CreateLevelRequest
    {
        [Required]
        [StringLength(Constants.MAXLENGTH_NAME, ErrorMessage = "The Level's name must not exceed 100 characters")]
        public string Name { get; set; } = string.Empty;
    }
}
