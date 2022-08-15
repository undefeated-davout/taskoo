import { useState } from 'react';

import HeaderBar from 'components/organisms/HeaderBar';
import SideBar from 'components/organisms/SideBar';

type LoggedInProps = {
  children: React.ReactNode;
};

const LoggedIn = (props: LoggedInProps) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <HeaderBar clickMenuButton={toggleSideBar}></HeaderBar>
      <SideBar isSideBarOpen={isSideBarOpen}></SideBar>
      <main>{props.children}</main>
    </>
  );
};

export default LoggedIn;
