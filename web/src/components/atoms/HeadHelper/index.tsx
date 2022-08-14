import Head from 'next/head';

type HeadHelperProps = {
  titleElem: string;
};

const HeadHelper = (props: HeadHelperProps) => {
  return (
    <Head>
      <title>{props.titleElem} | TASKOO</title>
    </Head>
  );
};

export default HeadHelper;
