export const getAllEvents = () => {
  return fetch('https://next-backend-default-rtdb.firebaseio.com/events.json')
    .then(data => data.json())
    .then(data => {
      const transformedData = [];

      for (const key in data) {
        transformedData.push(data[key]);
      }

      return transformedData;
    });
};

export const getFeaturedEvents = () => {
  return fetch('https://next-backend-default-rtdb.firebaseio.com/events.json')
    .then(data => data.json())
    .then(data => {
      const transformedData = [];

      for (const key in data) {
        if (data[key]['isFeatured']) {
          transformedData.push({ id: key, ...data[key] });
        }
      }
      return transformedData;
    });
};

export const getFilteredEvents = async (year, month) => {
  const events = await getAllEvents();

  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
