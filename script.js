const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");
const fullscreenButton = document.getElementById("fullscreen-toggle");
const awakeStatus = document.getElementById("awake-status");

const nosleepVideoSource =
  "data:video/mp4;base64,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";

const intensifiers = [
  "FUCKING",
  "HELLA",
  "DAMN",
  "WHOLE-ASS",
  "STUPID",
  "FREAKIN'",
  "CRAZY",
  "WILD",
  "",
  "",
  "",
  "",
];

const openers = ["IT'S", "RIGHT NOW IT'S", "CONGRATS, IT'S", "LOOKS LIKE IT'S", "IT IS", "CURRENTLY IT'S", "GUESS WHAT, IT'S", "HEY, IT'S", "SURPRISE, IT'S", "WOW, IT'S", "CHECK IT OUT, IT'S"];

const oclockTemplates = [
  "IT'S {INTENSIFIER} {HOUR} O'CLOCK",
  "IT'S {INTENSIFIER} {HOUR} ON THE DOT",
  "IT'S {INTENSIFIER} {HOUR} O'CLOCK, APPARENTLY",
];

const exactTemplates = [
  "IT'S {INTENSIFIER} {HOUR} {MINUTE}",
  "IT'S {INTENSIFIER} {HOUR} OH {MINUTE}",
  "IT'S {INTENSIFIER} {HOUR} {MINUTE} ON THE DOT",
];

const spokenMinutePhrase = (minute) => {
  const mapping = {
    5: { phrase: "FIVE", direction: "PAST" },
    10: { phrase: "TEN", direction: "PAST" },
    15: { phrase: "QUARTER", direction: "PAST" },
    20: { phrase: "TWENTY", direction: "PAST" },
    25: { phrase: "TWENTY-FIVE", direction: "PAST" },
    30: { phrase: "HALF", direction: "PAST" },
    35: { phrase: "TWENTY-FIVE", direction: "TO" },
    40: { phrase: "TWENTY", direction: "TO" },
    45: { phrase: "QUARTER", direction: "TO" },
    50: { phrase: "TEN", direction: "TO" },
    55: { phrase: "FIVE", direction: "TO" },
  };
  return mapping[minute] || null;
};

const dayNames = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const neutralToken = (text) => ({ text, role: "neutral" });
const hourToken = (text) => ({ text, role: "hour" });
const minuteToken = (text) => ({ text, role: "minute" });

const mulberry32 = (seed) => {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const seedFromString = (value) => {
  let seed = 0;
  for (let i = 0; i < value.length; i += 1) {
    seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
  }
  return seed;
};

const pick = (rand, list) => list[Math.floor(rand() * list.length)];

const animationClasses = [
  "anim-flicker",
  "anim-split-lines",
  "anim-sling-lines",
  "anim-zoom-in",
  "anim-zoom-out",
  "anim-explode",
];

const formatOrdinal = (day) => {
  if ([11, 12, 13].includes(day % 100)) {
    return `${day}th`;
  }
  const mod = day % 10;
  if (mod === 1) return `${day}st`;
  if (mod === 2) return `${day}nd`;
  if (mod === 3) return `${day}rd`;
  return `${day}th`;
};

const formatDateLine = (date) => {
  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const dayOrdinal = formatOrdinal(date.getDate()).toUpperCase();
  return `${dayName} ${dayOrdinal} ${monthName}`;
};

const hour12 = (hour) => (hour % 12 === 0 ? 12 : hour % 12);

const hourToWords = (hour, minute, rand) => {
  if (hour === 0 && minute === 0 && rand() < 0.4) {
    return "MIDNIGHT";
  }
  if (hour === 12 && minute === 0 && rand() < 0.4) {
    return "NOON";
  }
  return numberToWords(hour12(hour));
};

const numberToWords = (number) => {
  const ones = [
    "ZERO",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
  ];
  const teens = [
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
  ];
  const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY"];

  if (number < 10) return ones[number];
  if (number < 20) return teens[number - 10];
  const ten = Math.floor(number / 10);
  const one = number % 10;
  if (one === 0) return tens[ten];
  return `${tens[ten]}-${ones[one]}`;
};

const splitHyphenated = (word, role) => {
  if (!word.includes("-")) {
    return [[tokenByRole(role, word)]];
  }
  const [first, second] = word.split("-");
  return [
    [tokenByRole(role, `${first}-`)],
    [tokenByRole(role, second)],
  ];
};

const tokenByRole = (role, text) => {
  if (role === "hour") return hourToken(text);
  if (role === "minute") return minuteToken(text);
  return neutralToken(text);
};

const buildExactPhrase = (rand, hourWord, minute) => {
  const lines = [];
  const opener = pick(rand, openers);
  const intensifier = pick(rand, intensifiers);
  const openerTokens = opener
    .split(" ")
    .map((word) => neutralToken(word));
  lines.push([...openerTokens, neutralToken(intensifier)]);

  lines.push([hourToken(hourWord)]);

  if (minute === 0) {
    const template = pick(rand, oclockTemplates);
    if (template.includes("ON THE DOT")) {
      lines.push([neutralToken("ON"), neutralToken("THE"), neutralToken("DOT")]);
    } else if (template.includes("APPARENTLY")) {
      lines.push([neutralToken("O'CLOCK"), neutralToken("APPARENTLY")]);
    } else {
      lines.push([neutralToken("O'CLOCK")]);
    }
    return lines;
  }

  const minuteWord = numberToWords(minute);
  if (minute < 10 && rand() < 0.6) {
    lines.push([neutralToken("OH")]);
  }
  splitHyphenated(minuteWord, "minute").forEach((line) => {
    lines.push(line);
  });

  return lines;
};

const buildPastToPhrase = (rand, hourWord, nextHourWord, spokenPhrase) => {
  const lines = [];
  const opener = pick(rand, openers);
  const intensifier = pick(rand, intensifiers);
  const openerTokens = opener
    .split(" ")
    .map((word) => neutralToken(word));
  lines.push([...openerTokens, neutralToken(intensifier)]);

  const { phrase, direction } = spokenPhrase;
  const pastToWord = direction;
  const hourTokenWord = direction === "TO" ? nextHourWord : hourWord;

  const minuteLines = splitHyphenated(phrase, "minute");
  minuteLines.forEach((line) => lines.push(line));

  const hourLineVariant = rand() < 0.4;
  if (hourLineVariant) {
    lines.push([neutralToken(pastToWord)]);
    lines.push([hourToken(hourTokenWord)]);
  } else {
    lines.push([neutralToken(pastToWord), hourToken(hourTokenWord)]);
  }

  return lines;
};

const buildOclockPhrase = (rand, hourWord) => {
  const opener = pick(rand, openers);
  const intensifier = pick(rand, intensifiers);
  const lines = [];
  const openerTokens = opener
    .split(" ")
    .map((word) => neutralToken(word));
  lines.push([...openerTokens, neutralToken(intensifier)]);
  lines.push([hourToken(hourWord)]);

  const template = pick(rand, oclockTemplates);
  if (template.includes("ON THE DOT")) {
    lines.push([neutralToken("ON"), neutralToken("THE"), neutralToken("DOT")]);
  } else if (template.includes("APPARENTLY")) {
    lines.push([neutralToken("O'CLOCK"), neutralToken("APPARENTLY")]);
  } else {
    lines.push([neutralToken("O'CLOCK")]);
  }

  return lines;
};

const buildTimeLines = (date) => {
  const minute = date.getMinutes();
  const hour = date.getHours();
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${hour}-${minute}`;
  const rand = mulberry32(seedFromString(key));

  const hourWord = hourToWords(hour, minute, rand);
  const spokenHourWord = numberToWords(hour12(hour));
  const spokenNextHourWord = numberToWords(hour12((hour + 1) % 24));
  const spokenPhrase = spokenMinutePhrase(minute);

  if (minute === 0) {
    return buildOclockPhrase(rand, hourWord);
  }
  if (spokenPhrase) {
    return buildPastToPhrase(rand, spokenHourWord, spokenNextHourWord, spokenPhrase);
  }

  return buildExactPhrase(rand, hourWord, minute);
};

const renderLines = (lines) => {
  timeEl.innerHTML = "";
  lines.forEach((line, index) => {
    const lineEl = document.createElement("div");
    lineEl.className = "time-line";
    if (index === 0) {
      lineEl.classList.add("time-line--lead");
    }
    line.forEach((token) => {
      const span = document.createElement("span");
      span.className = "time-token";
      if (token.role === "hour") span.classList.add("t-hour");
      if (token.role === "minute") span.classList.add("t-minute");
      span.textContent = token.text;
      lineEl.appendChild(span);
    });
    timeEl.appendChild(lineEl);
  });
};

const pickAnimationClass = (key) => {
  const rand = mulberry32(seedFromString(`${key}-anim`));
  return pick(rand, animationClasses);
};

const resetAnimations = () => {
  timeEl.classList.remove("fade-out", ...animationClasses);
};

const applyAnimation = (className) => {
  resetAnimations();
  void timeEl.offsetWidth;
  timeEl.classList.add(className);
};

let wakeLock = null;
let fallbackVideo = null;

const setAwakeStatus = (state) => {
  awakeStatus.textContent = `AWAKE: ${state}`;
};

const isWakeLockSupported = () =>
  "wakeLock" in navigator &&
  navigator.wakeLock &&
  typeof navigator.wakeLock.request === "function";

const updateFullscreenButton = () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenButton.textContent = isFullscreen ? "×" : "⤢";
  fullscreenButton.classList.toggle("is-exit", isFullscreen);
  fullscreenButton.setAttribute(
    "aria-label",
    isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
  );
};

const releaseWakeLock = async () => {
  if (!wakeLock) return;
  try {
    await wakeLock.release();
  } catch (error) {
    console.warn("Failed to release wake lock:", error);
  } finally {
    wakeLock = null;
  }
};

const ensureFallbackVideo = () => {
  if (fallbackVideo) return fallbackVideo;
  const video = document.createElement("video");
  video.className = "nosleep-video";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("muted", "");
  video.muted = true;
  video.loop = true;
  video.src = nosleepVideoSource;
  document.body.appendChild(video);
  fallbackVideo = video;
  return video;
};

const requestFallbackWakeLock = async () => {
  const video = ensureFallbackVideo();
  try {
    await video.play();
    setAwakeStatus("ON");
    return true;
  } catch (error) {
    console.warn("Failed to play wake video:", error);
    setAwakeStatus("OFF");
    return false;
  }
};

const releaseFallbackWakeLock = () => {
  if (!fallbackVideo) return;
  try {
    fallbackVideo.pause();
    fallbackVideo.currentTime = 0;
  } catch (error) {
    console.warn("Failed to stop wake video:", error);
  }
};

const requestWakeLock = async () => {
  if (!isWakeLockSupported()) {
    const fallbackActive = await requestFallbackWakeLock();
    if (!fallbackActive) {
      setAwakeStatus("UNSUPPORTED");
    }
    return;
  }
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    setAwakeStatus("ON");
  } catch (error) {
    console.warn("Failed to acquire wake lock:", error);
    const fallbackActive = await requestFallbackWakeLock();
    if (!fallbackActive) {
      setAwakeStatus("OFF");
    }
  }
};

const stopWakeLock = async () => {
  await releaseWakeLock();
  releaseFallbackWakeLock();
};

const updateDisplay = () => {
  const now = new Date();
  dateEl.textContent = formatDateLine(now);
  const lines = buildTimeLines(now);
  const minuteKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
  const animationClass = pickAnimationClass(minuteKey);
  timeEl.classList.add("fade-out");
  setTimeout(() => {
    renderLines(lines);
    timeEl.classList.remove("fade-out");
    applyAnimation(animationClass);
  }, 160);
};

let lastMinuteKey = null;
const tick = () => {
  const now = new Date();
  const minuteKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
  if (minuteKey !== lastMinuteKey) {
    lastMinuteKey = minuteKey;
    updateDisplay();
  }
};

updateDisplay();
setInterval(tick, 1000);

fullscreenButton.addEventListener("click", async () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  if (!isFullscreen) {
    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      console.warn("Failed to enter fullscreen:", error);
      return;
    }
    await requestWakeLock();
    updateFullscreenButton();
    return;
  }

  await stopWakeLock();
  try {
    await document.exitFullscreen();
  } catch (error) {
    console.warn("Failed to exit fullscreen:", error);
  }
  setAwakeStatus("OFF");
  updateFullscreenButton();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && document.fullscreenElement) {
    requestWakeLock();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    stopWakeLock();
    setAwakeStatus("OFF");
  }
  updateFullscreenButton();
});

updateFullscreenButton();
