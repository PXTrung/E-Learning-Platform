import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../../components/input_form/Input";
import usePostSession from "../../../../../../hooks/session/usePostSession";
import { SessionFormValue, sessionSchema } from "../SessionSchema";

interface Props {
  id: string;
}

const AddSessionForm = (id: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<SessionFormValue>({
    resolver: zodResolver(sessionSchema),
  });

  const { mutate, isSuccess } = usePostSession(id);

  const onSubmit = async (data: SessionFormValue) => {
    console.log(data);
    mutate(data);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Create Session Successfully");
    console.log("Success");
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="user_details">
        <Input
          id="name"
          label="Session Name"
          placeholder="Enter Session Name"
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
  );
};

export default AddSessionForm;
