import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const Login: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="LOGIN"></HeadHelper>
      <LoggedIn>LOGIN</LoggedIn>
    </>
  );
};

export default Login;
