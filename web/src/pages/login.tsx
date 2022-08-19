import type { NextPage } from 'next';

import CenterContainerBox from 'components/atoms/CenterContainerBox';
import HeadHelper from 'components/atoms/HeadHelper';
import Login from 'components/templates/Login';
import MenuContainer from 'components/templates/MenuContainer';

const LoginPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="LOGIN" />

      <MenuContainer isLoggedIn={false}>
        <CenterContainerBox>
          <Login />
        </CenterContainerBox>
      </MenuContainer>
    </>
  );
};

export default LoginPage;
