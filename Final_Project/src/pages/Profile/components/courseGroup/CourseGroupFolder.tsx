import { Menu, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import folder from "../../../../assets/images/Folder_Image.png";
import { CourseGroups } from "../../../../services/interfaces";
import EditCourseGroupModal from "../modal/courseGroup/EditCourseGroupModal";
import CourseGroupBottomModal from "./components/modal/CourseGroupBottomModal";
import CourseGroupTopModal from "./components/modal/CourseGroupTopModal";
import { useDroppable } from "@dnd-kit/core";
import useCourseGroup from "../../../../hooks/courseGroup/useCourseGroup";
import courseGroup from "../../../../services/modules/courseGroup";

interface Props {
  HandleClick: (id: string) => void;
  CourseGroup: CourseGroups;
}
const CourseGroupFolder = ({ HandleClick, CourseGroup }: Props) => {
  const [editActive, setEditActive] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { setNodeRef, isOver } = useDroppable({
    id: CourseGroup.id,
  });

  const { deleteCourseGroup, deleteCourseGroupMutation } = useCourseGroup();

  const style = {
    opacity: isOver ? 0.6 : 1,
  };

  const handleEditActive = () => {
    setEditActive(!editActive);
  };

  const handleEditClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setEditActive(!editActive);
  };

  return (
    <>
      <div
        className="profile-course-folder"
        onClick={() => HandleClick(CourseGroup.id)}
      >
        <div className="profile-course-folder-container">
          <img src={folder} alt="folder image" style={style} ref={setNodeRef} />
          <Menu width={180} position="bottom-end" offset={5}>
            <Menu.Target>
              <div
                className="profile-course-folder-menu-container"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="profile-course-folder-menu">
                  <BiDotsVerticalRounded className="profile-course-folder-menu-icon" />
                </div>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <CiEdit
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditActive();
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IoAdd
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                }
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
              >
                Add/Delete Course
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IoTrashOutline style={{ width: "1rem", height: "1rem" }} />
                }
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCourseGroup(CourseGroup.id);
                }}
              >
                Delete Group
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <Tooltip
          arrowPosition="side"
          arrowOffset={40}
          arrowSize={8}
          label={CourseGroup.name}
          withArrow
          position="top-start"
          offset={-33}
        >
          <div className="profile-course-folder-name">{CourseGroup.name}</div>
        </Tooltip>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Add Course To Group"
        size={"90rem"}
      >
        <CourseGroupTopModal CourseGroup={CourseGroup} />
        <CourseGroupBottomModal CourseGroup={CourseGroup} />
      </Modal>

      <EditCourseGroupModal
        isOpen={editActive}
        onClick={handleEditClose}
        CourseGroup={CourseGroup}
      />
    </>
  );
};

export default CourseGroupFolder;
