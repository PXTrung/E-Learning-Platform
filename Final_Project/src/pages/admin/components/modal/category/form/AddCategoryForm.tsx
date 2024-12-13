import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../../components/input_form/Input";
import usePostCategory from "../../../../../../hooks/category/usePostCategory";
import { FormValue, schema } from "../CategorySchema";

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
  });

  const { mutate, isSuccess } = usePostCategory();

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    mutate(data);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Create Category Successfully");
    console.log("Success");
  }, [isSuccess]);

  return (
    <>
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
          />
        </div>
        <div className="reg_btn">
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  );
};

export default AddCategoryForm;
