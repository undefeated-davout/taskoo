import CenterContainerBox from 'components/atoms/CenterContainerBox';

import MenuContainer from '../MenuContainer';

type LoggedOutProps = {
  children: React.ReactNode;
};

const LoggedOut = (props: LoggedOutProps) => {
  return (
    <>
      <MenuContainer isLoggedIn={false}>
        <CenterContainerBox>{props.children}</CenterContainerBox>
      </MenuContainer>
    </>
  );
};

export default LoggedOut;
