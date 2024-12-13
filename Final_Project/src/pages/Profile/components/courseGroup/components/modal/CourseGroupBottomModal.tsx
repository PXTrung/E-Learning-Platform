import { Container, Text } from "@mantine/core";
import GroupCourseCard from "../../../card/GroupCourseCard";
import useEnrollment from "../../../../../../hooks/enrollment/useEnrollment";
import {
  AddToGroup,
  CourseGroups,
  Enrollments,
} from "../../../../../../services/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import authUtils from "../../../../../../utils/auth";
import { useEffect } from "react";

interface Props {
  CourseGroup: CourseGroups;
}

const CourseGroupBottomModal = ({ CourseGroup }: Props) => {
  const { getEnrollments, addEnrollmentToGroup, addEnrollmentToGroupMutation } =
    useEnrollment();
  const { data } = getEnrollments();
  const queryClient = useQueryClient();
  const token = authUtils.getSessionToken();
  const coursesInLibrary: Enrollments[] | undefined = data?.data.filter(
    (i) => i.isCourseInGroup == false
  );

  const handleAddToGroup = (enrollmentId: string) => {
    const addToGroupData: AddToGroup = {
      courseGroupId: CourseGroup.id,
      enrollmentId,
    };
    addEnrollmentToGroup(addToGroupData);
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (addEnrollmentToGroupMutation.isSuccess)
      queryClient.invalidateQueries({ queryKey: ["enrollments", token] }),
        queryClient.invalidateQueries({
          queryKey: ["courseGroup", CourseGroup.id],
        });
    console.log("Success");
  }, [addEnrollmentToGroupMutation.isSuccess]);

  return (
    <div className="course-group-bottom-modal-container">
      <Container size={"100%"} p={0} mb={20}>
        <Text size="xl" c="dimmed" lh={1.6}>
          Library
        </Text>
      </Container>
      <div className="course-group-bottom-modal">
        {coursesInLibrary?.map((i) => (
          <GroupCourseCard
            variant="add"
            course={i.course}
            enrollmentId={i.id}
            onAddToGroup={handleAddToGroup}
            key={i.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGroupBottomModal;
