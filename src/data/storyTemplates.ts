// Fallback story templates — used when AI is unavailable
// These are funny, personalized, and always work

export interface StoryTemplate {
  id: string;
  universeId: string;
  template: (vars: TemplateVars) => StoryResult;
}

export interface TemplateVars {
  name: string;
  role: string;
  archetype: string;
  universe: string;
  quest: string;
  strength: string;
  weakness: string;
  companion: string;
  power: string;
  weapon: string;
  villain: string;
  fear: string;
  sacrifice: string;
  ending: string;
  plotTwist: string;
  situation: string;
}

export interface StoryResult {
  movieTitle: string;
  tagline: string;
  genre: string;
  characterIntroduction: string;
  currentChapter: string;
  quest: string;
  villain: string;
  companion: string;
  plotTwist: string;
  finalBattle: string;
  ending: string;
  postCreditScene: string;
}

const titlePrefixes = [
  "The Last", "Rise of", "The Legend of", "Chronicles of", "Dawn of",
  "Fall of", "The Return of", "Shadow of", "Fate of", "The Unfinished",
];

const titleSuffixes = [
  "Eldoria", "the Forgotten Realm", "the Ancient Pact", "Tomorrow",
  "the Final Hour", "a New Dawn", "the Broken Crown", "the Last Stand",
];

function generateTitle(vars: TemplateVars): string {
  const funnyTitles: Record<string, string[]> = {
    procrastination: [
      `${vars.name}: I'll Save the World Tomorrow`,
      `The Hero Who Needed Five More Minutes`,
      `${vars.name} and the Quest That Could Wait`,
    ],
    overthinking: [
      `${vars.name}: 47 Reasons This Is a Bad Idea`,
      `The Hero Who Considered Every Possibility`,
    ],
    laziness: [
      `${vars.name}: The Minimum Viable Hero`,
      `The Reluctant Savior of ${titleSuffixes[Math.floor(Math.random() * titleSuffixes.length)]}`,
    ],
  };

  if (funnyTitles[vars.weakness]) {
    const options = funnyTitles[vars.weakness];
    return options[Math.floor(Math.random() * options.length)];
  }

  const prefix = titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)];
  const suffix = titleSuffixes[Math.floor(Math.random() * titleSuffixes.length)];
  return `${prefix} ${vars.name} of ${suffix}`;
}

export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: "fantasy_default",
    universeId: "fantasy",
    template: (vars) => ({
      movieTitle: generateTitle(vars),
      tagline: `One ${vars.role}. One ${vars.companion}. Zero backup plans.`,
      genre: "Epic Fantasy Comedy",
      characterIntroduction: `In the ancient realm of Eldoria, where prophecies are handed out like parking tickets, one person stood apart from the rest. ${vars.name}. Known for their extraordinary ${vars.strength} and their legendary ${vars.weapon}, ${vars.name} was not what anyone expected the chosen one to look like. Especially because of the ${vars.weakness}. The prophecy neglected to mention that.`,
      currentChapter: `Chapter 1: The Terrible Timing of Destiny. ${vars.name} was in the middle of ${vars.situation === "stuck" ? "being spectacularly stuck in a situation of their own making" : vars.situation === "just_starting" ? "figuring out where the adventure even begins" : "dealing with everything at once"} when the prophecy arrived. It was, as prophecies go, extremely inconvenient.`,
      quest: `The quest was clear: ${vars.quest}. The path was not. ${vars.name}'s ${vars.companion} offered several suggestions. Most of them were bad. One of them was catastrophic. They went with the catastrophic one.`,
      villain: `Standing in the way was ${vars.villain} — a being of immense power, terrible fashion sense, and a personal grudge against everything ${vars.name} represented. Their greatest fear? Exactly what ${vars.name} was afraid of too: ${vars.fear}. Awkward.`,
      companion: `${vars.name}'s companion — a ${vars.companion} named by destiny itself — had been watching this entire situation with increasing concern. "I've seen braver heroes," the ${vars.companion} said. "I have also seen worse. You're somewhere in the middle. Leaning toward worse." ${vars.name} appreciated the honesty.`,
      plotTwist: `PLOT TWIST: ${vars.plotTwist} Nobody saw it coming. Except the ${vars.companion}, who had known since Chapter 2 and decided not to mention it.`,
      finalBattle: `The final battle arrived with the subtlety of a dragon at a library. ${vars.name} stood before ${vars.villain}, clutching the ${vars.weapon} with significantly more confidence than was justified. Using their ${vars.power} at exactly the right moment, and making the sacrifice of ${vars.sacrifice}, ${vars.name} did what no hero before them had managed: they improvised spectacularly and somehow it worked.`,
      ending: `And so, ${vars.name} ${vars.ending === "heroic" ? "emerged victorious, slightly confused about what had just happened, but victorious nonetheless" : vars.ending === "become_villain" ? "looked at the throne, looked at the ${vars.villain}'s position, and made a decision that would require a sequel to explain" : vars.ending === "disappear" ? "walked into the sunset, leaving behind nothing but questions and a very confused ${vars.companion}" : "found something that felt, suspiciously, like exactly what they had been looking for all along"}. The ${vars.companion} ate the last slice of the victory feast. Nobody argued.`,
      postCreditScene: `[POST-CREDIT SCENE] Three months later. ${vars.name} is sitting in their favorite spot. Their ${vars.companion} leans over. "There's another prophecy." ${vars.name} closes their eyes. "How bad?" "Well," says the ${vars.companion}, "it specifically mentions your name. And your ${vars.weakness}." Long pause. "I need a moment." "The kingdom has about twelve minutes." "FINE."`,
    }),
  },
  {
    id: "superhero_default",
    universeId: "superhero",
    template: (vars) => ({
      movieTitle: `${vars.name}: ${vars.power === "time" ? "Out of Time" : vars.power === "invisibility" ? "Now You See Me" : "Rising Force"}`,
      tagline: `The city needed a hero. It got ${vars.name}. Close enough.`,
      genre: "Action Comedy",
      characterIntroduction: `Metro City had seen many heroes. None quite like ${vars.name}. Armed with ${vars.power}, wielding ${vars.weapon}, and accompanied by ${vars.companion}, ${vars.name} was technically qualified for heroism. The ${vars.weakness} was a known issue they were working on.`,
      currentChapter: `Chapter 1: The Incident That Started Everything. On what should have been a completely ordinary day, ${vars.name} found their life transformed. The city needed saving. The timing was terrible. Their ${vars.companion} was unavailable. They did it anyway.`,
      quest: `The mission: ${vars.quest}. The problem: ${vars.villain} had other plans. Specifically, plans that involved maximum chaos and minimum cooperation.`,
      villain: `${vars.villain} had been waiting for exactly this moment. "I knew you'd come," they said. "I didn't expect the ${vars.weapon}, though." Neither did anyone else.`,
      companion: `${vars.companion} arrived at the exact moment ${vars.name} needed them most. They took one look at the situation and said something that would become legendary in Metro City's history.`,
      plotTwist: `PLOT TWIST: ${vars.plotTwist} The city went very quiet for a moment.`,
      finalBattle: `The final confrontation shook Metro City to its foundations. ${vars.name}, using ${vars.power} in a way that definitely wasn't in the manual, faced ${vars.villain} one last time. The sacrifice — giving up ${vars.sacrifice} — was the price. Worth it.`,
      ending: `${vars.name} stood on the rooftop as the sun rose over Metro City. Their ${vars.companion} stood beside them. "So what now?" "We figure it out," said ${vars.name}. "Together." Below, the city went on. Mostly unaware. Entirely protected.`,
      postCreditScene: `[POST-CREDIT SCENE] A mysterious figure watches footage of the battle. "Interesting," they say. "Recruit them." Their assistant pauses. "Even with the ${vars.weakness}?" The figure considers this. "Especially because of the ${vars.weakness}."`,
    }),
  },
  {
    id: "scifi_default",
    universeId: "scifi",
    template: (vars) => ({
      movieTitle: `${vars.name}: ${vars.power === "time" ? "Temporal Paradox" : "Galaxy's Edge"}`,
      tagline: `In space, no one can hear you procrastinate.`,
      genre: "Sci-Fi Epic",
      characterIntroduction: `The year: far enough in the future that flying cars are normal but Mondays are still terrible. ${vars.name}, ${vars.role} of some renown, operated in a galaxy where ${vars.strength} was currency and ${vars.weakness} was a known security vulnerability.`,
      currentChapter: `Captain's Log, Entry 1: Everything has gone wrong in the most interesting possible sequence of events. The ${vars.companion} is handling it with more calm than the situation deserves.`,
      quest: `Mission parameters: ${vars.quest}. Complications: ${vars.villain}. ETA to catastrophe: immediately.`,
      villain: `${vars.villain} represented everything that stood between ${vars.name} and a quiet Tuesday. They were powerful, they were determined, and they had significantly better funding.`,
      companion: `The ${vars.companion} processed 17 trillion possible outcomes. "Probability of survival," it announced, "is..." it paused for effect, "better than yesterday." ${vars.name} took this as encouragement.`,
      plotTwist: `ALERT: CRITICAL DISCOVERY. ${vars.plotTwist} The ship's AI was suspiciously unsurprised.`,
      finalBattle: `The confrontation across the stars concluded with ${vars.name} deploying ${vars.power} in a maneuver that violated at least four laws of physics and two of the galaxy's trade agreements. It worked anyway.`,
      ending: `The galaxy survived. ${vars.name} survived. The ${vars.companion} filed a very thorough report about the whole thing. Nobody read it.`,
      postCreditScene: `[POST-CREDIT SCENE] Deep space. An unknown signal. The ${vars.companion} turns to ${vars.name}. "You're not going to like this." ${vars.name} sighs. "I never like anything." "It's sending your name." Pause. "...In what language?" "All of them."`,
    }),
  },
  {
    id: "pirate_default",
    universeId: "pirate",
    template: (vars) => ({
      movieTitle: `${vars.name} and the ${vars.quest === "wealth" ? "Infinite Treasure" : "Lost Horizon"}`,
      tagline: `The sea doesn't care about your plans. Neither does the ${vars.companion}.`,
      genre: "Swashbuckling Adventure",
      characterIntroduction: `The Seven Seas had a new legend. ${vars.name}, ${vars.role}, sailed under no flag but their own. Their ${vars.weapon} was famous in seven ports. Their ${vars.weakness} was known in twelve.`,
      currentChapter: `The wind shifted the day ${vars.name}'s voyage truly began. The map was incomplete. The crew was questionable. The ${vars.companion} had strong opinions about the route. It was, all things considered, a standard Tuesday.`,
      quest: `The treasure existed. The ${vars.villain} also existed, and was significantly more motivated about the whole thing.`,
      villain: `"${vars.name}," said ${vars.villain}, from across the churning sea. "We meet at last." "We've met six times," said ${vars.name}. "This is the dramatic one," the villain clarified.`,
      companion: `The ${vars.companion} had seen many captains. Few with this particular combination of ${vars.strength} and ${vars.weakness}. It found the whole situation highly watchable.`,
      plotTwist: `The storm broke. And with it: ${vars.plotTwist}. The sea went still.`,
      finalBattle: `The battle for the horizon lasted three hours and involved far more improvisation than ${vars.name} had planned. Using ${vars.power} and the legendary ${vars.weapon}, and having surrendered ${vars.sacrifice}, ${vars.name} claimed victory. Or a version of it.`,
      ending: `The ${vars.name} sailed toward the horizon that had always been there. The ${vars.companion} sat at the bow. "Where to now?" "Anywhere," said ${vars.name}. "Everywhere." The sails filled. The sea agreed.`,
      postCreditScene: `[POST-CREDIT SCENE] In a port tavern far from the adventure. A stranger opens a map. A name is circled. "${vars.name}," the stranger says quietly. "Found you."`,
    }),
  },
  {
    id: "horror_comedy_default",
    universeId: "horror_comedy",
    template: (vars) => ({
      movieTitle: `${vars.name} vs. The Night (And Several Other Problems)`,
      tagline: `Everyone said don't split up. ${vars.name} did not split up. This is about what happened next anyway.`,
      genre: "Horror Comedy",
      characterIntroduction: `The town seemed quiet. It always seemed quiet before it wasn't. ${vars.name}, equipped with nothing but ${vars.strength}, ${vars.weapon}, and an extremely inconvenient ${vars.weakness}, arrived at the worst possible moment. Which is the only moment this story has.`,
      currentChapter: `Chapter 1: The Part Where Everyone Else Made the Wrong Decision. ${vars.name} made the right decision. This did not help as much as hoped.`,
      quest: `Survive the night. Simple. The ${vars.villain} had a different idea about how the night should go.`,
      villain: `The ${vars.villain} had been waiting for centuries for a worthy opponent. ${vars.name} was not entirely what they had in mind. But they'd work with it.`,
      companion: `"I have a plan," said ${vars.companion}. ${vars.name} waited. "It involves running." "That's not a plan." "It's an excellent plan."`,
      plotTwist: `And then: ${vars.plotTwist}. The ${vars.companion} had been holding onto this information for three acts. The timing was, at minimum, consistent with the general chaos.`,
      finalBattle: `Using ${vars.power}, wielding the ${vars.weapon}, and having given up ${vars.sacrifice}, ${vars.name} faced the ${vars.villain} in the final confrontation. It was less heroic than imagined and more effective than expected.`,
      ending: `The town survived. Most of it. ${vars.name} walked out into the morning light. "Never again," they said. The ${vars.companion} nodded. Both of them knew this was not entirely accurate.`,
      postCreditScene: `[POST-CREDIT SCENE] The house is empty. The screen goes black. Then: a knock on the door. Nobody says anything for six seconds. Then: ${vars.name}'s voice. "...I forgot my ${vars.weapon}."`,
    }),
  },
  {
    id: "magical_academy_default",
    universeId: "magical_academy",
    template: (vars) => ({
      movieTitle: `${vars.name} and the Forbidden Chapter`,
      tagline: `They said don't open the forbidden section. ${vars.name} respectfully disagreed.`,
      genre: "Magical Adventure Drama",
      characterIntroduction: `Aethermoor Academy had trained the greatest wizards of a hundred generations. ${vars.name} enrolled on a scholarship, a secret they didn't know they had, and a ${vars.weakness} they definitely knew about. Their ${vars.strength} placed them in the unusual category of "surprisingly dangerous."`,
      currentChapter: `First Year, Week One: ${vars.name} had already accidentally discovered a prophecy, befriended a ${vars.companion}, and been warned by three separate professors. This was faster than average.`,
      quest: `Master the ${vars.power} before the ${vars.villain} could use it for the catastrophic purpose they clearly had in mind.`,
      villain: `The ${vars.villain} had been waiting for someone exactly like ${vars.name}. Someone with ${vars.strength}, someone with ${vars.weakness}, someone who would absolutely open the forbidden book. They had been very patient.`,
      companion: `The ${vars.companion} had been assigned to ${vars.name} by forces neither of them fully understood. "You're going to do something extremely inadvisable," the ${vars.companion} predicted. "Probably," ${vars.name} agreed. "Consistently."`,
      plotTwist: `The Academy's deepest secret: ${vars.plotTwist}. The Headmaster had known. The ${vars.companion} had suspected. ${vars.name} had been the last to figure it out and would never fully live that down.`,
      finalBattle: `The climax of the academic year involved considerably more forbidden magic than the curriculum intended, the sacrifice of ${vars.sacrifice}, and a deployment of ${vars.power} that would be studied by future students for decades. Partly as a warning.`,
      ending: `${vars.name} stood in the great library as the sunset turned the ancient stones gold. Their ${vars.companion} rested nearby. Next year would be different. Or it would be the same, elevated. Either way, ${vars.name} was ready. Mostly.`,
      postCreditScene: `[POST-CREDIT SCENE] A new student envelope arrives at an address far from the Academy. It says: "You have been accepted." Inside, in very small text: "Please do not open the forbidden section." They will open the forbidden section.`,
    }),
  },
];

export function getFallbackTemplate(universeId: string): StoryTemplate {
  const template = STORY_TEMPLATES.find((t) => t.universeId === universeId);
  return template ?? STORY_TEMPLATES[0];
}
