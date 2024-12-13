﻿using E_LearningApi.Common;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Category
{
    public class CreateCategoryRequest
    {
            [Required]
            [StringLength(Constants.MAXLENGTH_NAME, ErrorMessage = "The Category's name must not exceed 100 characters")]
            public string Name { get; set; } = string.Empty;
    }
}
