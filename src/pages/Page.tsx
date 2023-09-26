import { Helmet } from 'react-helmet-async';

const Page = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <>
      <Helmet>
        <title>{title} | PM</title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;
