import { useEffect, useState } from "react";
import "../../assets/css/AddCourseModal.css";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  id: Path<T>;
  type: string;
  label: string;
  placeholder: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors;
  accept?: string;
  hasDefaultValue?: boolean;
  isSubmitSuccessful?: boolean;
  hidden?: boolean;
  isRequire?: boolean;
}

const Input = <T extends FieldValues>({
  id,
  type,
  label,
  placeholder,
  register,
  errors,
  accept,
  hasDefaultValue,
  isSubmitSuccessful,
  isRequire,
  hidden,
}: Props<T>) => {
  const [hasValue, setHasValue] = useState(hasDefaultValue ? true : false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

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
      {!hidden && (
        <label htmlFor={id} className={hasValue ? "has-value" : ""}>
          {label}
        </label>
      )}

      <input
        hidden={hidden ? hidden : false}
        type={type}
        id={id}
        placeholder={placeholder}
        accept={accept || "text"}
        {...(register && register(id))}
        onChange={handleChange}
        required={isRequire ? true : false}
      />
      {errors?.[id] && (
        <span className="form_validation">
          {errors?.[id]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default Input;
