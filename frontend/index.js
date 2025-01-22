function updateTripBookingEventListener() {
  const buttons = document.querySelectorAll(".book");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripId: button.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("Trip added to your cart");
          } else {
            console.log(data.error);
          }
        });
    });
  });
}

document.querySelector("#search").addEventListener("click", () => {
  const date = document.querySelector("#start");
  const departure = document.querySelector("#departure");
  const arrival = document.querySelector("#arrival");
  fetch(
    "http://localhost:3000/search/" +
      departure.value +
      "/" +
      arrival.value +
      "/" +
      date.value
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.result) {
        const boxRes = document.querySelector("#box-res");
        boxRes.innerHTML = "";
        for (const trip of data.trips) {
          boxRes.innerHTML += `
                        <div class="trip">
                            <span>${trip.departure} > ${trip.arrival}</span> 
                              <span>${moment(trip.date).format(
                                "HH:mm"
                              )}</span>  
                              <span class="price">${trip.price}€</span>
                              <button class="book" id="${
                                trip._id
                              }">Book</button>
                          </div>
                      `;
        }
        document.querySelector("#box-res").style.justifyContent = "flex-start";
        updateTripBookingEventListener();
      } else {
        document.querySelector("#box-res").innerHTML = `
					<img id="results-logo" src="images/notfound.png"/>
					<div class="divider green"></div>
					<span>No trip found.</span>
				`;
      }
    });
});
