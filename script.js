/* ============================= */
/*        LAYOUT HELPERS         */
/* ============================= */

const mqMobile = window.matchMedia("(max-width: 600px)");

function sideOffsetPercent() { return mqMobile.matches ? 6 : 10; }
function offerGap() { return mqMobile.matches ? 86 : 78; }
function platformGap() { return mqMobile.matches ? 70 : 64; }

function setStageHeightCentered(el, count, gap, bubbleApprox, extraPad) {
  const contentH = (count - 1) * gap + bubbleApprox;
  const stageH = contentH + extraPad;
  el.style.height = stageH + "px";
  return Math.max(10, Math.floor((stageH - contentH) / 2));
}

/* Safe getters */
const chatStage = document.getElementById("chatStage");
const chat = document.getElementById("chat");
const strategySection = document.getElementById("strategySection");
const strategyChat = document.getElementById("strategyChat");
const platformsSection = document.getElementById("platformsSection");
const platformChat = document.getElementById("platformChat");

/* ============================= */
/*         WHAT CAN I OFFER      */
/* ============================= */

const services = [
  "SOCIAL MEDIA STRATEGY",
  "CONTENT CREATION",
  "COMMUNITY MANAGEMENT",
  "GRAPHIC DESIGN FOR POSTS",
  "CREATION OF REELS / VIDEO CONTENT",
  "SOCIAL MEDIA COPYWRITING",
  "CONTENT PLANNING & SCHEDULING",
  "ANALYTICS & OPTIMIZATION"
];

let offerIndex = 0;
let offerAnimating = false;
let offerTopOffset = 0;

function offerPos(i) {
  const top = offerTopOffset + i * offerGap();
  const off = sideOffsetPercent();
  return (i % 2 === 0) ? { top, left: off } : { top, right: off };
}

function layoutOffer() {
  if (!chat) return;
  offerTopOffset = setStageHeightCentered(chat, services.length, offerGap(), 48, 90);
}

function showTypingOffer(i) {
  const pos = offerPos(i);
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.style.top = pos.top + "px";
  if (pos.left !== undefined) typing.style.left = pos.left + "%";
  if (pos.right !== undefined) typing.style.right = pos.right + "%";
  typing.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  chat.appendChild(typing);

  setTimeout(() => { typing.remove(); createOfferMessage(i); }, 880);
}

function createOfferMessage(i) {
  const pos = offerPos(i);
  const message = document.createElement("div");
  message.className = `message ${pos.left !== undefined ? "left" : "right"}`;
  message.style.top = pos.top + "px";
  if (pos.left !== undefined) message.style.left = pos.left + "%";
  if (pos.right !== undefined) message.style.right = pos.right + "%";
  chat.appendChild(message);
  requestAnimationFrame(() => message.classList.add("animate"));

  const text = services[i];
  let c = 0;
  const iv = setInterval(() => {
    message.textContent += text.charAt(c++);
    if (c >= text.length) {
      clearInterval(iv);
      offerIndex++;
      offerAnimating = false;
    }
  }, 20);
}

if (chatStage && chat) {
  chatStage.addEventListener("click", (e) => {
    e.stopPropagation();
    if (offerAnimating || offerIndex >= services.length) return;
    offerAnimating = true;
    showTypingOffer(offerIndex);
  });
}

/* ============================= */
/*         SOCIAL STRATEGY       */
/*   (FLOW LAYOUT - NO OVERLAP)  */
/* ============================= */

const strategySteps = [
  { title: "BRAND ANALYSIS", icon: "fa-magnifying-glass", body: "Identity, visual language, target audience, pain points & opportunities." },
  { title: "TARGET AUDIENCE", icon: "fa-users", body: "Demographics, psychographics, behavior — clear direction that resonates." },
  { title: "PLATFORM SELECTION", icon: "fa-sitemap", body: "Pick the most effective platforms. Start with 1–2, optimize, then scale." },
  { title: "VISUAL & VERBAL IDENTITY", icon: "fa-pen-nib", body: "Palette, fonts, grid, brand voice, emojis/hashtags/caption style." },
  { title: "CONTENT STRATEGY", icon: "fa-calendar-check", body: "Custom calendar: education, inspiration, reels/trends, promo, BTS, UGC." },
  { title: "GROWTH & COMMUNITY", icon: "fa-handshake", body: "Hashtags, geotags, story engagement, collabs, giveaways, user content." },
  { title: "ANALYTICS & OPTIMIZATION", icon: "fa-chart-pie", body: "Monthly review: reach, engagement, best posts, traffic, conversions." },
  { title: "WHY THIS STRATEGY WORKS", icon: "fa-bolt", body: "Aligned brand + consistent content + optimization = sustainable growth." }
];

let sIndex = 0;
let strategyStarted = false;

function resetStrategy() {
  sIndex = 0;
  strategyStarted = false;
  if (strategyChat) strategyChat.innerHTML = "";
}

function spawnNextStrategy() {
  if (!strategyChat) return;
  if (sIndex >= strategySteps.length) return;

  const step = strategySteps[sIndex];

  const trail = document.createElement("div");
  trail.className = "strategy-trail";
  strategyChat.appendChild(trail);
  setTimeout(() => trail.remove(), 560);

  const bubble = document.createElement("div");
  bubble.className = "strategy-message";
  bubble.innerHTML = `
    <i class="fa-solid ${step.icon}"></i>
    <div>
      <span class="s-title">${step.title}</span>
      <span class="s-body">${step.body}</span>
    </div>
  `;

  strategyChat.appendChild(bubble);
  requestAnimationFrame(() => bubble.classList.add("animate"));

  sIndex++;
  setTimeout(spawnNextStrategy, 420);
}

/* ============================= */
/*            PLATFORMS          */
/* ============================= */

const platforms = [
  { name: "Facebook", icon: "fa-facebook-f" },
  { name: "Instagram", icon: "fa-instagram" },
  { name: "TikTok", icon: "fa-tiktok" },
  { name: "LinkedIn", icon: "fa-linkedin-in" },
  { name: "YouTube", icon: "fa-youtube" },
  { name: "X", icon: "fa-x-twitter" },
  { name: "Pinterest", icon: "fa-pinterest-p" },
  { name: "Snapchat", icon: "fa-snapchat" },
  { name: "Threads", icon: "fa-threads" },
  { name: "WhatsApp", icon: "fa-whatsapp" },
  { name: "Reddit", icon: "fa-reddit-alien" },
  { name: "Telegram", icon: "fa-telegram" },
  { name: "Discord", icon: "fa-discord" }
];

let pIndex = 0;
let platformsStarted = false;
let platformTopOffset = 0;

function platformPos(i) {
  const top = platformTopOffset + i * platformGap();
  const off = sideOffsetPercent();
  return (i % 2 === 0) ? { top, left: off } : { top, right: off };
}

function layoutPlatforms() {
  if (!platformChat) return;
  platformTopOffset = setStageHeightCentered(
    platformChat,
    platforms.length,
    platformGap(),
    mqMobile.matches ? 60 : 52,
    mqMobile.matches ? 130 : 110
  );
}

function spawnNextPlatform() {
  if (!platformChat) return;
  if (pIndex >= platforms.length) return;

  const data = platforms[pIndex];
  const pos = platformPos(pIndex);

  const bubble = document.createElement("div");
  bubble.className = `platform-message ${pos.left !== undefined ? "left" : "right"}`;
  bubble.style.top = pos.top + "px";
  if (pos.left !== undefined) bubble.style.left = pos.left + "%";
  if (pos.right !== undefined) bubble.style.right = pos.right + "%";

  bubble.innerHTML = `
    <i class="fa-brands ${data.icon}"></i>
    <span>${data.name.toUpperCase()}</span>
  `;

  platformChat.appendChild(bubble);
  requestAnimationFrame(() => bubble.classList.add("animate"));

  pIndex++;
  setTimeout(spawnNextPlatform, 240);
}

/* ============================= */
/*      SCROLL + VISIBILITY      */
/* ============================= */

const scrollElements = document.querySelectorAll(".scroll-appear");
const aboutSlides = document.querySelectorAll(".about-slide");

function handleScroll() {
  const trigger = window.innerHeight - 120;

  scrollElements.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add("visible");
  });

  aboutSlides.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 140) el.classList.add("visible");
  });

  if (!strategyStarted && strategySection && strategySection.getBoundingClientRect().top < trigger) {
    strategyStarted = true;
    spawnNextStrategy();
  }

  if (!platformsStarted && platformsSection && platformsSection.getBoundingClientRect().top < trigger) {
    platformsStarted = true;
    spawnNextPlatform();
  }
}

function relayoutAll() {
  layoutOffer();
  layoutPlatforms();
  // Strategy is flow-layout now; no stage height calc needed.
}

document.addEventListener("DOMContentLoaded", () => {
  relayoutAll();
  handleScroll();
});

window.addEventListener("scroll", handleScroll);

window.addEventListener("resize", () => {
  // reset generated items so nothing stacks
  resetStrategy();
  if (platformChat) platformChat.innerHTML = "";
  pIndex = 0;
  platformsStarted = false;

  relayoutAll();
});
