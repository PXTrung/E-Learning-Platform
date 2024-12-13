import { useForm } from "react-hook-form";
import Dropzone from "../../../../../components/input_form/Dropzone";
import Half_Input from "../../../../../components/input_form/Half_Input";
import Input from "../../../../../components/input_form/Input";
import { EditProfileFormValue, editProfileSchema } from "../EditProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../../../../hooks/auth/useAuth";
import { formatFromDataDate } from "../../../../../utils/formatDate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DropzoneCircle from "../../../../../components/input_form/DropzoneCircle";
import { ProfileData } from "../../../../../services/interfaces";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  profileData: ProfileData;
}

const UpdateProfileModal = ({ onClick, isOpen, profileData }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
    setValue,
    setFocus,
    resetField,
    unregister,
  } = useForm<EditProfileFormValue>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      dateOfBirth: formatFromDataDate(profileData.dateOfBirth),
    },
  });

  const [file, setFile] = useState<File | undefined>();
  const [bgFile, setBgFile] = useState<File | undefined>();

  const handleSetFile = (e: File | undefined) => {
    setFile(e);
  };

  const handleSetBgFile = (e: File | undefined) => {
    setBgFile(e);
  };

  const { editProfile, editProfileMutation } = useAuth();

  const onSubmit = async (data: EditProfileFormValue) => {
    if (data.avatarFile) {
      console.log(data.avatarFile[0]);
    }

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);

    formData.append("dateOfBirth", formatFromDataDate(data.dateOfBirth) || "");

    formData.append("phoneNumber", data.phoneNumber || "");

    if (data.avatarFile) {
      if (file) {
        formData.append("avatarFile", file);
      } else {
        formData.append("avatarFile", data.avatarFile[0]);
      }
    } else {
      formData.append("avatarFile", "");
    }

    if (data.backgroundFile) {
      if (bgFile) {
        formData.append("backgroundFile", bgFile);
      } else {
        formData.append("backgroundFile", data.backgroundFile[0]);
      }
    } else {
      formData.append("backgroundFile", "");
    }
    editProfile(formData);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (editProfileMutation.isSuccess)
      toast.success("Edit Profile Successfully");
    console.log("Success");
  }, [editProfileMutation.isSuccess]);

  return (
    <div
      className={`dark_bg ${isOpen && "popup_active"}`}
      id="addCourseWrapperBg"
      onClick={(e) => onClick(e)}
    >
      <div className={`popup ${isOpen && "popup_active"}`}>
        <div className="profile_form_container">
          <div className="title">
            <p>Edit Profile</p>
            <button className="closeBtn" id="closeButton">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user_details">
              <Half_Input
                id="firstName"
                label="First Name"
                placeholder="Enter First Name"
                type="text"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                hasDefaultValue={true}
              />
              <Half_Input
                id="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
                type="text"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                hasDefaultValue={true}
              />
              <Input
                id="phoneNumber"
                label="Phone Number"
                placeholder="Enter Your Phone Number"
                type="text"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                hasDefaultValue={profileData.phoneNumber ? true : false}
              />

              <Input
                id="dateOfBirth"
                label="Birth Date"
                placeholder="Select your birth date"
                type="date"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                hasDefaultValue={profileData.dateOfBirth ? true : false}
              />

              <DropzoneCircle
                id="avatarFile"
                label="Avatar"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                watch={watch}
                setValue={setValue}
                hasDefaultValue={true}
                imageUrl={profileData.avatarUrl}
                setFocus={setFocus}
                resetField={resetField}
                unRegister={unregister}
                onSetFile={handleSetFile}
              />
              <Dropzone
                variant="rectangle"
                id="backgroundFile"
                label="Background"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                watch={watch}
                setValue={setValue}
                hasDefaultValue={true}
                imageUrl={profileData.backgroundUrl}
                onSetFile={handleSetBgFile}
              />
            </div>
            <div className="reg_btn_profile">
              <input type="submit" value="Edit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
