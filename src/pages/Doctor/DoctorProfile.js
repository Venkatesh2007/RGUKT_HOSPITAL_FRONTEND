import Header from "../../components/Header";
import ProfileComponent from "../../components/ProfileComponent";
import { DoctorsHeaderContent } from "../../store/data";

const DoctorProfile = () => {
  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <ProfileComponent user="doctor" />
    </>
  );
};

export default DoctorProfile;
