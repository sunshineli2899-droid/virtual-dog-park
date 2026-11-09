// Each button finds the message inside its own dog card.
// The encyclopedia still works if JavaScript is turned off.
const greetings = {
  "Beagle": "Sniff, sniff! The Beagle says hello.",
  "Golden Retriever": "A happy tail wag from the Golden Retriever!",
  "Poodle": "The Poodle gives you a cheerful paw wave."
};

const buttons = document.querySelectorAll(".greet-button");

buttons.forEach(function (button) {
  button.hidden = false;

  button.addEventListener("click", function () {
    const breed = button.dataset.breed;
    const card = button.closest(".dog-card");
    const message = card.querySelector(".greeting");
    message.textContent = greetings[breed];
  });
});
