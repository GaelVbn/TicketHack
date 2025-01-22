document.querySelector("#title").addEventListener("click", () => {
  window.location.href = "index.html";
});

fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      document.querySelector("#cart2").style.display = "flex";
      document.querySelector("#cart").innerHTML = "<h4>My cart</h4>";

      // Update cart list
      for (const { trip } of data.bookings) {
        document.querySelector("#cart").innerHTML += `
					<div class="selected-trip">
						${trip.departure} > ${trip.arrival} <span>${moment(trip.date).format(
          "HH:mm"
        )}</span><span class="price">${trip.price}€</span>
						<button class="delete" id="${trip._id}">X</button>
					</div>
				`;
      }

      // Update total
      document.querySelector("#total").textContent = data.bookings.reduce(
        (acc, { trip }) => acc + trip.price,
        0
      );

      updateRemoveFromCartEventListener();
    } else {
      document.querySelector("#cart2").style.display = "none";
    }
  });

// delete booking
function updateRemoveFromCartEventListener() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      fetch(`http://localhost:3000/cart/${button.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            location.reload();
          } else {
            console.log(data.error);
          }
        });
    });
  });
}
