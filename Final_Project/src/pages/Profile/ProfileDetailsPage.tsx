import { FaRegEnvelope } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import useAuth from "../../hooks/auth/useAuth";
import { formatDisplayDate } from "../../utils/formatDate";

const ProfileDetailsPage = () => {
  const { getProfile } = useAuth();

  const { data } = getProfile();

  let dateOfBirth = data?.dateOfBirth;

  if (dateOfBirth === "0001-01-01T00:00:00") {
    dateOfBirth = "";
  }

  return (
    <div className="information-container">
      <div className="information-wrapper">
        <div className="information-item">
          <div className="information-item-title">Email:</div>
          <div className="information-item-content-container">
            <div className="information-item-icon-holder">
              <FaRegEnvelope className="information-item-icon" />
            </div>
            <div className="information-item-content">
              {data?.email ? data.email : "..."}
            </div>
          </div>
        </div>
        <div className="information-item">
          <div className="information-item-title">Date of Birth:</div>
          <div className="information-item-content-container">
            <div className="information-item-icon-holder">
              <IoCalendarSharp className="information-item-icon" />
            </div>
            <div className="information-item-content">
              {dateOfBirth ? formatDisplayDate(dateOfBirth) : "..."}
            </div>
          </div>
        </div>
        <div className="information-item">
          <div className="information-item-title">Phone:</div>
          <div className="information-item-content-container">
            <div className="information-item-icon-holder">
              <MdOutlinePhoneAndroid className="information-item-icon" />
            </div>
            <div className="information-item-content">
              {data?.phoneNumber ? data.phoneNumber : "..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
