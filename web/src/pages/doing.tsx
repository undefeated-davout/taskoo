import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import DoingTasks from 'components/templates/DoingTasks';
import MenuContainer from 'components/templates/MenuContainer';

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
