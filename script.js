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

// Keep the adopted dog's information in one object while the page is open.
let virtualDog = null;
const adoptionForm = document.querySelector("#adoption-form");
const breedInput = document.querySelector("#dog-breed");
const nameInput = document.querySelector("#dog-name");
const nameError = document.querySelector("#name-error");
const dogCard = document.querySelector("#virtual-dog-card");
const dogStatus = document.querySelector("#dog-status");
const feedButton = document.querySelector("#feed-button");
const playButton = document.querySelector("#play-button");

// Validate the trimmed name before creating a new dog.
function adoptDog(event) {
  event.preventDefault();
  const name = nameInput.value.trim();

  if (name.length === 0 || name.length > 20) {
    nameError.textContent = "Please enter a name with 1–20 characters, not just spaces.";
    nameInput.setAttribute("aria-invalid", "true");
    nameInput.focus();
    return;
  }

  nameError.textContent = "";
  nameInput.removeAttribute("aria-invalid");
  nameInput.value = name;
  virtualDog = {
    name: name,
    breed: breedInput.value,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  renderDog();
  dogStatus.textContent = name + " has joined your park!";
}

// Show the current values. textContent treats names as text, never as HTML.
function renderDog() {
  document.querySelector("#adopted-dog-name").textContent = virtualDog.name;
  document.querySelector("#adopted-dog-breed").textContent = virtualDog.breed;
  document.querySelector("#dog-day").textContent = virtualDog.day;
  document.querySelector("#dog-stage").textContent = virtualDog.stage;
  document.querySelector("#dog-happiness").textContent = virtualDog.happiness;
  dogCard.hidden = false;
  feedButton.disabled = false;
  playButton.disabled = false;
}

// Both care buttons add 10; Math.min keeps the result at or below 100.
function increaseHappiness() {
  if (virtualDog === null) {
    return;
  }

  virtualDog.happiness = Math.min(100, virtualDog.happiness + 10);
  renderDog();
  dogStatus.textContent = virtualDog.name + "'s happiness is " + virtualDog.happiness + " out of 100.";
}

adoptionForm.addEventListener("submit", adoptDog);
feedButton.addEventListener("click", increaseHappiness);
playButton.addEventListener("click", increaseHappiness);
