import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEvent() {
  /*Incoming response data iz loadera je objekat formata: 
  { event: { title: "...", image, description, date, id, }, } 
  pa ga destructureamo*/

  const { event } = useRouteLoaderData("event-detail");
  return <EventForm method="patch" event={event} />;
}

export default EditEvent;
