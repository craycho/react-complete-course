import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import { Suspense } from "react";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetail() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}
/* 
<EventItem event={data.event} />
<EventsList events={}/> */

export default EventDetail;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { messsage: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// useParams se ne moze koristiti van react component, ali ga loader funkcija automatski prima
export async function loader({ request, params }) {
  const id = params.eventId;

  // "Requestovi" su ti koji se bundleaju u defer() objekat
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
    /* await keyboard je taj koji cini da defer ceka da se data loada prije nego renderuje 
    page component (<EventItem>). On je "switch" koji odredi da li ce se cekati ili odgoditi (deferati) rezultat. */
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method, // Identicno ko i method: "DELETE"
  });

  if (!response.ok) {
    throw json(
      { messsage: "Could not delete event." },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
}

// return response; u loader() je dostupan pomocu data = useLoaderData();
// Moglo je i samo return fetch("http://localhost:8080/events/" + id); radi automatskog handleanja od strane routera
