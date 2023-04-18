import { useLoaderData, json, defer, Await } from "react-router-dom"; // Omoguci nam pristup return values "najblize" loader funkcije
/* Moze se koristiti u svim sibling/child components u Routeru, ali i components 
koje se koriste unutar njih (npr EventsList.js ovdje), samo ne u higher-level (parents). */

import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EventsPage() {
  /* useLoaderData() bi tehnicki trebao vratiti promise jer je return u async funkciji,
    ali ce react router automatski provjeriti te vratiti resolved value ukoliko returna promise.*/
  /* ALSO: useLoaderData ima built-in support za response objekte, pa nema potrebe
    za const data = await response.json(); return data;*/

  const { events } = useLoaderData(); // I defer se isto koristi ovako, samo se vraca objekat koji sadrzi Promise {events: Promise}
  console.log(events);

  // <Await> ce sacekati da resolve value bude tu, te nakon toga izvrsiti funkciju između tags
  // <Suspense> ce displayati fallback dok ceka da se izvrse events izmedju tagova
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // 1) Returnanje objekta
    // return { isError: true, message: "Could not fetch events." };
    //
    // 2) Manuelno kreiranje responsea sa new keyword
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }, { status: 500 }));
    // NAPOMENA: "throw" keyword ce renderovati najblizi errorElement u routeru
    //
    // 3) Isto 2) ali skraceno. json() kreira response object koji sadrzi data u .json formatu (.stringify())
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json(); // Potrebno manuelno parse jer se ne resolvea automatski kad se koristi defer()
    return resData.events;

    // return response;
    /* Moze i custom response pomocu "new Response" keyword:
      const res = new Response("Any data", { status: 201 });
      return res; */
  }
}

// 1. Da bi koristili defer mora se raditi o Promiseu
// 2. Namjena je da se loada component (ili dio njeg) iako nije resolvean Promise
// 3. U sustini omogucava da loader returna objekat koji sadrzi Promises, a ne samo values
export function loader() {
  // Defer prima objekat u kojem bundleamo sve http requestove na pageu
  return defer({
    events: loadEvents(),
  });
}

/* ----- NACIN BEZ loader() FUNKCIJE -----

 // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch("http://localhost:8080/events");

  //     if (!response.ok) {
  //       setError("Fetching events failed.");
  //     } else {
  //       const resData = await response.json();
  //       setFetchedEvents(resData.events);
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);

   return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

// Pristupanje erroru u useLoaderData():

  // if (data.isError) {
  //   return <p> {data.message}</p>;
  // }
*/
