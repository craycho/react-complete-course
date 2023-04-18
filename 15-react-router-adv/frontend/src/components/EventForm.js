import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

// Destructurea props objekat (props.method i props.event)
function EventForm({ method, event }) {
  const data = useActionData(); // returnani response sadrzi {message: "..." i errors: {}}
  const navigate = useNavigate(); // Navigatea nas u drugi route (npr. navigate("events"))
  const navigation = useNavigation(); // Omoguci pristup navigation objektu radi npr. provjere statea

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  // <Form> elementi automatski triggeruju actions trenutnog routea
  // Moze i <Form action ="other-path"> da se triggeruje action drugog routea
  return (
    <Form method={method} className={classes.form}>
      {/* Ako je returned data i u njemu ima errors objekat, mapat ce ga i outputati */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// <Form method="post"> i dr. automatski forwarduju sav data u action
// action automatski prima {request, params}, a request.formData() sadrzi sve forwardovano
export async function action({ request, params }) {
  // request je objekat sa mnogo properties i metoda u [[Prototype]], .method i .formData() su samo neke od njih
  const method = request.method;
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  // Po dokumentaciji moze i const data = Object.fromEntries(await request.formData());

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
    // responseovi returnani iz actiona se mogu koristiti u dr. components sa useActionData();
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  } else {
    return redirect("/events"); // Takodjer kreira response objekat
  }
}

/* FLOW:
1.) return <EventForm method="post" />; proslijedi method prop u EventForm component
2.) <Form method={method} > proslijedi tu metodu najblizem actionu, tj. actionu u ovom fileu
3.) function action({ request, params }) automatski prima request i params, a request
je taj koji sadrzi proslijedjeni "method" property, dok se podaci iz <Form> getaju
pomocu const data = await request.formData();
*/
