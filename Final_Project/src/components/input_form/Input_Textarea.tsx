import { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors;
  hasDefaultValue?: boolean;
  isSubmitSuccessful?: boolean;
}

const Input_Textarea = <T extends FieldValues>({
  id,
  label,
  register,
  errors,
  hasDefaultValue,
  isSubmitSuccessful,
}: Props<T>) => {
  const [hasValue, setHasValue] = useState(hasDefaultValue ? true : false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  useEffect(() => {
    if (!hasDefaultValue) {
      setHasValue(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="input_box">
      <label htmlFor={id} className={hasValue ? "has-value" : ""}>
        {label}
      </label>
      <textarea
        id={id}
        {...(register && register(id))}
        onChange={handleChange}
      />
      {errors?.[id] && (
        <span className="form_validation">
          {errors?.[id]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default Input_Textarea;
