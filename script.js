const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

const intensifiers = [
  "FUCKING",
  "DAMN",
  "GODDAMN",
  "BLOODY",
  "WHOLE-ASS",
  "ABSOLUTE",
  "UNHOLY",
  "STUPID",
  "RIDICULOUS",
  "GLORIOUSLY STUPID",
];

const openers = ["IT'S", "RIGHT NOW IT'S", "CONGRATS, IT'S", "WELCOME TO", "BEHOLD:"];

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

const updateDisplay = () => {
  const now = new Date();
  dateEl.textContent = formatDateLine(now);
  const lines = buildTimeLines(now);
  timeEl.classList.add("fade-out");
  setTimeout(() => {
    renderLines(lines);
    timeEl.classList.remove("fade-out");
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
