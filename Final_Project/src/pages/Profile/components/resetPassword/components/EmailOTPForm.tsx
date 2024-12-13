import { Button, Group } from "@mantine/core";
import Input from "../../../../../components/input_form/Input";
import { useForm } from "react-hook-form";
import { EmailOTPData } from "../../../../../services/interfaces";
import { EmailFromSchema } from "./schema/EmailFromSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../../../hooks/auth/useAuth";

interface Props {
  PrevStep: () => void;
  NextStep: () => void;
}

const EmailOTPForm = ({ PrevStep, NextStep }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<EmailOTPData>({
    resolver: zodResolver(EmailFromSchema),
  });

  const { sendEmail, sendEmailMutation } = useAuth();

  const onSubmit = async (data: EmailOTPData) => {
    console.log(data);
    sendEmail(data);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (sendEmailMutation.isSuccess) {
      toast.success("Email is sent");
      NextStep();
    }
    console.log("Success");
  }, [sendEmailMutation.isSuccess]);

  return (
    <>
      <form className="change-password-input-wrapper">
        <Input
          type="text"
          label="Enter an email you want to receive OTP code"
          id="email"
          placeholder="Enter your Email"
          register={register}
          errors={errors}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </form>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={PrevStep} disabled>
          Back
        </Button>
        <Button
          variant="gradient"
          onClick={handleSubmit(onSubmit)}
          gradient={{ from: "violet", to: "blue", deg: 90 }}
          loading={sendEmailMutation.isPending}
        >
          Next step
        </Button>
      </Group>
    </>
  );
};

export default EmailOTPForm;
