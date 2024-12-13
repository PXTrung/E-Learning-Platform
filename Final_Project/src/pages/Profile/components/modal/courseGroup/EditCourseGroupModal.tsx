import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../../components/input_form/Input";
import useCourseGroup from "../../../../../hooks/courseGroup/useCourseGroup";
import { CourseGroups } from "../../../../../services/interfaces";
import courseGroupEditSchema, {
  CourseGroupEditFormValue,
} from "../CourseGroupEditSchema";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  CourseGroup: CourseGroups;
}

const EditCourseGroupModal = ({ onClick, isOpen, CourseGroup }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<CourseGroupEditFormValue>({
    resolver: zodResolver(courseGroupEditSchema),
    defaultValues: {
      id: CourseGroup.id,
      name: CourseGroup.name,
    },
  });

  const { editCourseGroup, editCourseGroupsMutation } = useCourseGroup();

  const onSubmit = async (data: CourseGroupEditFormValue) => {
    console.log(data);
    editCourseGroup(data);
    reset();
  };

  // UseEffect to reset form values whenever category changes
  useEffect(() => {
    if (CourseGroup) {
      reset({ id: CourseGroup.id, name: CourseGroup.name });
    }
  }, [CourseGroup, reset]);

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (editCourseGroupsMutation.isSuccess)
      toast.success("Update Category Successfully");
  }, [editCourseGroupsMutation.isSuccess]);

  return (
    <div
      className={`dark_bg ${isOpen && "popup_active"}`}
      id="addCourseWrapperBg"
      onClick={(e) => onClick(e)}
    >
      <div className={`popup ${isOpen && "popup_active"}`}>
        <div className="product_form_container">
          <div className="title">
            <p>Edit Group</p>
            <button className="closeBtn" id="closeButton">
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user_details">
              <Input
                id="id"
                label="Group Id"
                placeholder="Enter Group Id"
                type="text"
                hidden={true}
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                hasDefaultValue={true}
              />
              <Input
                id="name"
                label="Group Name"
                placeholder="Enter Group Name"
                type="text"
                register={register}
                errors={errors}
                isSubmitSuccessful={isSubmitSuccessful}
                hasDefaultValue={true}
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

export default EditCourseGroupModal;
