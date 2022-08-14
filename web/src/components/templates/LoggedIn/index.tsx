import HeaderBar from 'components/organisms/HeaderBar';
import SideBar from 'components/organisms/SideBar';

type LoggedInProps = {
  children: React.ReactNode;
};

const LoggedIn = (props: LoggedInProps) => {
  return (
    <>
      <HeaderBar></HeaderBar>
      <SideBar></SideBar>
      <main>{props.children}</main>
    </>
  );
};

export default LoggedIn;
