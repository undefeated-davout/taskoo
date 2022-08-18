import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="LOGIN"></HeadHelper>
      <LoggedIn>LOGIN</LoggedIn>
    </>
  );
};

export default LoginPage;
