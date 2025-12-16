const gamesGrid = document.getElementById("gamesGrid");
const modsGrid = document.getElementById("modsGrid");
const gamesCount = document.getElementById("gamesCount");
const modsCount = document.getElementById("modsCount");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

let DATA = { games: [], mods: [] };

function makeCard(item, type) {
  const link = type === "games" ? item.steamUrl : item.curseforgeUrl;
  const linkLabel = type === "games" ? "Open Steam" : "Open CurseForge";

  const meta = type === "games"
    ? [
        item.platform && `<span class="kv">Platform: ${item.platform}</span>`,
        item.players && `<span class="kv">Players: ${item.players}</span>`
      ].filter(Boolean).join("")
    : [
        item.mcVersion && `<span class="kv">MC: ${item.mcVersion}</span>`,
        item.loader && `<span class="kv">Loader: ${item.loader}</span>`
      ].filter(Boolean).join("");

  return `
    <article class="card">
      <img class="thumb" src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
      <div class="card-body">
        <div class="title">
          <h4>${item.name}</h4>
          <span class="tag">${type === "games" ? "GAME" : "MOD"}</span>
        </div>

        <p class="desc">${item.description ?? ""}</p>

        <div class="meta">${meta}</div>

        <div class="actions">
          <a class="btn primary" href="${link}" target="_blank" rel="noreferrer">${linkLabel}</a>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const q = (searchInput.value || "").toLowerCase().trim();
  const mode = filterSelect.value; // all / games / mods

  const games = DATA.games.filter(g => g.name.toLowerCase().includes(q));
  const mods = DATA.mods.filter(m => m.name.toLowerCase().includes(q));

  gamesCount.textContent = `${games.length} item(s)`;
  modsCount.textContent = `${mods.length} item(s)`;

  gamesGrid.innerHTML = (mode === "all" || mode === "games")
    ? games.map(g => makeCard(g, "games")).join("")
    : "";

  modsGrid.innerHTML = (mode === "all" || mode === "mods")
    ? mods.map(m => makeCard(m, "mods")).join("")
    : "";
}

async function init() {
  const res = await fetch("data.json");
  DATA = await res.json();

  searchInput.addEventListener("input", render);
  filterSelect.addEventListener("change", render);

  render();
}

init();


const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

let playing = false;

btn.addEventListener("click", () => {
  if (!playing) {
    music.play();
    btn.textContent = "🔇 Pause Music";
  } else {
    music.pause();
    btn.textContent = "🔊 Play Music";
  }
  playing = !playing;
});


let started = false;

function startMusicAt15() {
  if (started) return;
  started = true;

  // jump to 15 seconds
  music.currentTime = 15;

  music.play();
}

// user interaction is REQUIRED
document.addEventListener("click", startMusicAt15);
