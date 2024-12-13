import { useEffect, useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  items: {
    id: string;
    name: string;
  }[];

  register?: UseFormRegister<T>;
  errors?: FieldErrors;
  hasDefaultValue?: boolean;
  isSubmitSuccessful?: boolean;
}

const Input_Select = <T extends FieldValues>({
  id,
  label,
  items,
  register,
  errors,
  hasDefaultValue,
  isSubmitSuccessful,
}: Props<T>) => {
  const [hasValue, setHasValue] = useState(hasDefaultValue ? true : false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="input_box-select">
      <label htmlFor={id} className={hasValue ? "has-value" : ""}>
        {label}
      </label>
      <select id={id} {...(register && register(id))} onChange={handleChange}>
        <option value="">...</option>
        {items &&
          items.map((i) => (
            <option value={i.id} key={i.id}>
              {i.name}
            </option>
          ))}
      </select>
      {errors?.[id] && (
        <span className="form_validation">
          {errors?.[id]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default Input_Select;
