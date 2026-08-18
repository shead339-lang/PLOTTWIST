/**
 * Helper to sanitize internal IDs and tag keys into clean, human-readable cinematic text
 */

const ID_MAP: Record<string, string> = {
  // Alarms / Mornings
  get_up: "Getting up immediately like a cyborg",
  snooze_once: "Snoozing once like a normal mortal",
  snooze_17: "Snoozing 17 times in denial",
  wake_11: "Turning off the alarm and waking up at 11:00 AM",
  blame_alarm: "Blaming the innocent alarm clock",

  // Footsteps / 2 AM
  turn_around: "Turning around like an untrained action hero",
  walk_faster: "Walking faster while pretending nothing happened",
  call_friend: "Calling a friend in fake military panic",
  sprint: "Sprinting full speed without looking back",
  accept_fate: "Accepting that this is how your movie ends",

  // Windfall
  invest: "Investing in safe index funds",
  spend_72: "Spending all ₹10 Lakh in 72 hours",
  buy_weird: "Buying a life-sized golden dragon statue",
  tell_nobody: "Hiding cash under the mattress",
  bribe_villain: "Bribing the Dark Lord with a wire transfer",

  // Problem solving
  plan: "Making a 47-step color-coded spreadsheet",
  ignore: "Ignoring the crisis completely and hoping it leaves",
  coffee: "Drinking 4 cups of coffee in pure panic",
  hope_universe: "Trusting the universe to miraculously fix everything",
  make_worse: "Making the situation significantly worse",

  // Weaknesses
  procrastination: "“I'll deal with it tomorrow.”",
  overthinking: "Overthinking simple lunch decisions",
  too_trusting: "Trusting people with obvious red flags",
  phone_battery: "Phone battery hitting 3%",
  unearned_confidence: "Completely unearned supreme confidence",
  i_am_the_problem: "Their own terrible life decisions",

  // Weapons / Relics
  sword: "The Legendary Enchanted Sword",
  chair: "The Chair of Destiny",
  coffee_mug: "The Emergency Coffee of Power",
  common_sense: "Fragile Common Sense",
  almost_dead_phone: "An Almost-Dead Phone (3% Battery)",

  // Companions
  dragon: "Ember the Gold-Eating Dragon",
  talking_cat: "Professor Whiskers the Judging Cat",
  tiny_goblin: "Tiny Angry Goblin (3 Feet of Fury)",
  sarcastic_robot: "ARLO-7 the Sarcastic AI",
  best_friend: "Loyal Best Friend Accomplice",

  // Crush texts
  overthink: "Overthinking comma placement for 6 hours",
  send_memes: "Sending 47 unhinged memes",
  airplane_mode: "Throwing the phone into a river on Airplane Mode",
  confess_crimes: "Confessing to 3 unrelated ancient crimes",
  reply_normal: "Replying like a functional adult",

  // Endings
  heroic_confused: "Accidental Heroic Victory",
  happy_sequel: "Peaceful Sunset with Sequel Contracts",
  tragic_rain: "Tragic Melodrama with Industrial Rain",
  become_villain: "Becoming the Villain for Better Outfits",
  rule_kingdom: "Ruling the Kingdom while Ignoring Emails",
  cliffhanger: "Unresolved Cliffhanger",

  // Fallbacks
  screen_time: "Daily Screen Time",
  under_control: "Everything is Under Control",
  everything_at_once: "Everything Happening at Once",
  surviving: "Just Surviving",
  getting_rich: "Trying to Become Rich",
};

export function cleanLabel(keyOrText: string | undefined | null): string {
  if (!keyOrText) return "";
  const trimmed = keyOrText.trim();
  if (ID_MAP[trimmed]) return ID_MAP[trimmed];

  // If it's snake_case or kebab-case, humanize it
  return trimmed
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
