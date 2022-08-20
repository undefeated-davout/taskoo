import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';
import TodaysTasks from 'components/templates/TodaysTasks';

const TodayPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="TODAY'S TASKS" />
      <MenuContainer isLoggedIn={true}>
        <TodaysTasks />
      </MenuContainer>
    </>
  );
};

export default TodayPage;
