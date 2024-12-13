import { Button, Group } from "@mantine/core";
import Input from "../../../../../components/input_form/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetEmailSchema } from "./schema/ResetEmailSchema";
import { ResetPasswordData } from "../../../../../services/interfaces";
import useAuth from "../../../../../hooks/auth/useAuth";
import { useEffect } from "react";

interface Props {
  PrevStep: () => void;
  NextStep: () => void;
}

const ChangePasswordForm = ({ PrevStep, NextStep }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetEmailSchema),
  });

  const { resetPassword, resetPasswordMutation } = useAuth();

  const onSubmit = async (data: ResetPasswordData) => {
    resetPassword(data);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (resetPasswordMutation.isSuccess) {
      NextStep();
    }
    console.log("Success");
  }, [resetPasswordMutation.isSuccess]);

  return (
    <>
      <div className="change-password-input-wrapper">
        <form className="change-password-confirm-password">
          <Input
            type="password"
            label="Enter your new password"
            id="password"
            placeholder="Enter your new password"
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
          />
          <Input
            type="password"
            label="Confirm your new password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            register={register}
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
          />
        </form>
      </div>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={PrevStep}>
          Back
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "violet", to: "blue", deg: 90 }}
          onClick={handleSubmit(onSubmit)}
          loading={resetPasswordMutation.isPending}
        >
          Next step
        </Button>
      </Group>
    </>
  );
};

export default ChangePasswordForm;
