import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../../../components/input_form/Input";
import usePutCategory from "../../../../../../hooks/category/usePutCategory";
import { Category } from "../../../../../../services/interfaces";
import { FormValue, schema } from "../CategorySchema";
import { toast } from "react-toastify";

interface Props {
  category?: Category;
}

const UpdateCategoryForm = ({ category }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name,
    },
  });

  const { mutate, isSuccess } = usePutCategory({
    id: category?.id || "",
  });

  const onSubmit = async (data: FormValue) => {
    mutate(data);
  };

  // UseEffect to reset form values whenever category changes
  useEffect(() => {
    if (category) {
      reset({ name: category.name });
    }
  }, [category, reset]);

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Update Category Successfully");
    console.log("Success");
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="user_details">
        <Input
          id="name"
          label="Category Name"
          placeholder="Enter Category Name"
          type="text"
          register={register}
          errors={errors}
          isSubmitSuccessful={isSubmitSuccessful}
          hasDefaultValue={true}
        />
      </div>
      <div className="reg_btn">
        <input type="submit" value="Update" />
      </div>
    </form>
  );
};

export default UpdateCategoryForm;
