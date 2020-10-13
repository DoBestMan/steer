import { GetStaticProps } from 'next';

import ContactPage from '~/components/pages/ContactPage/ContactPage';

function Contact() {
  return <ContactPage />;
}

export const getStaticProps: GetStaticProps<Record<
  string,
  unknown
>> = async () => {
  return {
    props: {},
  };
};

export default Contact;
