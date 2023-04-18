import { Link, useSubmit } from "react-router-dom";

import classes from "./EventItem.module.css";

// { event } je  object destructuring
function EventItem({ event }) {
  // useSubmit nam dopusta da proizvoljno handlaeamo submittanje forma, umjesto da samo automatski user
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
      // submit() poziva action u ovom routeu, tj. deleteEventAction u EventDetail.js
      // Prvi argument je data koji zelimo submit, koji se onda moze get sa .formData()
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
