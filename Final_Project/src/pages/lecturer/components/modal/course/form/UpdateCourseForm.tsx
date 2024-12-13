import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../../components/input_form/Input";
import Input_Image from "../../../../../../components/input_form/Input_Image";
import Input_Select from "../../../../../../components/input_form/Input_Select";
import Input_Textarea from "../../../../../../components/input_form/Input_Textarea";
import usePutCourse from "../../../../../../hooks/course/usePutCourse";
import { Category, Course } from "../../../../../../services/interfaces";
import {
  UpdateCourseFormValue,
  updateCourseSchema,
} from "../UpdateCourseSchema";

interface Props {
  course?: Course;
  categories?: Category[];
}

const levels = [
  { id: "Beginer", name: "Beginer" },
  { id: "Intermidiate", name: "Intermidiate" },
  { id: "Advanced", name: "Advanced" },
];

const UpdateCourseForm = ({ course, categories }: Props) => {
  const categoryItems = categories as unknown as { id: string; name: string }[];
  const categoryId = categoryItems.find(
    (category) => category.name == course?.category
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
  } = useForm<UpdateCourseFormValue>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: course?.name,
      price: course?.price.toString(),
      categoryId: categoryId?.id,
      level: course?.level,
      description: course?.description,
    },
  });

  const { mutate, isSuccess } = usePutCourse({
    id: course?.id || "",
  });

  const onSubmit = async (data: UpdateCourseFormValue) => {
    console.log(data);
    const formData = new FormData();
    if (data.thumbnailFile) {
      formData.append("thumbnailFile", data?.thumbnailFile[0]);
    } else {
      formData.append("thumbnailFile", "");
    }

    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("level", data.level);
    formData.append("description", data.description);
    mutate(formData);
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Update Course Successfully");
    console.log("Success");
  }, [isSuccess]);

  // UseEffect to reset form values whenever category changes
  useEffect(() => {
    if (course) {
      reset({
        name: course?.name,
        price: course?.price.toString(),
        categoryId: categoryId?.id,
        level: course?.level,
        description: course?.description,
      });
    }
  }, [course, reset]);

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
          imageUrl={course?.thumbnailUrl}
          hasDefaultValue={true}
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
            hasDefaultValue={true}
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
            hasDefaultValue={true}
          />

          <Input_Select
            id="categoryId"
            label="Category"
            items={categoryItems}
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
            hasDefaultValue={true}
          />

          <Input_Select
            id="level"
            label="Level"
            items={levels}
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

export default UpdateCourseForm;
