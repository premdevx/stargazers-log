const list = document.querySelector("#starred");
const status = document.querySelector("#status");

if (!list || !status) {
  console.error("Required page elements were not found.");
} else {
  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((events) => {
      if (!Array.isArray(events)) {
        throw new TypeError("Expected an array of events.");
      }

      list.replaceChildren();

      if (events.length === 0) {
        status.textContent = "No starred repositories were found.";
        return;
      }

      events.forEach((event) => {
        const item = document.createElement("li");
        const name = typeof event?.name === "string" ? event.name : "Unknown repository";
        const starred = typeof event?.starred === "string" ? event.starred : "unknown date";
        item.textContent = `${name} — starred ${starred}`;
        list.appendChild(item);
      });

      status.textContent = `Loaded ${events.length} starred repositories.`;
    })
    .catch((error) => {
      console.error("Unable to load starred repositories:", error);
      status.textContent = "Unable to load starred repositories right now.";
    });
}
