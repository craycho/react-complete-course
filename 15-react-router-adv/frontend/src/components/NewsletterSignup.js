import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();
  // Koristi se kada zelimo triggerovati action/loader drugog pagea, bez da loadamo taj page
  const { data, state } = fetcher;

  // state = u kojem je stanju executiona action/loader
  // data = data koji returna action/loader (action() u Newsletter.js)
  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  /* Ne mozemo koristiti samo <Form action="..."> jer ce izvrsiti transition na
   drugi page, tj. loadat ce component drugog routea, koji sadrzi sam action
   (Newsletter.js) pa je neophodno fetcher. */
  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
