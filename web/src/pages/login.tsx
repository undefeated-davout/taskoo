import type { NextPage } from 'next';

import CenterContainerBox from 'components/atoms/CenterContainerBox';
import HeadHelper from 'components/atoms/HeadHelper';
import Login from 'components/templates/Login';
import MenuContainer from 'components/templates/MenuContainer';

const LoginPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="LOGIN"></HeadHelper>

      <MenuContainer isLoggedIn={false}>
        <CenterContainerBox>
          <Login></Login>
        </CenterContainerBox>
      </MenuContainer>
    </>
  );
};

export default LoginPage;
