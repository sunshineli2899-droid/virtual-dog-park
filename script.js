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

// One storage key holds one dog's name, breed, day, and happiness.
const storageKey = "virtualDogParkPetV1";
let virtualDog = null;
const adoptionForm = document.querySelector("#adoption-form");
const breedInput = document.querySelector("#dog-breed");
const nameInput = document.querySelector("#dog-name");
const nameError = document.querySelector("#name-error");
const dogCard = document.querySelector("#virtual-dog-card");
const dogStatus = document.querySelector("#dog-status");
const feedButton = document.querySelector("#feed-button");
const playButton = document.querySelector("#play-button");
const nextDayButton = document.querySelector("#next-day-button");
const startOverButton = document.querySelector("#start-over-button");
const storageMessage = document.querySelector("#storage-message");

// Validate the trimmed name before creating a new dog.
function adoptDog(event) {
  event.preventDefault();
  if (virtualDog !== null) {
    return;
  }
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
    happiness: 50
  };

  renderDog();
  saveDog();
  dogStatus.textContent = name + " has joined your park!";
}

// The stage always comes from the day, so it cannot become out of date.
function getGrowthStage(day) {
  if (day === 1) {
    return "Puppy";
  }
  if (day <= 3) {
    return "Young Dog";
  }
  return "Adult Dog";
}

// Show the current values. textContent treats names as text, never as HTML.
function renderDog() {
  const stage = getGrowthStage(virtualDog.day);
  document.querySelector("#adopted-dog-name").textContent = virtualDog.name;
  document.querySelector("#adopted-dog-breed").textContent = virtualDog.breed;
  document.querySelector("#dog-day").textContent = virtualDog.day;
  document.querySelector("#dog-stage").textContent = stage;
  document.querySelector("#dog-happiness").textContent = virtualDog.happiness;
  const growthBar = document.querySelector("#dog-growth");
  growthBar.value = Math.min(4, virtualDog.day);
  growthBar.setAttribute("aria-valuetext", stage + ", Day " + virtualDog.day);
  adoptionForm.hidden = true;
  dogCard.hidden = false;
  feedButton.disabled = false;
  playButton.disabled = false;
  nextDayButton.disabled = false;
}

// Both care buttons add 10; Math.min keeps the result at or below 100.
function increaseHappiness() {
  if (virtualDog === null) {
    return;
  }

  virtualDog.happiness = Math.min(100, virtualDog.happiness + 10);
  renderDog();
  saveDog();
  dogStatus.textContent = virtualDog.name + "'s happiness is " + virtualDog.happiness + " out of 100.";
}

// One click advances one day. Happiness cannot go below zero.
function nextDay() {
  if (virtualDog === null) {
    return;
  }

  virtualDog.day += 1;
  virtualDog.happiness = Math.max(0, virtualDog.happiness - 5);
  renderDog();
  saveDog();
  dogStatus.textContent = "Day " + virtualDog.day + ": " + virtualDog.name + " is a " + getGrowthStage(virtualDog.day) + ". Happiness: " + virtualDog.happiness + " out of 100.";
}

// JSON turns the object into text that localStorage can keep between visits.
function saveDog() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(virtualDog));
    storageMessage.textContent = "";
  } catch (error) {
    storageMessage.textContent = "Your browser could not save your dog. You can keep playing, but this progress may be lost when you refresh.";
  }
}

// Check saved values before using them. The stage is calculated, not stored.
function restoreDog() {
  try {
    const savedText = localStorage.getItem(storageKey);
    if (savedText === null) {
      return;
    }

    const savedDog = JSON.parse(savedText);
    const breeds = ["Beagle", "Golden Retriever", "Poodle"];
    if (savedDog === null || typeof savedDog !== "object" ||
        typeof savedDog.name !== "string" || savedDog.name.trim().length === 0 ||
        savedDog.name.trim().length > 20 || !breeds.includes(savedDog.breed) ||
        !Number.isSafeInteger(savedDog.day) || savedDog.day < 1 ||
        !Number.isInteger(savedDog.happiness) || savedDog.happiness < 0 || savedDog.happiness > 100) {
      storageMessage.textContent = "The saved dog has invalid details. Adopt a dog to begin a new save.";
      return;
    }

    virtualDog = {
      name: savedDog.name.trim(),
      breed: savedDog.breed,
      day: savedDog.day,
      happiness: savedDog.happiness
    };
    renderDog();
    dogStatus.textContent = "Welcome back, " + virtualDog.name + "!";
  } catch (error) {
    storageMessage.textContent = "Your saved dog could not be loaded. You can adopt a dog, but browser storage must be available to keep progress.";
  }
}

// Only remove the saved dog after the visitor confirms.
function startOver() {
  if (virtualDog === null || !window.confirm("Start over? This will delete your saved dog and all their progress.")) {
    return;
  }

  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    storageMessage.textContent = "Your browser could not delete the saved dog. Your current dog has been kept; please try again.";
    return;
  }

  virtualDog = null;
  dogCard.hidden = true;
  adoptionForm.hidden = false;
  adoptionForm.reset();
  nameError.textContent = "";
  nameInput.removeAttribute("aria-invalid");
  storageMessage.textContent = "";
  feedButton.disabled = true;
  playButton.disabled = true;
  nextDayButton.disabled = true;
  dogStatus.textContent = "Progress cleared. You can adopt a new dog.";
  nameInput.focus();
}

adoptionForm.addEventListener("submit", adoptDog);
feedButton.addEventListener("click", increaseHappiness);
playButton.addEventListener("click", increaseHappiness);
nextDayButton.addEventListener("click", nextDay);
startOverButton.addEventListener("click", startOver);

restoreDog();
