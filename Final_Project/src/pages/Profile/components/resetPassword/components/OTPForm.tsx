import { Button, Group, PinInput } from "@mantine/core";
import classes from "./otp_button.module.css";
import { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/auth/useAuth";
import { OTPData } from "../../../../../services/interfaces";
import { toast } from "react-toastify";

interface Props {
  PrevStep: () => void;
  NextStep: () => void;
}

const OTPForm = ({ PrevStep, NextStep }: Props) => {
  const [otp, setOtp] = useState<string>();

  const { verifyOTP, verifyOTPMutation } = useAuth();

  const handleSendOTP = () => {
    if (otp) {
      let data: OTPData = { otp };
      verifyOTP(data);
    }
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (verifyOTPMutation.isSuccess) {
      NextStep();
    }
    console.log("Success");
  }, [verifyOTPMutation.isSuccess]);

  return (
    <>
      <div className="change-password-input-wrapper">
        <div className="change-password-otp">
          <h2>Please, enter OTP code from the mail</h2>
          <PinInput
            size="xl"
            length={6}
            placeholder="."
            onChange={(e) => setOtp(e)}
            classNames={{
              input: classes.input,
              pinInput: classes.pinInput,
            }}
          />
        </div>
      </div>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={PrevStep}>
          Back
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "violet", to: "blue", deg: 90 }}
          loading={verifyOTPMutation.isPending}
          onClick={handleSendOTP}
        >
          Next step
        </Button>
      </Group>
    </>
  );
};

export default OTPForm;
