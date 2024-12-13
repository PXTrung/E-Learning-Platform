import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../../components/input_form/Input";
import Input_Textarea from "../../../../../../components/input_form/Input_Textarea";
import Input_Video from "../../../../../../components/input_form/Input_Video";
import usePutLesson from "../../../../../../hooks/lesson/usePutLesson";
import { Lessons } from "../../../../../../services/interfaces";
import {
  UpdateLessonFormValue,
  updateLessonSchema,
} from "../UpdateLessonSchema";

interface Props {
  lesson: Lessons;
  sessionId: string;
}

const UpdateLessonForm = ({ lesson, sessionId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<UpdateLessonFormValue>({
    resolver: zodResolver(updateLessonSchema),
    defaultValues: {
      name: lesson?.name,
      description: lesson?.description,
    },
  });

  const { mutate, isSuccess } = usePutLesson(lesson.id, sessionId);

  const onSubmit = async (data: UpdateLessonFormValue) => {
    console.log(data);
    const formData = new FormData();

    if (data.videoFile) {
      formData.append("videoFile", data?.videoFile[0]);
    } else {
      formData.append("videoFile", "");
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    mutate(formData);
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Update Lesson Successfully");
    console.log("Success");
  }, [isSuccess]);

  // UseEffect to reset form values whenever category changes
  useEffect(() => {
    if (lesson) {
      reset({
        name: lesson?.name,
        description: lesson?.description,
      });
    }
  }, [lesson, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="product_form">
        <Input_Video
          id="videoFile"
          label="Video"
          register={register}
          errors={errors}
          isSubmitSuccessful={isSubmitSuccessful}
          videoUrl={lesson?.videoUrl}
          hasDefaultValue={true}
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
            hasDefaultValue={true}
          />

          <Input_Textarea
            id="description"
            label="Description"
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
            hasDefaultValue={true}
          />
        </div>
      </div>
      <div className="reg_btn">
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default UpdateLessonForm;
