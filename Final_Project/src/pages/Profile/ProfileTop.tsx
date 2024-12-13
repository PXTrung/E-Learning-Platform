import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { RiEditFill } from "react-icons/ri";
import profileImage from "../../assets/images/Profile_Avatar.jpg";
import useAuth from "../../hooks/auth/useAuth";
import UpdateProfileModal from "./components/modal/profile/UpdateProfileModal";
import classes from "./editProfileButton.module.css";

const ProfileTop = () => {
  const [active, setActive] = useState(false);
  const { getProfile } = useAuth();

  const { data } = getProfile();

  const handleClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setActive(!active);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (active) {
      document.documentElement.style.overflow = "hidden"; // Hide scrollbar
    } else {
      document.documentElement.style.overflow = "auto"; // Re-enable scrollbar
    }

    // Cleanup to reset on unmount or modal close
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [active]);

  return (
    <>
      <div className="profile-wrapper">
        <section className="profile-content">
          <div
            className="profile-banner"
            style={
              data?.backgroundUrl
                ? { backgroundImage: `url(${data?.backgroundUrl})` }
                : {
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8MjQ0OTMzOXx8ZW58MHx8fHx8')",
                  }
            }
          >
            <div className="profile-user-container">
              <div className="profile-user-avatar-holder">
                <div className="profile-user-avatar">
                  <img
                    src={data?.avatarUrl ? data?.avatarUrl : profileImage}
                    alt=""
                  />
                </div>
              </div>
              <div className="profile-user-name-container">
                <span>{data?.fullName}</span>
              </div>
            </div>
            <div className="profile-user-button-container">
              <Button
                variant="gradient"
                gradient={{ from: "violet", to: "cyan", deg: 90 }}
                leftSection={<RiEditFill fontSize={20} />}
                classNames={{ root: classes.root }}
                onClick={() => setActive(!active)}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </section>
        <div className="profile-overlay"></div>
      </div>
      {data && (
        <UpdateProfileModal
          isOpen={active}
          onClick={handleClose}
          profileData={data}
        />
      )}
    </>
  );
};

export default ProfileTop;
