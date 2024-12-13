import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../../components/input_form/Input";
import Input_Image from "../../../../../../components/input_form/Input_Image";
import Input_Select from "../../../../../../components/input_form/Input_Select";
import Input_Textarea from "../../../../../../components/input_form/Input_Textarea";
import usePostCourse from "../../../../../../hooks/course/usePostCourse";
import { Category } from "../../../../../../services/interfaces";
import { CourseFormValue, courseSchema } from "../CourseSchema";

const levels = [
  { id: "Beginer", name: "Beginer" },
  { id: "Intermidiate", name: "Intermidiate" },
  { id: "Advanced", name: "Advanced" },
];

interface Props {
  categories?: Category[];
}

const AddCourseForm = ({ categories }: Props) => {
  const categoryItems = categories as unknown as { id: string; name: string }[];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    watch,
  } = useForm<CourseFormValue>({
    resolver: zodResolver(courseSchema),
  });

  const { mutate, isSuccess } = usePostCourse();

  const onSubmit = async (data: CourseFormValue) => {
    console.log(data);
    const formData = new FormData();
    formData.append("thumbnailFile", data.thumbnailFile[0]);
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("level", data.level);
    formData.append("description", data.description);
    mutate(formData);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Create Course Successfully");
    console.log("Success");
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="product_form">
        <Input_Image
          id="thumbnailFile"
          label="Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          isSubmitSuccessful={isSubmitSuccessful}
          watch={watch}
        />

        <div className="user_details">
          <Input
            id="name"
            type="text"
            label="Name"
            placeholder="Enter Course Name"
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
          />

          <Input
            id="price"
            type="number"
            label="Price"
            accept="number"
            placeholder="Enter The Price"
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
          />

          <Input_Select
            id="categoryId"
            label="Category"
            items={categoryItems}
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
          />

          <Input_Select
            id="level"
            label="Level"
            items={levels}
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
  );
};

export default AddCourseForm;
