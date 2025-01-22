fetch("https://ticket-hack-backend-flax.vercel.app/bookings")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      document.querySelector("#trips").innerHTML = "<h4>My bookings</h4>";
      // Update trip list
      for (const { trip } of data.bookings) {
        document.querySelector("#trips2").innerHTML += `
        <div class="booked-trip">
        <span>${trip.departure} > ${trip.arrival}</span>
        <span>${moment(trip.date).format("HH:mm")}</span>
        <span>${trip.price}€</span>
        <span class="departure">Departure ${moment(trip.date).fromNow()}</span>
    </div>
                `;
      }

      document.querySelector("#trips2").style.display = "flex";
      document.querySelector("#trips2").innerHTML += `
				<div id="divider"></div>
				<h5>Enjoy your travels with Tickethack!</h5>
			`;
    } else {
      document.querySelector("#trips2").innerHTML = "<p>No booking yet.</p>";
    }
  });
