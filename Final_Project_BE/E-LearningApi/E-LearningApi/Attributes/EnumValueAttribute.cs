using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.Attributes
{
    public class EnumValueAttribute : ValidationAttribute
    {
        private readonly Type _enumType;
        public EnumValueAttribute(Type enumType)
        {
            _enumType = enumType;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var valueString = value.ToString();
                if (Enum.GetNames(_enumType).Contains(valueString, StringComparer.OrdinalIgnoreCase))
                {
                    return ValidationResult.Success;
                }
            }

            var validValues = string.Join(", ", Enum.GetNames(_enumType));
            return new ValidationResult($"The field {validationContext.DisplayName} must be one of the following values: {validValues}.");
        }
    }
}
