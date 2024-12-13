import { useForm } from "react-hook-form";
import Input from "../../../../../components/input_form/Input";
import { CourseFormValue } from "../../../../lecturer/components/modal/course/CourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseGroupSchema } from "../CourseGroupSchema";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useCourseGroup from "../../../../../hooks/courseGroup/useCourseGroup";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
}

const AddCourseGroupModal = ({ onClick, isOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<CourseFormValue>({
    resolver: zodResolver(courseGroupSchema),
  });

  const { createCourseGroup, createCourseGroupsMutation } = useCourseGroup();

  const onSubmit = async (data: CourseFormValue) => {
    console.log(data);
    createCourseGroup(data);
    reset();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (createCourseGroupsMutation.isSuccess)
      toast.success("Create Group Successfully");
  }, [createCourseGroupsMutation.isSuccess]);

  return (
    <div
      className={`dark_bg ${isOpen && "popup_active"}`}
      id="addCourseWrapperBg"
      onClick={(e) => onClick(e)}
    >
      <div className={`popup ${isOpen && "popup_active"}`}>
        <div className="product_form_container">
          <div className="title">
            <p>Add Group</p>
            <button className="closeBtn" id="closeButton">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user_details">
              <Input
                id="name"
                label="Group Name"
                placeholder="Enter Group Name"
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
        </div>
      </div>
    </div>
  );
};

export default AddCourseGroupModal;
