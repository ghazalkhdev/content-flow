import type { ContentAsset, ContentAssetType, ContentItem } from "./types";

export interface ContentDetail {
  scenario: string;
  prompt: string;
}

export const contentDetails: Record<string, ContentDetail> = {
  c1: {
    scenario:
      "The launch blog post is the centerpiece of the Q3 go-to-market program. It needs to make Atlas feel like the obvious next step for teams drowning in spreadsheets — clearly framing the problem, the product, and the evidence. The post targets heads of analytics and operations who already know they have a reporting problem but haven't committed to a platform yet.\n\nThe tone should be confident and founder-energetic but precise: every product claim needs to be backed by a metric or a customer example. The closing section routes readers to the launch page and the demo request form.",
    prompt:
      'Write a launch announcement blog post for "Atlas", a real-time analytics platform.\n\nAudience: heads of analytics and operations evaluating platforms.\nTone: confident, energetic, precise. Avoid hype without evidence.\n\nStructure:\n1. Hook — the spreadsheet-to-nowhere problem, one concrete scenario\n2. What Atlas is — 3 core pillars (real-time dashboards, governed metrics, embeddable reports)\n3. Evidence — 2–3 customer outcomes with specific numbers\n4. What changed — new capabilities in this launch\n5. CTA — launch page + request a demo\n\nConstraints:\n- 1,600–1,900 words\n- H2 subheads, short paragraphs\n- One comparison table\n- No marketing clichés',
  },
  c2: {
    scenario:
      "Customer story video following three Atlas customers as they describe their before-and-after workflows. It needs to feel like a documentary, not a sales pitch — real screen recordings, honest narration, and patient pacing.\n\nThe primary cut targets YouTube, with a 60-second vertical version cut for LinkedIn and Instagram. Interview segments were filmed during the customer summit; narration will be stitched from the strongest quotes. Reviewers flagged the current cut's pacing in the middle — the “data-nerd” segment runs long and needs trimming.",
    prompt:
      "Draft a narration script for a 6-minute customer story video about real-time dashboards.\n\nSegments:\n1. Cold open (15s) — a manager staring at yesterday's numbers\n2. The workflow before — manual exports, Monday fire drills\n3. What changed — live dashboards, same-day decisions\n4. Customer voices — 3 short interview clips\n5. Close — the \"now vs. before\" moment\n\nVoice: warm, journalistic. No scripted corporate lines.\nDeliverables: narration script with timestamps, list of on-screen captions, 60-second vertical cut version.",
  },
  c3: {
    scenario:
      "Launch countdown teaser for LinkedIn. Five daily posts, one per feature, building toward launch week. Each post pairs a single feature with a small, real-world hook.\n\nEmma owns the series and wants each card to work as a standalone share even if someone misses earlier posts. The campaign stays cohesive through a consistent visual template, and the final post in the series links to the launch page.",
    prompt:
      "Generate a 5-post LinkedIn launch-countdown series, one post per day.\n\nEach post:\n- 90–140 words\n- One feature of Atlas: real-time dashboards, governed metrics, embeddable reports, alerting, data connectors\n- A concrete, relatable hook (one specific scenario)\n- A single visual idea for the card (keep a consistent template)\n- Hashtags: #Atlas #DataAnalytics #RealTime\n\nPost 5 must end with a CTA to the launch page.",
  },
  c4: {
    scenario:
      "Monthly newsletter issue. The playbook issue is meant to be a resource readers save and revisit — not just read and delete. Marcus is assembling the issue from team research on how high-performing content teams measure and iterate.\n\nThe issue balances tactical checklists with one longer analytical essay. It is the first issue to test a new “metrics that matter” pull-quote format in the header.",
    prompt:
      "Write a newsletter issue titled \"The Data-Driven Content Playbook\".\n\nSections:\n1. Editor's note (60 words) — why measurement beats gut feel\n2. Essay (500 words): the 4 metrics that actually predict content performance\n3. Playbook checklist — 10 concrete measurement habits\n4. One chart analysis\n5. CTA — join the content operations community\n\nTone: direct, practical, a little contrarian. Plain English, no jargon.",
  },
  c5: {
    scenario:
      "Long-form piece documenting the brand evolution. The rebrand ships in two weeks and this post is the narrative anchor for press and customers. It needs to explain why the identity changed without sounding defensive — covering the logo, the voice, and the reasoning.\n\nLena is editing and has asked for stronger transitions between the “why” and the “how” sections. The post should feel like a letter from the founding team, not a corporate announcement.",
    prompt:
      "Write a 2,400-word brand story post: \"Behind the Rebrand: Why We Evolved Our Identity\".\n\nStructure:\n1. Opening — the trigger moment that started the rebrand\n2. What was working / what wasn't\n3. The journey — research, rejected directions, the decision\n4. What changed — identity system, voice, principles\n5. What stays the same\n6. Close — a note from the founders\n\nVoice: honest, personal, first-person plural. No buzzwords.",
  },
  c6: {
    scenario:
      "Short-form teaser revealing the new identity. A 15-second cut that leads with the old mark dissolving into the new one, set to a pulse track. The teaser launches on Instagram and TikTok on reveal day, with a static version for the grid.\n\nEmma needs the shot list locked today so the animator can finish the render in time.",
    prompt:
      "Create the shot list and caption for a 15-second rebrand reveal teaser.\n\nVideo shots (15s):\n1. 0–2s: old logo on dark field, single light source\n2. 2–7s: slow zoom, texture builds behind the mark\n3. 7–12s: old mark dissolves, new mark resolves\n4. 12–15s: wordmark + tagline, sound hit\n\nCaption (max 120 chars) with 3 hashtags. Suggest a sound pairing (instrumental, no vocals).",
  },
  c7: {
    scenario:
      "Podcast episode in the Customer Spotlight series. Sarah hosts a conversation with two longtime customers about how the rebrand landed with their teams.\n\nThe episode is more reflective than a typical product episode — it covers trust, change fatigue, and how internal audiences reacted. The episode runs roughly 32 minutes. Show notes and a highlights clip need to be prepped for release.",
    prompt:
      "Prepare a 30–35 minute podcast episode: \"Customer Journey After the Rebrand\".\n\nOutline:\n1. Cold open — a 60-second clip with the best reaction quote\n2. Intro — why we're talking about the rebrand with customers\n3. Segment 1 — first reactions (10 min)\n4. Segment 2 — internal adoption and change fatigue (10 min)\n5. Segment 3 — what we'd do differently (8 min)\n6. Outro — links to the brand story post\n\nAlso write: 3 talking-point questions per segment, episode title options (3), show notes (150 words).",
  },
  c8: {
    scenario:
      "Definitive on-page SEO checklist and the pillar piece of the Evergreen SEO Hub. It went through three review rounds and a full rewrite of the internal-linking section before publishing.\n\nPublished last week. Tom has linked it from a dozen supporting posts, and the team is monitoring click-through from search for the first 30 days.",
    prompt:
      "Write a definitive on-page SEO checklist (3,000 words).\n\nFormat:\n1. What on-page SEO is (and isn't) — 400 words\n2. Checklist grouped by: technical basics, content, and internal linking\n3. Each item: what to do, why, and how to verify it\n4. Common mistakes and quick fixes\n\nRequirements: scannable with H3s, one checklist summary box, actionable examples. Direct, no-fluff tone.",
  },
  c9: {
    scenario:
      "Evergreen video on topic clusters, produced as part of the SEO Hub series. It's a whiteboard-style video that explains how to build and link topic clusters, using the Evergreen SEO Hub itself as the live example.\n\nThe current edit is 12 minutes; the goal is to cut it under 10 for watch-time. Review feedback asked for a clearer visual for the “pillar vs. cluster” relationship.",
    prompt:
      "Draft the script for a 9-minute whiteboard video on topic cluster strategy.\n\nSegments:\n1. Hook — why a blog post about one keyword isn't enough\n2. Pillar vs. cluster — 60-second visual explanation\n3. How to choose the pillar topic (research method)\n4. Building the cluster — mapping subtopics\n5. Internal linking structure\n6. Measuring success (30 days, 90 days)\n\nStyle: calm, explanatory. Use analogies. End with a CTA to the checklist post.",
  },
  c10: {
    scenario:
      "Newsletter recap issue on keyword research, built from a 45-minute team workshop and a walkthrough of the team's live keyword sheet.\n\nIt shipped on schedule and pulled strong open rates — the tool roundup section specifically drove signups. Good candidate for a follow-up “part two” on prioritization.",
    prompt:
      "Write a newsletter issue: \"Keyword Research Fundamentals\".\n\nContents:\n1. Editor's note (50 words)\n2. The method — how to build a keyword list from search queries, competitors, and existing content\n3. Tool walkthrough — 3 tools and what each is best for\n4. Live demo — annotated screenshot of the team's keyword sheet\n5. 3 mistakes to avoid\n6. CTA — download the keyword research template\n\nTone: practical workshop energy. Concrete steps, no theory-only.",
  },
  c11: {
    scenario:
      "Case study based on interviews with Acme's analytics team. Acme consolidated five disconnected reporting processes into Atlas and cut weekly reporting time by 80%.\n\nPriya is drafting from the interview transcript; the draft needs a stronger before/after narrative and one memorable stat in the opening. The case study will live on the sales site and be used in the bottom-of-funnel campaign.",
    prompt:
      "Write a case study: \"How Acme Corp Cut Reporting Time by 80%\".\n\nRequired structure:\n1. Headline with the 80% stat\n2. The company in 2 sentences\n3. The problem — 5 siloed reporting workflows, Monday fire drills\n4. The solution — what Acme built in Atlas (2–3 specific setups)\n5. The results — time saved, decisions accelerated, exact metrics\n6. A quote from the analytics lead\n7. CTA to request a walkthrough\n\nVoice: evidence-first. Keep it under 1,500 words.",
  },
  c12: {
    scenario:
      "Customer interview video for the spotlight series, filmed on-site with Acme's data team. Raw interviews run 40 minutes and will be cut to a tight 4-minute story.\n\nThe cut should follow the case study's arc but feel more personal — the team's real reactions and real dashboards. Diego is finishing the rough cut and needs the soundbite list for the graphics.",
    prompt:
      "Create an edit plan for a 4-minute customer interview video.\n\nFrom the raw interview, structure:\n1. Open on the \"before\" — spreadsheets, Monday reporting all-nighters\n2. The switch — who pushed for it and why\n3. Building in Atlas — 60s of screen recordings\n4. Results — the 80% number with a graphic\n5. One personal moment to close\n\nList the 5 best soundbites and suggested on-screen captions. Include timestamps for each.",
  },
  c13: {
    scenario:
      "Technical tutorial for developers, walking through building a real-time pipeline with streaming into Atlas. It published yesterday and is already the top-converting page on the dev site.\n\nThe tutorial is intentionally opinionated — one clear path, not a survey of options. Community feedback has been strong; a follow-up on failure handling is planned.",
    prompt:
      "Write a technical tutorial: \"Building a Real-Time Data Pipeline in 10 Steps\".\n\nRequirements:\n- Audience: senior engineers\n- 10 numbered steps, each with a code block (Python + SQL)\n- Architecture diagram described in words\n- Cover: ingestion, transformation, streaming to Atlas, alerting\n- Include a full end-to-end example with sample data\n- Note 3 common failure modes and how to handle them\n\nTone: direct, practical, minimal fluff. Target 2,800 words.",
  },
  c14: {
    scenario:
      "Podcast episode about the tooling developer advocacy teams use. Diego hosts Tom and an invited eng-advocate from a partner company. The conversation covers tooling, content cadence, and how to measure dev-community content.\n\nThe episode is in post-production; the intro needs tightening and the guest intro needs to be re-recorded due to background noise.",
    prompt:
      "Outline a 35-minute podcast episode: \"The Developer Content Stack\".\n\nSegments:\n1. Intros (2 min) — guest background, why this topic\n2. Tooling roundup (12 min) — docs, video, community tools\n3. Content cadence (10 min) — what actually moves devs\n4. Measuring dev content (8 min) — metrics that matter\n5. Rapid-fire close (3 min) — one takeaway each\n\nWrite intro copy (90 seconds) and 4 promo clips for social. Replace the guest intro due to the audio issue.",
  },
  c15: {
    scenario:
      "Bottom-of-funnel comparison content comparing Atlas head-to-head with legacy BI tools for teams in the evaluation stage. It's urgent because the sales team hands this link to every active evaluation.\n\nThe comparison must be credible — real setup times, real pricing structure, real limitations — or it backfires. Priya is waiting on final pricing figures to lock the table.",
    prompt:
      "Write a comparison piece: \"Atlas vs. Legacy BI: An Honest Comparison\".\n\nRequired:\n- Fairness: list strengths and limitations for both\n- Sections: setup time, pricing, dashboards, governed metrics, embedding, support\n- A comparison table with ratings and short notes\n- A \"when Atlas is the right choice\" and \"when it isn't\" section\n- Include real numbers: setup time, pricing structure\n\nTone: analytical, buyer-focused. No vendor smear. 2,000–2,200 words.",
  },
  c16: {
    scenario:
      "Monthly community roundup for Twitter/X and the community site. Curates the best community wins, member spotlights, and highlights from the past month.\n\nIt's a lower-priority piece that keeps the community loop alive — Emma gathers submissions from the community channels and threads them into a single roundup post. The summer edition has a lighter, more celebratory tone.",
    prompt:
      "Create the August community roundup post.\n\nInclude:\n1. Opening line (max 60 chars) welcoming summer wins\n2. 3–4 member spotlights with their own words quoted\n3. A \"best of\" thread — top community posts this month\n4. Upcoming events and programs\n5. Close with a prompt asking members to share their wins\n\nLength: ~200 words for the main post, plus thread items.",
  },
  c17: {
    scenario:
      "Deep-dive analysis of high-engagement social posts. Emma collected data from 40 top-performing posts across the brand's accounts and is turning the pattern into a teachable breakdown.\n\nThe piece is overdue — it was due three days ago and has been sitting in review. The first-pass draft over-indexes on clickbait tactics; reviewers want the honest mechanics, including the role of timing and luck.",
    prompt:
      "Write a social analysis piece: \"The Anatomy of a Viral Post\".\n\nStructure:\n1. Hook — one post that unexpectedly took off\n2. The data — what 40 top posts have in common (format, hook, length)\n3. The mechanics — hook, emotional payload, format fit\n4. The uncomfortable part — timing, platform algorithm, luck\n5. Takeaways — 4 things teams can actually control\n\nEvidence-based, honest, ~1,200 words. Include the data as a simple table.",
  },
  c18: {
    scenario:
      "Video recapping the summer releases and customer wins before the fall planning cycle. Diego is assembling the recap from existing footage and release notes.\n\nThe cut is behind schedule and was due yesterday. It should open with the biggest win and close with a forward look at fall. The team needs a shorter 90-second version for social as well.",
    prompt:
      "Cut a 3-minute summer product recap video.\n\nOrder:\n1. Biggest win of the summer first (the realtime dashboards GA)\n2. 3 release highlights, 20 seconds each\n3. Customer momentum — 2 quick stats\n4. Fall preview — 15 seconds\n\nAlso: a 90-second social cut and 3 thumbnail concepts.\n\nNarration voice: upbeat, product-marketing energy.",
  },
  c19: {
    scenario:
      "Monthly data newsletter rounding up insights and trends. This issue is due today and pulls together the team's picks: a new report on self-serve analytics, a debate on metric governance, and a tool benchmark.\n\nMarcus wants the digest to feel curated, not aggregated — each item needs a clear takeaway and a reason it matters.",
    prompt:
      "Write the August data digest newsletter.\n\nItems (each 80–120 words with a takeaway):\n1. Report: state of self-serve analytics — why adoption stalls\n2. Debate: metric governance — who owns the number\n3. Benchmark: dashboard tool performance — surprising result\n4. A longer read recommendation\n\nAdd: editor's note (50 words), subject line options (3), preheader text (40 chars).",
  },
  c20: {
    scenario:
      "The internal linking guide is the third pillar piece of the Evergreen SEO Hub. Tom is writing the prompt for the freelance writer — the guide needs to be repeatable, so a marketer can run the audit in a single afternoon using the checklist.\n\nIt sits alongside two already-shipped pieces — the on-page checklist and the topic cluster video — so the guide must cross-link to both and reinforce the hub's internal linking structure.",
    prompt:
      "Write an evergreen guide: \"Internal Linking Audit: A Step-by-Step Guide\".\n\nAudience: content marketers and SEO specialists.\n\nStructure:\n1. Why internal linking still matters (link equity + crawlability)\n2. Tools you need — a crawl tool, site: search, a spreadsheet\n3. Step-by-step audit — inventory existing links, find orphan pages, map link equity to pillar pages, fix thin clusters\n4. A repeatable 10-item checklist (scannable box)\n5. Common mistakes — nav-only links, over-optimized anchors\n\nRequirements:\n- Cross-link to the on-page SEO checklist and the topic cluster video\n- 2,200 words, H2/H3 subheads, concrete examples\n- Direct, no-fluff tone",
  },
  c21: {
    scenario:
      "Sarah is pitching a planning piece for the developer blog. The idea came out of an internal offsite where the advocacy team compared how they schedule shipping content versus community work.\n\nIt is still just a topic card — no brief yet — but it is a strong candidate for the fall editorial calendar, since the developer podcast on the same theme is already in production.",
    prompt:
      "Write a blog post: \"How Developer Advocacy Teams Plan Their Content Calendar\".\n\nAudience: developer advocacy leads and content managers at B2B dev tools.\n\nStructure:\n1. The tension — shipping cadence vs. community time\n2. The calendar method — buckets (product, education, community) instead of a day-grid\n3. Reserving 30% capacity for reactive work\n4. Templates — a simple quarterly planning sheet\n5. Mistakes to avoid and how to recover\n\nTone: practical, first-person from a team that has been through it. 1,600 words.",
  },
  c22: {
    scenario:
      "Launch-week behind-the-scenes series for Instagram Stories and the feed. Emma is structuring the week so each day highlights a different part of the team preparing for the Atlas launch — design, engineering, content, and the launch page itself.\n\nThe series needs to feel spontaneous rather than staged and should tie back to the countdown series already running on LinkedIn.",
    prompt:
      "Plan a 5-day behind-the-scenes series for Atlas launch week on Instagram.\n\nFormat: one feed post plus Stories each day.\n\nDays:\n1. Launch page build — timelapse plus a soundbite from the designer\n2. Design team — rejected concepts and the final direction\n3. Content team — final QA pass on the launch post\n4. Engineering — a live demo of realtime dashboards\n5. Launch day — countdown to go-live\n\nFor each day: a caption (max 120 chars), one visual idea, and one Stories poll or quiz to drive replies. Cross-reference the LinkedIn countdown series.",
  },
};

const assetTemplates: Record<
  ContentItem["type"],
  Array<{ type: ContentAssetType; suffix: string; ext: string; size: string; meta: string }>
> = {
  blog: [
    { type: "document", suffix: "final-draft", ext: "md", size: "8 KB", meta: "3 pages" },
    { type: "image", suffix: "hero", ext: "png", size: "1.8 MB", meta: "2400 × 1260" },
    { type: "document", suffix: "seo-review", ext: "pdf", size: "1.2 MB", meta: "review notes" },
    { type: "image", suffix: "og-card", ext: "png", size: "640 KB", meta: "1200 × 630" },
  ],
  video: [
    { type: "video", suffix: "final-cut", ext: "mov", size: "128 MB", meta: "4K · 3:42" },
    { type: "image", suffix: "thumbnail", ext: "jpg", size: "820 KB", meta: "1920 × 1080" },
    { type: "document", suffix: "script-v2", ext: "pdf", size: "210 KB", meta: "8 pages" },
    { type: "video", suffix: "captions", ext: "srt", size: "6 KB", meta: "EN" },
  ],
  social: [
    { type: "image", suffix: "post-v1", ext: "png", size: "1.1 MB", meta: "1080 × 1080" },
    { type: "image", suffix: "carousel", ext: "jpg", size: "980 KB", meta: "1080 × 1350" },
    { type: "video", suffix: "teaser", ext: "mp4", size: "24 MB", meta: "0:15" },
    { type: "document", suffix: "caption", ext: "md", size: "1 KB", meta: "copy" },
  ],
  newsletter: [
    { type: "document", suffix: "final", ext: "md", size: "12 KB", meta: "4 pages" },
    { type: "image", suffix: "header", ext: "png", size: "740 KB", meta: "1600 × 900" },
    { type: "document", suffix: "a-b-tests", ext: "csv", size: "4 KB", meta: "results" },
    { type: "image", suffix: "cta-banner", ext: "png", size: "420 KB", meta: "1200 × 400" },
  ],
  "case-study": [
    { type: "document", suffix: "draft", ext: "md", size: "9 KB", meta: "5 pages" },
    { type: "document", suffix: "final", ext: "pdf", size: "1.1 MB", meta: "print-ready" },
    { type: "image", suffix: "quote-cards", ext: "png", size: "1.6 MB", meta: "1600 × 900" },
    { type: "image", suffix: "logo-pack", ext: "svg", size: "80 KB", meta: "vectors" },
  ],
  podcast: [
    { type: "audio", suffix: "episode-master", ext: "wav", size: "88 MB", meta: "32:14" },
    { type: "audio", suffix: "raw-interview", ext: "wav", size: "120 MB", meta: "41:07" },
    { type: "document", suffix: "show-notes", ext: "md", size: "3 KB", meta: "2 pages" },
    { type: "image", suffix: "episode-art", ext: "jpg", size: "2.1 MB", meta: "3000 × 3000" },
  ],
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function getContentAssets(item: ContentItem): ContentAsset[] {
  const templates = assetTemplates[item.type] ?? assetTemplates.blog;
  const slug = slugify(item.title);
  return templates.map((t, i) => ({
    id: `${item.id}-asset-${i + 1}`,
    name: `${slug}-${t.suffix}.${t.ext}`,
    type: t.type,
    size: t.size,
    meta: t.meta,
    updatedAt: item.updatedAt,
  }));
}
