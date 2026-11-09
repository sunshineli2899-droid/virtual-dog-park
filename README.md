# Virtual Dog Park

A beginner-friendly dog encyclopedia and virtual pet website built for a first-year programming lab. It uses HTML, CSS, and vanilla JavaScript, with no framework, package manager, backend, or external API.

## Features

- An encyclopedia covering Beagle, Golden Retriever, and Poodle, with short size, personality, and care notes.
- Three local SVG images with meaningful alt text, plus a Say hello button for each breed.
- Adoption of one virtual dog with a chosen breed and a name of up to 20 characters. Leading and trailing whitespace is trimmed; blank names are rejected and internal spaces remain.
- Safe display of dog names as text, plus labeled form controls and helpful validation messages.
- Dog details showing name, breed, day, growth stage, and happiness.
- Feed, Play, and Next Day controls, with growth shown through both text and a growth bar.
- Automatic local saving and restoration, and a Start Over button that asks for confirmation.
- Responsive layouts and keyboard focus indicators.

The SVG files in `assets/` are project-created illustrations, not real dog photographs.

## Preview with a local server

1. Open the `virtual-dog-park` folder in VS Code.
2. Install the Live Server extension if it is not already available.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Use the local HTTP address opened by Live Server, for example `http://127.0.0.1:5500/index.html`. The actual port may differ.
5. Keep the server running while using the page. Refresh the same address to check that your dog is restored.

Keep `index.html`, `style.css`, `script.js`, and the `assets/` folder together. JavaScript must be enabled. No package installation or build command is needed for the website itself.

Use the same browser, browser profile, hostname, and port to return to the same save. For example, `localhost` and `127.0.0.1` have separate browser storage. A local HTTP server gives a consistent place to store progress; storage behavior for a directly opened `file://` page can vary between browsers.

## Growth and happiness rules

A newly adopted dog starts on **Day 1**, at the **Puppy** stage, with **50 happiness**.

| Day | Growth stage |
| --- | --- |
| 1 | Puppy |
| 2–3 | Young Dog |
| 4 onward | Adult Dog |

- **Feed:** adds 10 happiness, up to a maximum of 100.
- **Play:** adds 10 happiness, up to a maximum of 100.
- **Next Day:** advances the day by 1 and subtracts 5 happiness, down to a minimum of 0.
- Feed and Play do not change the day. Days advance only when Next Day is clicked; there is no real-time aging.
- The growth bar fills as the dog approaches Day 4 and stays full afterward. The growth stage is also written in text.
- **Start Over:** confirmation deletes the saved dog and returns to the adoption form. Cancel keeps the dog and its progress.

## Where progress is saved

The page stores one dog's **name, breed, day, and happiness** as JSON in browser `localStorage`, using the key `virtualDogParkPetV1`. The growth stage is calculated from the day.

The save updates immediately after adoption and after every Feed, Play, or Next Day action. Opening or refreshing the same site in the same browser profile restores the dog.

Pet progress is stored locally in the browser, **not in a GitHub account**. Pushing the project files to GitHub does not upload or back up the pet. Progress does not automatically follow you to another browser or device, even if the website is hosted on GitHub Pages.

Clearing the site's browser data removes the save. Private browsing may discard it when the private session ends. If storage is blocked or unavailable, the page shows a message and progress may not survive a refresh.

## Manual testing checklist

These checks are for a person to perform in a browser. They are not a claim that browser tests were run during this review.

- [ ] Open the page through Live Server. Check phone and laptop widths for readable text, visible images, and no unwanted horizontal scrolling.
- [ ] Click each breed's Say hello button and check that the greeting matches its breed. Check the navigation and Back to top links.
- [ ] Use Tab to reach the controls and Enter or Space to activate buttons. Check visible focus, field labels, and helpful invalid-name messages.
- [ ] Try an empty name and a spaces-only name: neither should adopt a dog. Try a 20-character name and confirm that typing more characters is limited.
- [ ] Adopt each breed, using Start Over between dogs. Verify the name and breed, Day 1, Puppy, and happiness 50. Check that leading/trailing spaces are removed and spaces inside the name remain.
- [ ] Try a name such as `<b>Buddy</b>` and confirm that the angle brackets appear as text rather than formatting the name.
- [ ] Click Feed and Play separately: each should add 10. Repeat until happiness reaches 100 and confirm that it never exceeds 100.
- [ ] Starting from a new dog, click Next Day: Day 2 should show Young Dog and happiness 45; Day 3, Young Dog and 40; Day 4, Adult Dog and 35. Check the growth bar and stage text. Continue until happiness reaches 0 and confirm that it never becomes negative.
- [ ] Refresh after adoption and after each type of action. Confirm that the name, breed, day, growth stage, and happiness return correctly.
- [ ] Choose Start Over, then Cancel: keep the dog, including after refresh. Choose Start Over again and confirm: show the adoption form, and keep it empty after refresh.
