import { Container, Text } from "@mantine/core";
import GroupCourseCard from "../../../card/GroupCourseCard";
import {
  CourseGroups,
  RemoveFromGroup,
} from "../../../../../../services/interfaces";
import useCourseGroup from "../../../../../../hooks/courseGroup/useCourseGroup";
import { useQueryClient } from "@tanstack/react-query";
import authUtils from "../../../../../../utils/auth";
import useEnrollment from "../../../../../../hooks/enrollment/useEnrollment";
import { useEffect } from "react";

interface Props {
  CourseGroup: CourseGroups;
}

const CourseGroupTopModal = ({ CourseGroup }: Props) => {
  const { getCourseGroupById } = useCourseGroup();
  const { removeFromGroup, removeFromGroupMutation } = useEnrollment();
  const { data } = getCourseGroupById(CourseGroup.id || "");
  const queryClient = useQueryClient();
  const token = authUtils.getSessionToken();

  const handleRemoveFromGroup = (enrollmentId: string) => {
    const removeFromGroupData: RemoveFromGroup = {
      courseGroupId: CourseGroup.id,
      enrollmentId,
    };
    removeFromGroup(removeFromGroupData);
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (removeFromGroupMutation.isSuccess)
      queryClient.invalidateQueries({ queryKey: ["enrollments", token] }),
        queryClient.invalidateQueries({
          queryKey: ["courseGroup", CourseGroup.id],
        });
    console.log("Success");
  }, [removeFromGroupMutation.isSuccess]);

  return (
    <div className="course-group-top-modal-container">
      <Container size={"100%"} p={0} mb={20}>
        <Text size="xl" c="dimmed" lh={1.6}>
          {data?.data.name}
        </Text>
      </Container>
      <div className="course-group-top-modal">
        {data?.data.enrollments.map((i) => (
          <GroupCourseCard
            variant="delete"
            course={i.course}
            enrollmentId={i.id}
            key={i.id}
            onRemoveFromGroup={handleRemoveFromGroup}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGroupTopModal;
