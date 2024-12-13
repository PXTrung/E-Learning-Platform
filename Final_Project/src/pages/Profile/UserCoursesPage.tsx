import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/path";
import useEnrollment from "../../hooks/enrollment/useEnrollment";
import { AddToGroup, Enrollments } from "../../services/interfaces";
import CourseCard from "./components/card/CourseCard";
import CourseGroupFolder from "./components/courseGroup/CourseGroupFolder";
import AddCourseGroupModal from "./components/modal/courseGroup/AddCourseGroupModal";
import useCourseGroup from "../../hooks/courseGroup/useCourseGroup";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import authUtils from "../../utils/auth";

const fallbackCourse = {
  id: "fallback",
  name: "Unknown Course",
  description: "none",
  thumbnailUrl: "", // Provide a default or empty value
  price: 0,
  level: "Beginner", // Or any default level
  category: "none",
  totalTime: "00:00:00",
  numberOfLessons: 0,
  averageRating: 0,
};

const UserCoursesPage = () => {
  const [active, setActive] = useState(false);
  const [activeId, setActiveId] = useState(null); // Track the active dragged item
  const { getEnrollments, addEnrollmentToGroup, addEnrollmentToGroupMutation } =
    useEnrollment();
  const { getCourseGroups } = useCourseGroup();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = authUtils.getSessionToken();

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  const enrollments = getEnrollments();
  const courseGroups = getCourseGroups();

  const handleClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setActive(!active);
  };
  const handleClick = (id: string) => {
    navigate(`/${PATHS.PROFILE.IDENTITY}/courseGroup/${id}`);
  };

  const coursesInLibrary: Enrollments[] | undefined =
    enrollments.data?.data.filter((i) => i.isCourseInGroup == false);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id); // Track the id of the dragged item
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over) {
      // setActiveId(null);
      const courseGroupId = over.id;
      const enrollmentId = active.id;
      handleDrop(courseGroupId, enrollmentId);
    } else {
      // Reset activeId so the overlay and drag state will disappear
      // setActiveId(null);
      console.log("set activeId to null");
    }
  };

  const handleDrop = (courseGroupId: any, enrollmentId: any) => {
    const addToGroupData: AddToGroup = {
      courseGroupId: courseGroupId,
      enrollmentId: enrollmentId,
    };
    addEnrollmentToGroup(addToGroupData);
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (addEnrollmentToGroupMutation.isSuccess)
      queryClient.invalidateQueries({ queryKey: ["enrollments", token] }),
        console.log("Success");
  }, [addEnrollmentToGroupMutation.isSuccess]);

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <div className="profile-course-header-container">
          <div className="profile-course-header-button">
            <Button
              leftSection={<IoAdd size={20} />}
              variant="default"
              onClick={() => setActive(!active)}
            >
              Add Group
            </Button>
          </div>

          <div className="profile-course-header-wrapper">
            {courseGroups.data?.data.map((i) => (
              <CourseGroupFolder
                HandleClick={handleClick}
                CourseGroup={i}
                key={i.id}
              />
            ))}
          </div>
        </div>

        <div className="profile-course-body-container">
          {coursesInLibrary?.map((i) => (
            <CourseCard course={i.course} key={i.id} enrollmentId={i.id} />
          ))}
        </div>

        {/* DragOverlay to make CourseCard smaller while dragging */}
        {activeId ? (
          <DragOverlay>
            <div style={{ transform: "scale(0.5)", opacity: 0.5 }}>
              {coursesInLibrary ? (
                <CourseCard
                  course={
                    coursesInLibrary.find((i) => i.id === activeId)?.course ||
                    fallbackCourse
                  }
                  enrollmentId={activeId}
                />
              ) : (
                ""
              )}
            </div>
          </DragOverlay>
        ) : null}
      </DndContext>

      <AddCourseGroupModal isOpen={active} onClick={handleClose} />
    </>
  );
};

export default UserCoursesPage;
