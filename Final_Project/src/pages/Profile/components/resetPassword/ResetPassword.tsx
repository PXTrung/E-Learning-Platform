import { rem, Stepper } from "@mantine/core";
import { useState } from "react";
import { Bs123 } from "react-icons/bs";
import { GoShieldLock } from "react-icons/go";
import { IoMailOpenOutline } from "react-icons/io5";
import ChangePasswordForm from "./components/ChangePasswordForm";
import EmailOTPForm from "./components/EmailOTPForm";
import OTPForm from "./components/OTPForm";

const ResetPassword = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          label="First step"
          description="Enter Email"
          icon={
            <IoMailOpenOutline style={{ width: rem(18), height: rem(18) }} />
          }
        >
          <EmailOTPForm PrevStep={prevStep} NextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Verify OTP"
          icon={<Bs123 style={{ width: rem(18), height: rem(18) }} />}
        >
          <OTPForm PrevStep={prevStep} NextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Change Password"
          icon={<GoShieldLock style={{ width: rem(18), height: rem(18) }} />}
        >
          <ChangePasswordForm PrevStep={prevStep} NextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Completed>
          <div className="change-password-input-wrapper">
            <div className="change-password-otp">
              <h2> Conragulation, you successfully change your password.</h2>
            </div>
          </div>
        </Stepper.Completed>
      </Stepper>
    </>
  );
};

export default ResetPassword;
