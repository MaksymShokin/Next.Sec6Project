import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/getDataFromFirebase';
import Head from 'next/head';

function HomePage({ featuredEvents }) {
  if (!featuredEvents) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Next JS</title>
        <meta name='description' content='Super description' />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents
    },
    revalidate: 1800
  };
};

export default HomePage;
