import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import {
  getAllEvents,
  getFeaturedEvents
} from '../../helpers/getDataFromFirebase';

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className='center'>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export const getStaticProps = async ({ params }) => {
  const data = await getAllEvents();
  const event = data.find(elem => elem.id === params.eventId);

  if (!event) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      event
    }
  };
};

export const getStaticPaths = async () => {
  const data = await getFeaturedEvents();

  const ids = data.map(({ id }) => id);

  const paths = ids.map(id => ({
    params: {
      eventId: id
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export default EventDetailPage;
