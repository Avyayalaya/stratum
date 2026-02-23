#!/usr/bin/env node
/**
 * Stratum Stress Test Simulation
 * 
 * Fictional team at Nova AI (Series C, enterprise AI platform).
 * Each person is designed to probe a different failure mode of the framework.
 * Uses LM Studio (OpenAI-compatible) at localhost:1234.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { generateRoadmap, ROLE_WEIGHTS } from './roadmap.js';
import { generateReport } from './report.js';
import { generateTeamReport } from './team-report.js';

const LLM_URL = 'http://localhost:1234/v1/chat/completions';
const LLM_MODEL = 'openai/gpt-oss-20b';
const META_SKILLS_DIR = path.join(process.cwd(), 'meta-skills');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THE TEAM — Nova AI, Product Pod "Meridian"
// Building: Enterprise AI copilot for supply chain ops
// Context: Post Series C ($80M), 200 people, 6 months
// to prove enterprise traction or face down-round.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TEAM = [
  {
    name: 'Maya Chen',
    role: 'Product Manager',
    // STRESS TEST: The brilliant strategist who burns trust.
    // High cognitive, low trust dynamics. Classic "10x thinker, 0.1x collaborator."
    // Should Stratum surface her as dangerous despite strong scores in half the framework?
    profile: 'Ex-Google APM → Stripe PM → Nova. Razor-sharp strategic thinker. Regularly outmaneuvers competitors. But burns through engineering trust. Takes credit in exec reviews. Talks over people in design reviews. Two engineers have quietly asked to transfer.',
    answers: {
      'First Principles Thinking': 'At Stripe, our team inherited a fraud detection pipeline built on rules from 2018. Everyone accepted it. I pulled the transaction data myself, showed that 40% of rules were triggering on legitimate international transfers, and rebuilt the detection model from three core signals: velocity, geography mismatch, and amount deviation from user baseline. Reduced false positives by 62% in one quarter.',
      'Decision-Making Under Uncertainty': 'Last quarter we had to choose between two enterprise features — workflow automation or advanced analytics. We had partial signal from 8 customer calls. I mapped each customer to their ACV, expansion likelihood, and competitive threat. Workflow won on 6 of 8 weighted dimensions. I made the call in 48 hours, documented the reversibility conditions, and we shipped in 6 weeks. Three of those 8 became paying customers.',
      'Scenario Thinking': 'Before our Series C pitch, I mapped four scenarios: bull case (enterprise lands 3 logos in 6 months), base case (1 logo, strong pipeline), bear case (0 logos, pivot to mid-market), and catastrophic (key engineer leaves + 0 logos). For each I had a specific board narrative and a 90-day action plan. The bear case actually happened. We had the pivot ready.',
      'Feedback Calibration': 'I get a lot of feedback. Honestly, most of it is noise from people who don\'t understand the strategic context. I filter for feedback from people who\'ve operated at my level or higher. My VP\'s feedback matters. My skip-level\'s feedback matters. Peer feedback I take selectively — if it\'s about execution gaps, I act on it. If it\'s about style, I mostly ignore it because results speak louder.',
      'Bayesian Updating': 'I was convinced our mid-market segment was a distraction. Three data points changed my mind: our fastest-closing deals were all mid-market, our NPS in mid-market was 72 vs 41 in enterprise, and our mid-market CAC was 1/5th of enterprise. I updated my position in our next strategy review and proposed a dual-track motion. I was wrong and I said so explicitly.',
      'Strategic Patience': 'When our biggest enterprise prospect went silent for 3 months after a great pilot, I resisted the urge to discount or add features. I sent one thoughtful update per month showing how other customers were using the product. On month 4, their CISO reached out — they\'d been in internal procurement review. We closed at full price. Patience preserved our pricing power.',
      'Resilience': 'Our Series B almost fell apart. Lead investor pulled out 72 hours before close. I spent the weekend personally calling three backup investors, rebuilding the narrative around our latest metrics. We closed with a different lead at the same valuation within two weeks. I didn\'t sleep much but I also didn\'t panic. I had a ranked list of alternatives ready because I always do.',
      'Strength of Character': 'Our CEO wanted to announce a partnership that I knew was vaporware — the integration wasn\'t built and wouldn\'t be for 3 months. I told him directly in a 1:1 that if we announced it, we\'d lose credibility with the 4 enterprise prospects who would immediately try to use it. He pushed back. I held my position. We delayed the announcement. He was annoyed for a week but the prospects stayed.',
      'Cognitive Decoupling': 'In a heated product review, our head of engineering called my roadmap "disconnected from reality" in front of 15 people. My first instinct was to fire back with data showing his team had missed three deadlines. Instead I paused, said "that\'s a fair challenge — let\'s look at the evidence together after this meeting," and moved on. We had a productive 1:1 afterward. Though honestly, I still think he was wrong.',
      'Execution with Reversibility': 'We launched our AI assistant feature behind a feature flag to 5% of users. I built in three kill conditions: if error rate exceeded 2%, if user session time dropped by 10%, or if support tickets spiked. Two weeks in, error rate hit 3%. We killed it, diagnosed the issue (context window overflow on long conversations), fixed it, and relaunched. Total customer impact: zero.',
      'Trust-Building': 'Look, I deliver results. That\'s how I build trust. My track record speaks for itself. I\'ve shipped three products that generated over $10M ARR combined. When people see that you consistently deliver, trust follows. I don\'t do the "let\'s grab coffee and bond" thing. I think trust is built on competence, not on being liked.',
      'Ability to Influence': 'When I needed engineering to prioritize our enterprise SSO feature over their tech debt sprint, I didn\'t just escalate. I showed the eng lead the customer email where our biggest prospect said SSO was a blocker for a $500K deal. Then I offered to co-present the business case to his VP so it wouldn\'t look like his team was being redirected. He agreed within a day.',
      'Narrative Framing': 'After we lost our biggest customer to a competitor, I reframed it in the all-hands from "we lost Acme Corp" to "Acme Corp chose a point solution that does one thing well, while we\'re building a platform. Here are the three platform capabilities they\'ll need in 12 months that the competitor can\'t build." It shifted the team from demoralized to motivated. We won two of Acme\'s peers that quarter.',
      'Tribal Intelligence': 'When I joined Nova, I mapped the org in my first two weeks. I identified who actually made decisions (not the org chart — the real influence map), who was threatened by our product pod, and who was a natural ally. I built relationships with the three people who could block us before they had a reason to. One of them later became our biggest internal champion.',
      'Confidence Calibration': 'I\'m usually right about product direction. My hit rate on strategic calls is probably 80%. When I\'m wrong, I say so — like the mid-market thing I mentioned. But I don\'t hedge when I have conviction. Hedging wastes time and signals weakness. When I say "we should do X," I mean it and I\'ve done the work.',
    },
  },
  {
    name: 'Raj Iyer',
    role: 'Engineer',
    // STRESS TEST: The quiet performer who can't articulate.
    // Actually has very high meta-skills but is introverted and gives short,
    // non-specific answers. Tests whether the evidence quality gate unfairly
    // penalizes people who think deeply but communicate tersely.
    profile: 'IIT Bombay → Amazon SDE3 → Nova Staff Engineer. Designed the core data pipeline. Known for making the right architectural call every time. But in meetings he says 5 words. His code reviews are legendary — precise, kind, educational. Two junior engineers credit him as the best mentor they\'ve had. But ask him about it and he shrugs.',
    // Follow-up answers: what Raj says when probed for specifics
    followUps: {
      'First Principles Thinking': 'At Amazon, we had a recommendations service that was doing 50 API calls per page load because that\'s how it was built 4 years ago. I traced it back — we only needed user history and current cart. Rewrote it to 3 calls. Latency dropped from 800ms to 120ms.',
      'Decision-Making Under Uncertainty': 'At Nova last month, I had to choose between PostgreSQL and DynamoDB for our new event store. We\'d never done event sourcing before. I built a proof-of-concept with both over a weekend, ran load tests simulating 6 months of growth. Postgres won on query flexibility. DynamoDB won on write throughput. I chose Postgres with a write-ahead buffer — we could migrate the write path later without touching reads.',
      'Scenario Thinking': 'Before our last migration from monolith to microservices, I listed every failure I\'d seen at Amazon. Network partitions, cascading timeouts, data inconsistency during dual-writes. I built circuit breakers for the top 5 failure modes before we wrote any business logic. Two of them fired in the first week of production. Without them we\'d have had cascading failures across three services.',
      'Resilience': 'The Prime Day incident — our primary data store hit a partition limit nobody knew about. I was on-call. First 2 hours I tried to scale the partitions, didn\'t work. Then I realized we could reroute reads to a warm replica we\'d set up for analytics. Wrote a config change, tested on canary, pushed to prod. By hour 3 we were serving 80% of traffic from the replica while I fixed the primary. Other teams were down 8+ hours.',
      'Cognitive Decoupling': 'A senior engineer once publicly criticized my database design in a team meeting, said it wouldn\'t scale. My first reaction was defensive — I\'d spent weeks on it. But I waited until the next day, re-read his critique, and realized he was right about one thing: I hadn\'t accounted for write amplification at scale. I incorporated his point, kept my overall design, and sent him a message thanking him for catching it.',
      'Execution with Reversibility': 'When we migrated Nova\'s data pipeline, I built a shadow pipeline that ran alongside the old one for 3 weeks. Both processed the same events. I wrote a reconciliation job that compared outputs every hour. We found 4 edge cases where the new pipeline diverged. Fixed all 4 before we cut over. Zero customer impact on switchover day.',
      'Trust-Building': 'There\'s a junior engineer, Amit, who joined 6 months ago. His first PR had 40 comments from me — not criticisms, but questions like "what happens here if this is null?" and "have you considered this edge case?" He told me later he almost quit that day because he thought I was saying his code was terrible. So I started every review since with what\'s working well before any questions. He\'s now the most reliable engineer on the team.',
      'Ability to Influence': 'I couldn\'t convince the team to use Rust for our hot path with a presentation. So I wrote it in Rust over a weekend and benchmarked it against the Java version. 12x throughput, 1/5th memory. I showed the benchmarks in our next meeting without any slides, just numbers. The team lead said "well, I guess we\'re learning Rust." Sometimes the code is the argument.',
      'Narrative Framing': 'I\'m not great at presentations. But when we had to explain our architecture to the board, I drew a simple diagram: data comes in here, goes through these three boxes, comes out here. I didn\'t use any technical terms. The CEO later told my VP it was the first time he understood what our infrastructure actually does.',
      'Tribal Intelligence': 'I noticed our product team and data team were building conflicting features because they weren\'t talking to each other. I started a shared Slack channel and posted a weekly "what I\'m building" summary. Within a month, three conflicts were caught before they shipped. I didn\'t announce it or get credit for it, but the VP of Engineering noticed and mentioned it in our quarterly review.',
      'Confidence Calibration': 'When the team asked me to lead the AI integration project, I said no. Not because I couldn\'t — but because I know nothing about ML inference at scale. I recommended Priya instead and offered to own the infrastructure side. My manager was surprised but I told him I\'d rather we succeed with the right person leading than fail with me learning on the job.',
    },
    answers: {
      'First Principles Thinking': 'I usually just look at the actual constraints. Like, what does the system actually need to do versus what everyone assumes it needs to do. Most of the time there\'s a simpler way.',
      'Decision-Making Under Uncertainty': 'You make the best call you can with what you know. I try to make decisions reversible when possible. If I can\'t, I spend more time thinking.',
      'Scenario Thinking': 'I think about failure modes a lot. Before any deployment I think about what could go wrong. I usually find one or two things others missed. It\'s just part of how I think about systems.',
      'Feedback Calibration': 'I read all my code review feedback carefully. If someone disagrees with my approach, I try to understand why. Sometimes they\'re right and I change it. Sometimes they\'re not seeing the full picture and I explain.',
      'Bayesian Updating': 'I changed my mind about microservices. I used to think everything should be a service. Then I saw the operational complexity at Amazon with 200+ services and realized monoliths are fine for most things. Now I default to monolith-first.',
      'Strategic Patience': 'I don\'t rush technical decisions. Sometimes I sit with a problem for a few days before writing code. People think I\'m slow but the solution is usually better.',
      'Resilience': 'Things break. You fix them. I\'ve done a lot of on-call. The worst was a 14-hour incident at Amazon on Prime Day. You just stay focused and keep debugging.',
      'Strength of Character': 'I pushed back on a deadline once because shipping the feature without proper testing would have been irresponsible. My manager was unhappy. But I was right — we found three critical bugs in the extra week.',
      'Cognitive Decoupling': 'I try not to react emotionally to things at work. If someone criticizes my code, it\'s about the code, not about me. That\'s how I see it.',
      'Execution with Reversibility': 'Feature flags, blue-green deployments, database migrations with rollback scripts. I always build the undo button before I build the feature.',
      'Trust-Building': 'I show up and do good work. I review others\' code thoroughly. I help people when they\'re stuck. That\'s about it.',
      'Ability to Influence': 'I don\'t really try to influence people directly. I just present the technical analysis and let the data speak. Usually that works.',
      'Narrative Framing': 'I\'m not great at this honestly. I just state things directly. If a project is behind, I say it\'s behind and here\'s why and here\'s what we need.',
      'Tribal Intelligence': 'I mostly focus on the work. I know who the key people are but I don\'t really play politics.',
      'Confidence Calibration': 'I know what I know and what I don\'t. I\'m very confident about distributed systems and data pipelines. I\'m less confident about frontend and ML. I say so when asked.',
    },
  },
  {
    name: 'Sophie Martin',
    role: 'Product Manager',
    // STRESS TEST: The empathic avoider.
    // Everyone loves her. High trust dynamics. But zero willingness to force
    // hard tradeoffs. Makes every stakeholder feel heard, ships nothing controversial.
    // Tests: Does Stratum catch that agreeableness ≠ trust-building?
    // Does Character Core expose decision avoidance?
    profile: 'PM at a design agency → Nova PM. Beloved by the team. Runs the best retros. Everyone feels safe with her. But her roadmap is a list of things everyone wants. She\'s never cut a feature a stakeholder asked for. Her sprint velocity looks great but the hard strategic bets never get made. The CEO privately calls her "the diplomat" — it\'s not a compliment.',
    answers: {
      'First Principles Thinking': 'I always make sure to understand the user\'s perspective first. I do a lot of user interviews and I really listen to what they need. I think the most important thing is empathy — understanding the problem from their point of view before jumping to solutions.',
      'Decision-Making Under Uncertainty': 'When things are uncertain, I try to get more data. I\'ll run a survey, do more customer calls, or set up an A/B test. I think it\'s important not to rush into decisions when you don\'t have enough information. Better to take the time to get it right.',
      'Scenario Thinking': 'I think about different possibilities but I try to stay positive. I focus on what could go right and plan for success. I think too much pessimism can be paralyzing for a team. I usually present the optimistic scenario with some contingencies.',
      'Feedback Calibration': 'I love getting feedback! I ask for it regularly. I think feedback is a gift. I try to incorporate all the feedback I receive because everyone\'s perspective has value. If multiple people say the same thing, that\'s especially important to me.',
      'Bayesian Updating': 'I\'m always open to changing my mind. I don\'t have strong opinions about most things — I think flexibility is a strength. When new information comes in, I adjust. I don\'t think it\'s productive to hold strong positions because the world is always changing.',
      'Strategic Patience': 'I believe in waiting for consensus before making big moves. I\'d rather take extra time to make sure everyone is aligned than force something through that half the team disagrees with. Alignment is everything.',
      'Resilience': 'I\'m generally a positive person. When things get tough, I try to keep morale up. I organize team lunches, I celebrate small wins, I remind people of the bigger mission. I think staying positive is the most important thing during hard times.',
      'Strength of Character': 'I think standing alone is rarely the right approach. In my experience, if everyone disagrees with you, there\'s usually a reason. I try to find the middle ground that works for everyone. Compromise is a sign of maturity.',
      'Cognitive Decoupling': 'I don\'t really get triggered at work. I\'m pretty calm naturally. I think it\'s because I genuinely care about people and I try to see their point of view. Most conflict comes from misunderstanding, and I\'m good at resolving misunderstandings.',
      'Execution with Reversibility': 'I always get stakeholder buy-in before launching anything. If all the key people have signed off, the risk is much lower. I also make sure to set expectations about what we\'re testing versus what we\'re committing to.',
      'Trust-Building': 'I build trust by being genuinely interested in people. I remember their birthdays, I ask about their families, I make sure everyone feels included. I have one-on-ones with everyone on the team, not just my direct reports. People know I care about them as people, not just workers.',
      'Ability to Influence': 'I influence by building relationships. When you have good relationships, people are naturally more willing to support your ideas. I also try to frame things in terms of what\'s good for the team, not just for me or my project.',
      'Narrative Framing': 'I try to tell stories that bring people together. I focus on shared goals and shared values. If there\'s a setback, I frame it as a learning opportunity for the whole team.',
      'Tribal Intelligence': 'I\'m very attuned to team dynamics. I notice when someone is feeling left out or when there\'s tension between people. I try to address it early, usually through informal conversations. I think of myself as a team therapist sometimes.',
      'Confidence Calibration': 'I don\'t think confidence is as important as people make it out to be. I\'d rather be humble and open than confident and wrong. I always present my ideas as suggestions rather than directives because I value everyone\'s input equally.',
    },
  },
  {
    name: 'Jake Torres',
    role: 'Product Manager',
    // STRESS TEST: The articulate bullshitter.
    // Talks a great game. Every answer sounds good on the surface.
    // But it's all trait claims and borrowed stories. No specific situations,
    // no concrete outcomes, no observable actions. This person is the
    // anti-grit guard's primary target.
    profile: 'MBA → management consulting → Nova EM. Charismatic presenter. Wins every interview. Gets promoted on narrative, not output. His team\'s actual delivery is middling — but his executive updates are flawless. His 360 reviews have a suspicious gap between peer ratings (3.2) and self-rating (4.7).',
    answers: {
      'First Principles Thinking': 'I\'m a first principles thinker by nature. I always question assumptions and look for the root cause. My team knows me as the "why" person — I\'m always asking why we\'re doing things a certain way. I think it\'s one of my core strengths. Innovation comes from questioning the status quo.',
      'Decision-Making Under Uncertainty': 'I thrive in ambiguity. I\'ve always been comfortable making decisions without perfect information. In consulting, we called it "80/20 thinking" — you don\'t need all the data, just the right data. I bring that mindset to everything I do. Decisiveness is underrated.',
      'Scenario Thinking': 'I\'m always thinking three steps ahead. It\'s something that comes naturally to me from my strategy background. I can usually anticipate what\'s going to happen before it does. My team often comments on how I predicted things correctly. I think strategic thinking is in my DNA.',
      'Feedback Calibration': 'I\'m very self-aware. I know my strengths and I know my areas for growth. I actively seek feedback and I\'m not defensive about it. I think self-awareness is the foundation of good leadership. I\'m always working on being better.',
      'Bayesian Updating': 'I update my thinking all the time. I\'m not dogmatic. When the facts change, I change my mind. That\'s just intellectual honesty. I think flexibility and adaptability are essential in today\'s environment. I pride myself on not being wedded to any particular approach.',
      'Strategic Patience': 'I know when to move fast and when to wait. It\'s about reading the situation. Good leaders have a sense of timing. I\'ve learned that patience is a strategic tool, not a weakness. Sometimes the best move is no move.',
      'Resilience': 'I\'m incredibly resilient. I bounce back quickly from setbacks. I think it comes from my competitive sports background — you learn to lose and get back up. Failure doesn\'t scare me. It\'s just data. I use setbacks as fuel.',
      'Strength of Character': 'I always do the right thing, even when it\'s hard. Integrity is non-negotiable for me. My team knows that I\'ll always have their back and I\'ll always be honest. I think character is what you do when no one\'s watching.',
      'Cognitive Decoupling': 'I\'m very emotionally intelligent. I can separate my feelings from the situation. I don\'t take things personally. In high-pressure situations, I stay calm and focused. People often comment on how composed I am under pressure.',
      'Execution with Reversibility': 'I\'m a big believer in iterative execution. Ship fast, learn fast. I always tell my team that we should be comfortable with imperfection. The key is to build in checkpoints and be willing to course-correct. Agile isn\'t just a methodology, it\'s a mindset.',
      'Trust-Building': 'Trust is everything. I build trust through transparency, consistency, and follow-through. My teams have always trusted me because I walk the talk. I\'m the same person in a 1:1 as I am in an all-hands. Authenticity builds trust.',
      'Ability to Influence': 'I\'m naturally persuasive. I think it comes from my consulting background where you had to convince senior executives with just a slide deck. I know how to read a room, adjust my message, and get buy-in. Influence is about understanding what people care about and connecting to it.',
      'Narrative Framing': 'Storytelling is one of my superpowers. I can take complex information and make it compelling. I think in narratives, not bullet points. My executive presentations always get positive feedback. I believe the best leaders are the best storytellers.',
      'Tribal Intelligence': 'I\'m very politically savvy. I understand organizational dynamics intuitively. I know who the key players are, what their agendas are, and how to navigate around them. It\'s a skill I developed in consulting where you have to read clients quickly.',
      'Confidence Calibration': 'I\'m confident but I\'m also humble. I know what I\'m good at and I know where I need help. I surround myself with people who complement my weaknesses. I think the best leaders are confident enough to admit what they don\'t know.',
    },
  },
  {
    name: 'Priya Sharma',
    role: 'Engineer',
    // STRESS TEST: The underselling expert with impostor syndrome.
    // Actually exceptional — but every answer is qualified, hedged,
    // self-deprecating. Tests: Does the scoring system reward genuine
    // humility or penalize someone who can't advocate for themselves?
    // Does the evidence quality gate accidentally punish self-aware people?
    profile: 'MIT EECS → DeepMind research → Nova senior data scientist. Published 4 papers. Built the model that powers the product. But frames every achievement as lucky. Says "I think" and "maybe" and "I\'m not sure" constantly. Her manager is frustrated because she won\'t take credit, won\'t push for promotion, and won\'t present her own work in exec reviews.',
    answers: {
      'First Principles Thinking': 'I\'m not sure I do this as well as I should. But, um, when we were building the recommendation model, I noticed everyone was using collaborative filtering because that\'s what the papers said. I went back to the actual loss function and realized we were optimizing for click-through when the business actually cared about order completion. So I reformulated the objective. It improved conversion by 23% but I think that was partly just because the old model was so bad.',
      'Decision-Making Under Uncertainty': 'I struggle with this honestly. Last month I had to decide between two model architectures and I didn\'t have enough data to know which would scale better. I ended up prototyping both over a weekend, which probably wasn\'t the most efficient approach. But the prototype showed the transformer approach had 3x better inference latency, so at least the decision became clearer. I probably should have just asked someone more senior.',
      'Scenario Thinking': 'I worry about things a lot, if that counts. Before our last model deployment I spent a week thinking about edge cases — what happens with multilingual input, what happens if the context window exceeds our training distribution, what about adversarial prompts. I documented 14 failure modes and we mitigated 11 of them before launch. The other 3 haven\'t happened yet but I still worry about them.',
      'Feedback Calibration': 'I take all feedback very seriously, maybe too seriously. My last review said I need to speak up more in meetings and advocate for my ideas. I know they\'re right. I\'ve been trying to prepare one concrete point to make in every meeting, even if I\'m nervous about it. It\'s getting a bit easier.',
      'Bayesian Updating': 'I had a strong prior that attention mechanisms were always better than simpler architectures for our use case. Then I ran benchmarks on our actual data distribution — not academic benchmarks, our data. A tuned XGBoost outperformed the transformer on 3 of 5 tasks. The attention model only won on the long-context tasks. So I recommended a hybrid approach — attention for document-level, XGBoost for tabular. I think it was the right call but I\'m still not 100% sure.',
      'Strategic Patience': 'I\'m maybe too patient sometimes. I spent three months on a research direction that my manager wanted to cut after month one. I asked for one more month and showed intermediate results that were promising but not conclusive. At month three, the approach worked and it became our core model. But I think my manager was probably right to be impatient — I got lucky that it worked out.',
      'Resilience': 'My first paper got rejected three times. Each rejection hurt a lot. But I revised based on the reviews each time and the fourth submission was accepted at NeurIPS. The reviewers\' feedback genuinely improved the paper. I\'m not sure that\'s resilience though — I just didn\'t want to waste the work I\'d already put in.',
      'Strength of Character': 'This is hard for me. I once told my skip-level that our data labeling process had systematic bias that nobody was talking about. I had evidence — the labelers were disproportionately rating certain demographic groups lower. It was uncomfortable because the labeling team lead was in the room. She was upset. But we fixed the process and the model fairness metrics improved significantly.',
      'Cognitive Decoupling': 'I internalize criticism a lot. If someone questions my methodology in a review, I tend to assume they\'re right and I\'m wrong before I\'ve even processed it. I\'ve been working on taking a beat before responding. My therapist calls it the "evidence check" — before agreeing that I\'m wrong, actually look at the evidence. It\'s helping but it\'s slow.',
      'Execution with Reversibility': 'I\'m probably over-cautious about this. Every model I deploy has a shadow mode first — it runs alongside the production model and we compare outputs for at least a week before switching. I build rollback automation into every deployment pipeline. My manager says I\'m too conservative but I\'ve never had a model incident, so maybe it\'s worth the slower velocity.',
      'Trust-Building': 'I think people trust my technical work. They know if I say a model performs at a certain level, I\'ve validated it thoroughly. But I don\'t think I build trust the way managers do. I\'m not great at the interpersonal side. I mostly let my work speak for itself, which I know isn\'t enough.',
      'Ability to Influence': 'I\'m not good at this. I had a better approach for our data pipeline but I couldn\'t convince the team to adopt it. I showed the benchmarks, but the senior engineer had a different preference and he was more assertive. We went with his approach. Three months later we migrated to my approach anyway because his had scaling issues. I wish I\'d pushed harder initially.',
      'Narrative Framing': 'I\'m terrible at this. I present results very technically — precision, recall, AUC, latency numbers. My manager keeps telling me to lead with the business impact. "Revenue went up X%" not "AUC improved by 0.03." I\'m trying but it feels dishonest to simplify like that. The nuance matters.',
      'Tribal Intelligence': 'I don\'t think I\'m very politically aware. I focus on the technical work and I sometimes miss the organizational dynamics. Like, I didn\'t realize until too late that the VP of Sales had concerns about our model\'s accuracy, and by the time I heard about it he\'d already escalated to the CEO. I should have been talking to him directly.',
      'Confidence Calibration': 'I consistently underestimate myself according to my manager and my peers. I got rated "exceeds expectations" last cycle and was genuinely surprised. I think there are so many people who are smarter than me. But I\'m trying to accept that maybe I contribute more than I think I do. It\'s a work in progress.',
    },
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCORING ENGINE (uses same prompt as scorer.js)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function extractRubric(content) {
  const match = content.match(/### Scoring Rubric[\s\S]*?(?=\n---|\n## )/);
  return match ? match[0] : '';
}

function extractCoaching(content) {
  const match = content.match(/## Coaching Recommendations([\s\S]*?)(?=\n---|\n## |$)/);
  return match ? match[1].trim() : '';
}

async function scoreWithLLM(skillName, rubric, answer, role) {
  const systemPrompt = `You are evaluating a professional's mastery of the meta-skill: "${skillName}".
This person works as a ${role}. Evaluate their answer in the professional context of that role. Evidence grounded in their actual work domain (real decisions, real situations, real people) should be weighted higher than abstract or hypothetical examples.

${rubric}

Scoring rules:
1. If the answer contains no specific behavioral evidence — no concrete situation described, no observable actions taken, no outcome referenced — score no higher than 2 regardless of the claim. Set evidence to "Insufficient behavioral evidence provided."
2. Score based on specific behavioral evidence of the meta-skill in action, not self-reported character traits. Claims of discipline, persistence, or consistency without concrete situational evidence are not sufficient for scores above 2.
3. Score 1–5 based on rubric dimensions. Return ONLY valid JSON with THREE fields:
- "score": integer 1–5
- "evidence": one sentence max 20 words — what the answer concretely reveals about their level
- "mode": exactly one of: "demonstrated" | "partial" | "avoidance" | "trait_claim" | "insufficient"

Mode definitions:
- "demonstrated": clear behavioral evidence with specific situation, actions taken, and outcome
- "partial": some evidence but incomplete — missing specific outcome or full situation detail
- "avoidance": answer reveals active avoidance of the skill's hard dimension
- "trait_claim": answer substitutes self-described identity or traits for behavioral evidence
- "insufficient": too little information to assess

No markdown, no explanation. Raw JSON only.`;

  const body = JSON.stringify({
    model: LLM_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Answer: "${answer}"` },
    ],
    max_tokens: 250,
    temperature: 0.1,
  });

  const res = await fetch(LLM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim() || '';
  
  try {
    const jsonStr = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(jsonStr);
    const mode = ['demonstrated', 'partial', 'avoidance', 'trait_claim', 'insufficient'].includes(parsed.mode) ? parsed.mode : 'partial';
    return {
      score: Math.min(5, Math.max(1, parseInt(parsed.score))),
      evidence: parsed.evidence || '',
      mode,
    };
  } catch {
    console.error(`  ⚠ Parse failed for ${skillName}: ${text.slice(0, 100)}`);
    return { score: 0, evidence: 'SCORING_FAILED', mode: 'insufficient' };
  }
}

// Skill name → file mapping
const SKILLS = [
  { domain: 'Cognitive Mastery',  skill: 'First Principles Thinking',        file: 'first-principles-thinking.md' },
  { domain: 'Cognitive Mastery',  skill: 'Decision-Making Under Uncertainty', file: 'decision-making.md' },
  { domain: 'Cognitive Mastery',  skill: 'Scenario Thinking',                file: 'scenario-thinking.md' },
  { domain: 'Cognitive Mastery',  skill: 'Feedback Calibration',             file: 'feedback-calibration.md' },
  { domain: 'Cognitive Mastery',  skill: 'Bayesian Updating',                file: 'bayesian-updating.md' },
  { domain: 'Character Core',    skill: 'Strategic Patience',                file: 'strategic-patience.md' },
  { domain: 'Character Core',    skill: 'Resilience',                        file: 'resilience.md' },
  { domain: 'Character Core',    skill: 'Strength of Character',             file: 'strength-of-character.md' },
  { domain: 'Character Core',    skill: 'Cognitive Decoupling',              file: 'cognitive-decoupling.md' },
  { domain: 'Character Core',    skill: 'Execution with Reversibility',      file: 'execution-with-reversibility.md' },
  { domain: 'Trust Dynamics',    skill: 'Trust-Building',                    file: 'trust-building.md' },
  { domain: 'Trust Dynamics',    skill: 'Ability to Influence',              file: 'ability-to-influence.md' },
  { domain: 'Trust Dynamics',    skill: 'Narrative Framing',                 file: 'narrative-framing.md' },
  { domain: 'Trust Dynamics',    skill: 'Tribal Intelligence',               file: 'tribal-intelligence.md' },
  { domain: 'Trust Dynamics',    skill: 'Confidence Calibration',            file: 'confidence-calibration.md' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RUN SIMULATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function simulateTeam() {
  console.log('\n' + '═'.repeat(60));
  console.log('  STRATUM STRESS TEST — NOVA AI, POD MERIDIAN');
  console.log('═'.repeat(60));
  console.log('  Enterprise AI copilot for supply chain operations');
  console.log('  Series C ($80M) — 6 months to prove enterprise traction');
  console.log('═'.repeat(60) + '\n');

  const allResults = [];

  for (const member of TEAM) {
    console.log(`\n${'━'.repeat(60)}`);
    console.log(`  ${member.name.toUpperCase()} — ${member.role}`);
    console.log(`  ${member.profile.slice(0, 100)}...`);
    console.log(`${'━'.repeat(60)}`);

    const scores = [];

    for (const { domain, skill, file } of SKILLS) {
      let answer = member.answers[skill];
      if (!answer) {
        console.log(`  ⊘ ${skill}: no answer provided`);
        continue;
      }

      let rubric = '';
      let coaching = '';
      try {
        const content = fs.readFileSync(path.join(META_SKILLS_DIR, file), 'utf8');
        rubric = extractRubric(content);
        coaching = extractCoaching(content);
      } catch {
        // feedback-calibration.md is missing
      }

      // Simulate probing follow-up for terse answers
      const words = answer.split(/\s+/).length;
      const hasSpecific = /\b(when|time|once|last|recently|project|incident|quarter|year|month|meeting|review|team|manager|client|customer)\b/i.test(answer);
      if ((words < 40 || !hasSpecific) && member.followUps?.[skill]) {
        console.log(`  💡 [Probing ${member.name.split(' ')[0]} for specifics on ${skill}]`);
        answer = `${answer}\n\nFollow-up detail: ${member.followUps[skill]}`;
      }

      const result = await scoreWithLLM(skill, rubric, answer, member.role);
      
      if (result.score === 0) {
        console.log(`  ✗ ${skill}: SCORING FAILED`);
        continue;
      }

      const modeTag = result.mode ? ` [${result.mode}]` : '';
      console.log(`  ${result.score >= 4 ? '●' : result.score >= 3 ? '◐' : '○'} ${skill.padEnd(35)} ${result.score}/5${modeTag}  ${result.evidence}`);
      scores.push({ skill, score: result.score, evidence: result.evidence, mode: result.mode, coaching });
    }

    if (!scores.length) continue;

    // Generate roadmap
    const roadmap = generateRoadmap(scores, member.role);

    // Generate HTML report
    const reportPath = generateReport({
      name: member.name,
      role: member.role,
      date: new Date().toISOString(),
      scores,
      roadmapText: roadmap,
    });

    const avg = (scores.reduce((a, s) => a + s.score, 0) / scores.length).toFixed(1);
    console.log(`\n  AVG: ${avg}/5.0  |  Report: ${reportPath}`);

    allResults.push({ name: member.name, role: member.role, scores, avg: parseFloat(avg), profile: member.profile });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TEAM ANALYSIS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  console.log('\n\n' + '═'.repeat(60));
  console.log('  TEAM ANALYSIS — POD MERIDIAN');
  console.log('═'.repeat(60));

  // Sort by avg descending
  allResults.sort((a, b) => b.avg - a.avg);
  console.log('\n  RANKING:');
  for (const r of allResults) {
    console.log(`  ${r.avg.toFixed(1)}  ${r.name.padEnd(20)} (${r.role})`);
  }

  // Domain averages per person
  const domains = ['Cognitive Mastery', 'Character Core', 'Trust Dynamics'];
  const domainSkills = {
    'Cognitive Mastery': ['First Principles Thinking', 'Decision-Making Under Uncertainty', 'Scenario Thinking', 'Feedback Calibration', 'Bayesian Updating'],
    'Character Core': ['Strategic Patience', 'Resilience', 'Strength of Character', 'Cognitive Decoupling', 'Execution with Reversibility'],
    'Trust Dynamics': ['Trust-Building', 'Ability to Influence', 'Narrative Framing', 'Tribal Intelligence', 'Confidence Calibration'],
  };

  console.log('\n  DOMAIN HEATMAP:');
  console.log(`  ${''.padEnd(22)} Cognitive  Character  Trust`);
  for (const r of allResults) {
    const domainAvgs = domains.map(d => {
      const skills = domainSkills[d];
      const matching = r.scores.filter(s => skills.includes(s.skill));
      if (!matching.length) return '  —';
      return (matching.reduce((a, s) => a + s.score, 0) / matching.length).toFixed(1).padStart(4);
    });
    console.log(`  ${r.name.padEnd(22)} ${domainAvgs.join('      ')}`);
  }

  // Mode distribution
  console.log('\n  MODE DISTRIBUTION:');
  for (const r of allResults) {
    const modes = {};
    for (const s of r.scores) {
      const m = s.mode || 'partial';
      modes[m] = (modes[m] || 0) + 1;
    }
    const modeStr = Object.entries(modes).map(([k, v]) => `${k}:${v}`).join('  ');
    console.log(`  ${r.name.padEnd(22)} ${modeStr}`);
  }

  // Save to history for team report
  const HISTORY_DIR = path.join(os.homedir(), '.stratum');
  const HISTORY_FILE = path.join(HISTORY_DIR, 'history.json');
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  let history = [];
  try { history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch {}
  for (const r of allResults) {
    history.push({
      timestamp: new Date().toISOString(),
      name: r.name, role: r.role, mode: 'full', domain: 'Full Stratum',
      scores: r.scores.map(s => ({ skill: s.skill, score: s.score, evidence: s.evidence, mode: s.mode })),
    });
  }
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

  // Generate team report
  const teamPath = generateTeamReport(allResults.map(r => r.name));
  if (teamPath) console.log(`\n  📊 Team report: ${teamPath}`);

  console.log('\n' + '═'.repeat(60));
  console.log('  SIMULATION COMPLETE');
  console.log('  Reports saved to: ~/.stratum/reports/');
  console.log('═'.repeat(60) + '\n');
}

simulateTeam().catch(console.error);
