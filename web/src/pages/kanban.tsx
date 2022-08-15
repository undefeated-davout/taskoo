import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const Kanban: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="KANBAN"></HeadHelper>
      <LoggedIn>
        <p>KANBAN</p>
      </LoggedIn>
    </>
  );
};

export default Kanban;
