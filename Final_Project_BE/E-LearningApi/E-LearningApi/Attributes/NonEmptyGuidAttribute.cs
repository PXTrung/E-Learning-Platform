using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.Attributes
{
    public class NonEmptyGuidAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is Guid guidValue && guidValue == Guid.Empty)
            {
                return new ValidationResult(ErrorMessage ?? "The GUID must be non-empty.");
            }

            return ValidationResult.Success;
        }
    }
}
