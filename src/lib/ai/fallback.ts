import type { AIProvider } from "./provider";
import type { MovieProfile } from "@/lib/scoring";
import type { StoryResult } from "@/lib/validation";
import { getFallbackTemplate } from "@/data/storyTemplates";
import type { TemplateVars } from "@/data/storyTemplates";

export class FallbackProvider implements AIProvider {
  private profileToVars(profile: MovieProfile): TemplateVars {
    return {
      name: profile.name,
      role: profile.archetypeLabel,
      archetype: profile.actualArchetype,
      universe: profile.universe,
      kingdomName: profile.kingdomName,
      quest: profile.quest,
      strength: profile.strength,
      weakness: profile.weakness,
      companion: profile.companionLabel,
      power: profile.power,
      weapon: profile.weapon,
      villain: profile.villainLabel,
      fear: profile.fear,
      sacrifice: profile.sacrifice,
      ending: profile.endingPreference,
      plotTwist: profile.plotTwist,
      situation: profile.situation,
    };
  }

  async generateStory(profile: MovieProfile): Promise<StoryResult> {
    const template = getFallbackTemplate(profile.universe);
    const vars = this.profileToVars(profile);
    return template.template(vars);
  }

  async continueStory(
    profile: MovieProfile,
    choice: string,
    _originalStory: Record<string, string>
  ) {
    const continuations: Record<string, string> = {
      fight: `${profile.name} charged forward with a battle cry that the kingdom would remember for generations. Mostly because it was slightly awkward. Using ${profile.power} at the last possible moment, ${profile.name} struck with the ${profile.weapon} and landed a blow that nobody — including ${profile.name} — expected to connect. The ${profile.villainLabel} staggered. The companion looked on with barely concealed surprise. The battle turned.`,
      accept: `${profile.name} reached out and accepted the power. It felt like electricity. It felt like a terrible idea. The ${profile.villainLabel} smiled. Then ${profile.name} used the power not for conquest, but to save the very thing the villain had been trying to destroy. The villain had not anticipated this. Neither had ${profile.name}, if we're being honest.`,
      save_friend: `${profile.name} turned away from the battle. The ${profile.villainLabel} laughed. That was a mistake. The ${profile.companionLabel} looked up as ${profile.name} arrived against impossible odds — and then looked at ${profile.name} with an expression that contained four years of gratitude and approximately one question: "Was that the plan all along?" ${profile.name} decided now was not the time to answer honestly.`,
      trick: `${profile.name} smiled. "I have a proposal," they said. The ${profile.villainLabel} paused — which was already more than ${profile.name} had expected. The scheme was improvised, not entirely logical, and dependent on the ${profile.villainLabel} being slightly less smart than advertised. It worked. Sometimes the most effective plans are the ones nobody would ever predict because nobody would ever attempt them.`,
    };

    return {
      continuationTitle: `The Choice That Changed Everything`,
      continuation: continuations[choice] ?? continuations.fight,
      cliffhanger: `As the dust settled, ${profile.name} looked at ${profile.companionLabel}. "Is it over?" "Probably not," said the ${profile.companionLabel}. "But for now — yes." ${profile.name} sat down. The kingdom could wait five minutes.`,
    };
  }

  async generateAlternateEnding(
    profile: MovieProfile,
    endingType: "hero" | "dark" | "funny"
  ) {
    const endings = {
      hero: {
        endingTitle: `THE HERO ENDING`,
        ending: `${profile.name} stood at the top of the world — quite literally, as the ${profile.universe} universe tended toward dramatic geography. Every obstacle had been overcome. Every sacrifice honored. The ${profile.villainLabel} was defeated. The companion was safe. Even the ${profile.weakness} had been managed, mostly. The kingdom cheered. The legend began. ${profile.name} looked out at everything that had been saved and felt something they hadn't expected: peace.`,
        finalLine: `"I did it," said ${profile.name}. "Somehow."`,
      },
      dark: {
        endingTitle: `THE DARK ENDING`,
        ending: `${profile.name} won. But victory has a cost, and this victory extracted a price that nobody had fully calculated. The ${profile.villainLabel} was gone. So was the dream. So was the sacrifice — ${profile.sacrifice} — which turned out to be worth exactly as much as feared. The companion remained. The story continued. But it was a different story now. ${profile.name} understood something that all great heroes eventually understand: winning and triumph are not the same thing.`,
        finalLine: `The crown was heavy. Nobody had warned them about that part.`,
      },
      funny: {
        endingTitle: `THE FUNNY ENDING`,
        ending: `${profile.name} defeated the ${profile.villainLabel} through a sequence of events so improbable that three different kingdoms commissioned official records just to make sure it was documented. The ${profile.weakness} turned out to be the decisive factor. The ${profile.companionLabel} witnessed the entire thing and had nothing to add. Peace returned to the land. ${profile.name} received a parade. A very confused parade, because nobody could fully explain what had happened. But a parade nonetheless.`,
        finalLine: `"I meant to do that," said ${profile.name}. Nobody argued.`,
      },
    };

    return endings[endingType];
  }
}
