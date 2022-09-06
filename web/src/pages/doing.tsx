import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import DoingTasks from 'containers/templates/DoingTasks';
import MenuContainer from 'containers/templates/MenuContainer';

const DoingPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="DOING" />
      <MenuContainer isLoggedIn={true}>
        <DoingTasks />
      </MenuContainer>
    </>
  );
};

export default DoingPage;
