import { useForm } from "react-hook-form";
import { SessionFormValue, sessionSchema } from "../SessionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import usePutSession from "../../../../../../hooks/session/usePutSession";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Input from "../../../../../../components/input_form/Input";
import { Sessions } from "../../../../../../services/interfaces";

interface Props {
  session: Sessions;
  courseId: string;
}

const AddSessionForm = ({ session, courseId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<SessionFormValue>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: session?.name,
    },
  });

  const { mutate, isSuccess } = usePutSession(session.id, courseId);

  const onSubmit = async (data: SessionFormValue) => {
    console.log(data);
    mutate(data);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Update Session Successfully");
    console.log("Success");
  }, [isSuccess]);

  // UseEffect to reset form values whenever session changes
  useEffect(() => {
    if (session) {
      reset({ name: session.name });
    }
  }, [session, reset]);

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
