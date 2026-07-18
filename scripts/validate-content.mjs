import { psalmBriefs, REQUIRED_CARD_TITLES, validatePsalmBriefs } from "../psalmBriefs.js";

const errors = validatePsalmBriefs();
const keys = Object.keys(psalmBriefs).map(Number).sort((left, right) => left - right);

if (keys.length !== 150) errors.push(`Expected 150 Psalm states; found ${keys.length}.`);
for (let psalm = 1; psalm <= 150; psalm += 1) {
  if (keys[psalm - 1] !== psalm) errors.push(`Psalm state ${psalm} is missing or out of order.`);
  const cards = psalmBriefs[psalm]?.cards;
  if (!Array.isArray(cards)) continue;
  for (const card of cards) {
    const content = String(card.content || "").trim();
    if (!content) errors.push(`Psalm ${psalm} ${card.title || "untitled card"} is empty.`);
  }
}

if (errors.length) {
  console.error("Psalm content validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Psalm content validation passed: 150 states, ${REQUIRED_CARD_TITLES.length} required cards per state.`,
);
