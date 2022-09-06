import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import LoggedOut from 'containers/templates/LoggedOut';
import LoginForm from 'containers/templates/LoginForm';

const LoginPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="LOGIN" />

      <LoggedOut>
        <LoginForm />
      </LoggedOut>
    </>
  );
};

export default LoginPage;
