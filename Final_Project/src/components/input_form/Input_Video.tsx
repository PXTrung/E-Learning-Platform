import React, { useEffect, useState } from "react";
import imgPlaceholder from "../../assets/images/ImgPlaceHolder.png";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  videoUrl?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors;
  hasDefaultValue?: boolean;
  setValue?: UseFormSetValue<T>;
  isSubmitSuccessful?: boolean;
}

const Input_Video = <T extends FieldValues>({
  id,
  label,
  videoUrl,
  register,
  errors,
  hasDefaultValue,
  setValue,
  isSubmitSuccessful,
}: Props<T>) => {
  const [hasValue, setHasValue] = useState(hasDefaultValue ? true : false);
  const [video, setVideo] = useState(videoUrl ? videoUrl : "");
  const [hasVideo, setHasVideo] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setHasValue(true);
      const file = files[0];
      const cachedURL = URL.createObjectURL(file);
      setVideo(cachedURL);
      setHasVideo(true);
    } else {
      setHasValue(false);
    }
  };

  const handleClick = () => {
    if (hasVideo) setHasVideo(false);
  };

  useEffect(() => {
    if (!hasDefaultValue) {
      setVideo("");
      setHasValue(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="upload_img">
      <div className="imgholder">
        <video
          src={video}
          width="150"
          height="150"
          controls
          className={hasVideo ? "image has-image" : "image"}
        />
      </div>
      <div className="input_box">
        <label htmlFor={id} className={hasValue ? "has-value" : ""}>
          {label}
        </label>
        <input
          type="file"
          id={id}
          accept="video/*"
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

export default Input_Video;
