import Head from 'next/head';

type HeadHelperProps = {
  titleElem: string;
};

const HeadHelper = (props: HeadHelperProps) => {
  const editedTitle = `${props.titleElem} | TASKOO`
  return (
    <Head>
      <title>{editedTitle}</title>
      <meta name="description" content={editedTitle} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadHelper;
