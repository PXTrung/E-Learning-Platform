import { Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../assets/css/Accordion.css";
import "../assets/css/card.css";
import "../assets/css/cart.css";
import "../assets/css/courseDetail.css";
import "../assets/css/dropdown.css";
import "../assets/css/Home_Layout.css";
import "../assets/css/NotificationPage.css";
import "../assets/css/Profile_Layout.css";
import ProfileHeader from "../components/header/ProfileHeader";
import { PATHS } from "../constants/path";
import CourseGroupPage from "../pages/Profile/CourseGroupPage";
import ProfileDetailsPage from "../pages/Profile/ProfileDetailsPage";
import ProfileTop from "../pages/Profile/ProfileTop";
import UserCoursesPage from "../pages/Profile/UserCoursesPage";
import "./modalProfile.css";
import SettingPage from "../pages/Profile/SettingPage";

const Profile_Layout = () => {
  const navigate = useNavigate();
  const { value } = useParams();

  return (
    <>
      <ProfileHeader />

      <div className="main-body">
        <div className="profile-container">
          <ProfileTop />

          <div className="profile-navigation-container">
            <Tabs
              keepMounted={false}
              defaultValue="courseGroup"
              flex={1}
              value={value}
              onChange={(value) =>
                navigate(`/${PATHS.PROFILE.IDENTITY}/${value}`)
              }
            >
              <Tabs.List grow>
                <Tabs.Tab value="courses" style={{ fontSize: "18px" }}>
                  Courses
                </Tabs.Tab>
                <Tabs.Tab value="details" style={{ fontSize: "18px" }}>
                  Bio
                </Tabs.Tab>
                <Tabs.Tab value="courseGroup" style={{ display: "none" }}>
                  Hiddens
                </Tabs.Tab>
                <Tabs.Tab value="settings" style={{ fontSize: "18px" }}>
                  More
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="courses">
                <UserCoursesPage />
              </Tabs.Panel>

              <Tabs.Panel value="details">
                <ProfileDetailsPage />
              </Tabs.Panel>

              <Tabs.Panel value="courseGroup">
                <CourseGroupPage />
              </Tabs.Panel>

              <Tabs.Panel value="settings">
                <SettingPage />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Profile_Layout;
