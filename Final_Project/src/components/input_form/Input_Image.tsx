import { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import imgPlaceholder from "../../assets/images/ImgPlaceHolder.png";

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  imageUrl?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors;
  hasDefaultValue?: boolean;
  setValue?: UseFormSetValue<T>;
  isSubmitSuccessful?: boolean;
  watch?: UseFormWatch<T>;
}

const Input_Image = <T extends FieldValues>({
  id,
  label,
  imageUrl,
  register,
  errors,
  hasDefaultValue,
  isSubmitSuccessful,
  watch,
}: Props<T>) => {
  const [hasValue, setHasValue] = useState(hasDefaultValue ? true : false);
  const [image, setImage] = useState(imageUrl ? imageUrl : imgPlaceholder);
  const [hasImage, setHasImage] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (watch) {
      const watchValue = watch(id);
      console.log("this field value: ", watchValue);
    }

    if (files && files.length > 0) {
      setHasValue(true);
      const file = files[0];
      const cachedURL = URL.createObjectURL(file);
      setImage(cachedURL);
      setHasImage(true);
    } else {
      setHasValue(false);
    }
  };

  const handleClick = () => {
    if (hasImage) setHasImage(false);
  };

  useEffect(() => {
    if (!hasDefaultValue) {
      setImage(imgPlaceholder);
      setHasValue(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="upload_img">
      <div className="imgholder">
        <img
          src={image}
          alt=""
          width="150"
          height="150"
          className={hasImage ? "image has-image" : "image"}
        />
      </div>
      <div className="input_box">
        <label htmlFor={id} className={hasValue ? "has-value" : ""}>
          {label}
        </label>
        <input
          type="file"
          id={id}
          accept="image/*"
          {...(register &&
            register(id, {
              onChange: (e) => {
                register(id).onChange(e.target?.files?.[0] ?? undefined);
                console.log(register(id));
              },
            }))}
          onChange={handleImageUpload}
          onClick={() => {
            handleClick();
          }}
          className="file_input"
        />
        {errors?.[id] && (
          <span className="form_validation">
            {errors?.[id]?.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input_Image;
