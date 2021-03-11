import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../helpers/getDataFromFirebase';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';

function FilteredEventsPage({ events, year, month }) {
  // client side render also possible
  if (events === 'Invalid filters') {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <Head>
        <title>Filters</title>
        <meta name='description' content="Filter events" />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}

export const getServerSideProps = async context => {
  const { params } = context;

  const numYear = +params.slug[0];
  const numMonth = +params.slug[1];
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        events: 'Invalid filters'
      }
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents(numYear, numMonth);

  return {
    props: {
      events: filteredEvents,
      year: numYear,
      month: numMonth
    }
  };
};

export default FilteredEventsPage;
