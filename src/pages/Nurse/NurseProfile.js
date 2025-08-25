import Header from "../../components/Header";
import { NursingHeaderContent } from "../../store/data";
import ProfileComponent from "../../components/ProfileComponent";

const NurseProfile = () => {
  return (
    <>
      <Header headerContent={NursingHeaderContent} />
      <ProfileComponent user="nurse" />
    </>
  );
};

export default NurseProfile;
