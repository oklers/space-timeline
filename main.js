
let lang = "ru";

document.getElementById("language-selector").addEventListener("change", function() {
  lang = this.value;
  loadEvents();
});

async function loadEvents() {
  const response = await fetch("events.json");
  const data = await response.json();
  const container = document.getElementById("timeline");
  container.innerHTML = "";

  data.forEach(event => {
    const card = document.createElement("div");
    card.className = "event";
    card.innerHTML = `
      <h2>${event[lang].title}</h2>
      <p>${event[lang].description}</p>
      ${event.media.endsWith('.mp4') ? `<video controls src="${event.media}"></video>` : `<img src="${event.media}" alt="">`}
    `;
    container.appendChild(card);
  });

  startAutoScroll(container);
}

function startAutoScroll(container) {
  let scrollSpeed = 1;
  let scrollPos = 0;

  setInterval(() => {
    scrollPos += scrollSpeed;
    if (scrollPos >= container.scrollWidth - container.clientWidth) {
      scrollPos = 0;
    }
    container.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, 50);
}

document.getElementById("scroll-left").addEventListener("click", () => {
  const container = document.getElementById("timeline");
  container.scrollBy({ left: -300, behavior: "smooth" });
});
document.getElementById("scroll-right").addEventListener("click", () => {
  const container = document.getElementById("timeline");
  container.scrollBy({ left: 300, behavior: "smooth" });
});

loadEvents();
