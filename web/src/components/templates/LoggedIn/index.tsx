import MenuBar from 'components/organisms/MenuBar';

type LoggedInProps = {
  children: React.ReactNode;
};

const LoggedIn = (props: LoggedInProps) => {
  return (
    <>
      <MenuBar>{props.children}</MenuBar>
    </>
  );
};

export default LoggedIn;
