using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.Attributes
{
    public class ComparePasswordAttribute : ValidationAttribute
    {
        private readonly string _originalPasswordPropertyName;

        public ComparePasswordAttribute(string originalPasswordPropertyName)
        {
            _originalPasswordPropertyName = originalPasswordPropertyName;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var confirmPassword = value as string;
            var property = validationContext.ObjectType.GetProperty(_originalPasswordPropertyName);

            if (property == null)
            {
                return new ValidationResult($"Unknown property: {_originalPasswordPropertyName}");
            }

            var originalPassword = property.GetValue(validationContext.ObjectInstance) as string;

            if (confirmPassword != originalPassword)
            {
                return new ValidationResult("The password and confirmation password do not match.");
            }

            return ValidationResult.Success;
        }
    }
}
