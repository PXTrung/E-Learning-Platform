import React, { useEffect } from "react";
import Input_Video from "../../../../../../components/input_form/Input_Video";
import Input from "../../../../../../components/input_form/Input";
import Input_Textarea from "../../../../../../components/input_form/Input_Textarea";
import { useForm } from "react-hook-form";
import { AddLessonFormValue, addLessonSchema } from "../AddLessonSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import usePostLesson from "../../../../../../hooks/lesson/usePostLesson";

interface Props {
  sessionId: string;
}

const AddLessonForm = (sessionId: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<AddLessonFormValue>({
    resolver: zodResolver(addLessonSchema),
  });

  const { mutate, isSuccess } = usePostLesson(sessionId);

  const onSubmit = async (data: AddLessonFormValue) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    mutate(formData);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Create Lesson Successfully");
    console.log("Success");
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="product_form">
          <Input_Video
            id="videoFile"
            label="Video"
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
          />

          <div className="user_details">
            <Input
              id="name"
              type="text"
              label="Name"
              placeholder="Enter Lesson Name"
              register={register}
              errors={errors}
              isSubmitSuccessful={isSubmitSuccessful}
            />

            <Input_Textarea
              id="description"
              label="Description"
              register={register}
              errors={errors}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </div>
        </div>
        <div className="reg_btn">
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  );
};

export default AddLessonForm;
