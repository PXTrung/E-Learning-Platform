import React, { useEffect, useRef, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormResetField,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import dropzoneIcon from "../../assets/images/dropzone-icon.png";

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  imageUrl?: string;
  hasDefaultValue?: boolean;
  register?: UseFormRegister<T>;
  errors?: FieldErrors;
  isSubmitSuccessful?: boolean;
  watch: UseFormWatch<T>;
  setValue?: UseFormSetValue<T>;
  setFocus?: UseFormSetFocus<T>;
  resetField?: UseFormResetField<T>;
  unRegister?: UseFormUnregister<T>;
  onSetFile?: (e: File | undefined) => void;
}

const DropzoneCircle = <T extends FieldValues>({
  id,
  label,
  imageUrl,
  hasDefaultValue,
  register,
  errors,
  isSubmitSuccessful,
  watch,
  setValue,
  setFocus,
  resetField,
  unRegister,
  onSetFile,
}: Props<T>) => {
  const [hasValue, setHasValue] = useState(hasDefaultValue ? true : false);
  const [image, setImage] = useState(imageUrl ? imageUrl : "");
  const [hasImage, setHasImage] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const watchValue = watch(id);
    console.log("this field value: ", watchValue);

    if (files && files.length > 0) {
      setHasValue(true);
      const file = files[0];
      const cachedURL = URL.createObjectURL(file);
      setImage(cachedURL);
      onSetFile && onSetFile(undefined);
    } else {
      setHasValue(false);
      onSetFile && onSetFile(undefined);
    }
  };

  const handleDropImage = (e: FileList) => {
    const files = e;

    if (files && files.length > 0) {
      setHasValue(true);
      const file = files[0];
      const cachedURL = URL.createObjectURL(file);
      setImage(cachedURL);
    } else {
      setHasValue(false);
    }
  };

  const handleClick = () => {
    setHasImage(!hasImage);
    console.log(hasImage);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const inputFile = e.dataTransfer.files;
    const droppedFile = e.dataTransfer.files[0];

    if (setValue) {
      setValue(id, inputFile as any); // Set the dropped file in React Hook Form
    }

    onSetFile && onSetFile(droppedFile);

    handleDropImage(inputFile);
  };

  useEffect(() => {
    if (!hasDefaultValue) {
      setImage("");
      setHasValue(false);
    }
  }, [isSubmitSuccessful]);
  return (
    <div className="dropzone-img-container">
      <span className={hasValue ? "has-value" : ""}>{label}</span>
      {errors?.[id] && (
        <span className="form_validation">
          {errors?.[id]?.message?.toString()}
        </span>
      )}
      <label
        htmlFor={id}
        className="drop-area-circle"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <input
          type="file"
          accept="image/*"
          id={id}
          style={{ opacity: 0 }}
          {...(register &&
            register(id, {
              onChange: (e) => {
                register(id).onChange(e.target?.files?.[0] ?? undefined);
              },
            }))}
          onChange={(e) => handleImageUpload(e)}
          onClick={() => {
            handleClick();
          }}
        />
        <div
          className="img-view-circle"
          style={
            image
              ? { backgroundImage: `url(${image})`, border: "none" }
              : undefined
          }
        >
          {!image ? (
            <>
              <img src={dropzoneIcon} alt="dropzone-image" />
              <p>
                Drag and Drop or click here
                <br />
                to upload image
              </p>
              <span>Upload any images from desktop</span>
            </>
          ) : (
            ""
          )}
        </div>
      </label>
    </div>
  );
};

export default DropzoneCircle;
