import { useEffect, useMemo, useState } from 'react';
import {
  Award, BookOpen, Check, ChevronRight, CircleHelp, Clock3, Flame, Footprints,
  Home, Leaf, Lightbulb, ListChecks, Menu, Medal, Recycle, RotateCcw,
  ShieldCheck, Sparkles, Star, Trophy, Users, X, Zap,
} from 'lucide-react';

const topics = [
  { id: 'environment', title: 'Environment', emoji: '🌱', color: 'green', icon: Leaf, summary: 'Care for nature, animals, and the air we share.', why: 'A healthy planet gives everyone clean air, water, and places to play.', examples: ['Plant or care for a tree', 'Use a bottle again instead of buying plastic', 'Walk, cycle, or share a ride'] },
  { id: 'safety', title: 'Road Safety', emoji: '🚦', color: 'orange', icon: ShieldCheck, summary: 'Stay alert and help everyone get home safely.', why: 'Small safe choices protect pedestrians, cyclists, and drivers.', examples: ['Cross at a zebra crossing', 'Wear a helmet when cycling', 'Wait for the green walking signal'] },
  { id: 'cleanliness', title: 'Cleanliness', emoji: '🗑️', color: 'blue', icon: Recycle, summary: 'Keep shared spaces fresh, healthy, and welcoming.', why: 'Clean places are healthier and show respect for everyone who uses them.', examples: ['Use the right bin', 'Pick up litter safely', 'Leave your desk ready for the next person'] },
  { id: 'helping', title: 'Helping Others', emoji: '🤝', color: 'purple', icon: Users, summary: 'Notice when someone needs support and lend a hand.', why: 'Kind actions make people feel safe, included, and valued.', examples: ['Share supplies', 'Include someone in a game', 'Ask an adult when someone needs extra help'] },
  { id: 'community', title: 'Community', emoji: '🏙️', color: 'teal', icon: Home, summary: 'Work together to make your neighborhood better.', why: 'Communities thrive when people listen, participate, and care for shared places.', examples: ['Take part in a clean-up', 'Respect quiet hours', 'Say hello to a neighbor'] },
  { id: 'citizenship', title: 'Citizenship', emoji: '🏛️', color: 'yellow', icon: Award, summary: 'Be fair, responsible, and ready to make a difference.', why: 'Good citizens make thoughtful choices even when nobody is watching.', examples: ['Follow fair rules', 'Speak up kindly when something is wrong', 'Learn about your community'] },
];

const challenges = [
  { id: 'bin', title: 'Bin it right', description: 'Put a piece of waste in the correct recycling or general-waste bin.', difficulty: 'Easy', points: 20, topic: 'cleanliness', icon: Recycle },
  { id: 'water', title: 'Brush smart', description: 'Turn off the tap while brushing your teeth today.', difficulty: 'Easy', points: 20, topic: 'environment', icon: Zap },
  { id: 'help', title: 'Lend a hand', description: 'Help someone who needs assistance with a small task.', difficulty: 'Medium', points: 20, topic: 'helping', icon: Users },
  { id: 'classroom', title: 'Classroom reset', description: 'Leave your classroom cleaner than you found it.', difficulty: 'Easy', points: 20, topic: 'cleanliness', icon: BookOpen },
  { id: 'lights', title: 'Switch it off', description: 'Turn off lights or fans in an empty room.', difficulty: 'Easy', points: 20, topic: 'environment', icon: Lightbulb },
  { id: 'property', title: 'Protect shared spaces', description: 'Treat a public item or place with extra care today.', difficulty: 'Medium', points: 20, topic: 'community', icon: Home },
  { id: 'traffic', title: 'Safety first', description: 'Follow one traffic rule carefully on your next journey.', difficulty: 'Medium', points: 20, topic: 'safety', icon: ShieldCheck },
];

const questions = [
  { question: 'You finish a snack in the park. What should you do with the wrapper?', options: ['Hide it under a bench', 'Put it in the correct bin', 'Leave it for someone else'], answer: 1, explanation: 'Using the right bin keeps shared spaces healthy and makes recycling possible.' },
  { question: 'What is the safest way to cross a busy road?', options: ['Run between parked cars', 'Use a zebra crossing and look both ways', 'Follow a stranger across'], answer: 1, explanation: 'A crossing makes you easier to see. Stop, look both ways, and cross when it is safe.' },
  { question: 'How can you show respect for public property?', options: ['Write on a bus seat', 'Use things carefully and leave them ready for others', 'Break a button because it is fun'], answer: 1, explanation: 'Public things belong to everyone, so caring for them helps the whole community.' },
  { question: 'A classmate drops their books. What is a civic choice?', options: ['Laugh and walk away', 'Help pick them up', 'Hide one book'], answer: 1, explanation: 'Helping someone feel supported is a simple way to build a caring community.' },
  { question: 'Which action saves water while brushing?', options: ['Keep the tap running', 'Turn the tap off until rinsing', 'Use a new cup each minute'], answer: 1, explanation: 'Turning off the tap can save many litres of clean water every day.' },
  { question: 'What should you do when leaving an empty room?', options: ['Turn off unnecessary lights', 'Turn on every light', 'Leave devices running'], answer: 0, explanation: 'Saving electricity reduces waste and helps protect the environment.' },
  { question: 'Which item usually belongs in recycling?', options: ['A clean cardboard box', 'A dirty tissue', 'Food scraps in a plastic bag'], answer: 0, explanation: 'Clean cardboard can be processed into new paper products.' },
  { question: 'Why do we wait our turn in a queue?', options: ['To make the line longer', 'To be fair and organized', 'So friends can skip ahead'], answer: 1, explanation: 'Queue discipline gives everyone a fair turn and prevents pushing or arguments.' },
  { question: 'Which choice helps protect the environment?', options: ['Use a reusable water bottle', 'Drop litter near a tree', 'Waste food for fun'], answer: 0, explanation: 'Reusable items reduce waste and help keep nature clean.' },
  { question: 'What does being responsible in a community mean?', options: ['Only care about yourself', 'Follow rules and care about shared spaces', 'Wait for others to solve every problem'], answer: 1, explanation: 'Responsible citizens make choices that keep people and places safe for everyone.' },
];

const scenarios = [
  { id: 'bottle', title: 'Bottle in the park', situation: 'You are in a park and see someone throwing a plastic bottle on the ground. What would you do?', options: ['Ignore it', 'Politely ask them to use the bin', 'Throw another bottle'], answer: 1, explanation: 'A kind reminder can keep the park clean without starting an argument.', principle: 'Respect for shared spaces' },
  { id: 'queue', title: 'The long line', situation: 'You are waiting for your turn, but your friend asks to jump ahead. What would you do?', options: ['Let everyone skip', 'Explain that waiting is fair', 'Push to the front too'], answer: 1, explanation: 'Following the queue keeps things fair for every person waiting.', principle: 'Fairness and patience' },
  { id: 'water', title: 'Running tap', situation: 'You notice a tap running in an empty washroom. What would you do?', options: ['Turn it off if safe', 'Walk away', 'Make it run faster'], answer: 0, explanation: 'Stopping waste protects a precious shared resource. Tell an adult if the tap is broken.', principle: 'Caring for resources' },
  { id: 'new-student', title: 'A new face', situation: 'A new student is sitting alone during break. What would you do?', options: ['Invite them to join you', 'Tell them to stay alone', 'Make fun of them'], answer: 0, explanation: 'A friendly welcome helps people feel included and confident.', principle: 'Inclusion and kindness' },
  { id: 'crossing', title: 'Safe crossing', situation: 'Your friends want to cross before the signal changes because there are no cars. What would you do?', options: ['Wait for the safe signal', 'Run across with them', 'Close your eyes and walk'], answer: 0, explanation: 'Good safety habits matter even when the road looks quiet.', principle: 'Safety and responsibility' },
  { id: 'bench', title: 'The park bench', situation: 'You see someone scratching their name into a public bench. What would you do?', options: ['Join them', 'Ask them to stop and tell an adult', 'Scratch a bigger name'], answer: 1, explanation: 'Shared property should stay useful and welcoming for everyone.', principle: 'Respect for public property' },
];

const achievements = [
  { id: 'green', title: 'Green Starter', description: 'Complete an environment activity.', icon: Leaf, test: (p) => p.completedTopics.includes('environment') || p.completedChallenges.some((id) => challenges.find((c) => c.id === id)?.topic === 'environment') },
  { id: 'clean', title: 'Clean Community', description: 'Complete 3 cleanliness challenges.', icon: Recycle, test: (p) => p.completedChallenges.filter((id) => challenges.find((c) => c.id === id)?.topic === 'cleanliness').length >= 3 },
  { id: 'safety', title: 'Safety First', description: 'Complete the road-safety challenge and learning topic.', icon: ShieldCheck, test: (p) => p.completedTopics.includes('safety') && p.completedChallenges.includes('traffic') },
  { id: 'helping', title: 'Helping Hand', description: 'Complete 3 helping-others activities.', icon: Users, test: (p) => p.completedChallenges.filter((id) => challenges.find((c) => c.id === id)?.topic === 'helping').length >= 3 || p.completedScenarios.length >= 3 },
  { id: 'explorer', title: 'Civic Explorer', description: 'Earn 500 Civic Points.', icon: Trophy, test: (p) => p.points >= 500 },
];

const initialProgress = { points: 0, completedChallenges: [], completedTopics: [], completedScenarios: [], quizHighScore: 0, streak: 1 };
const loadProgress = () => {
  try { return { ...initialProgress, ...JSON.parse(localStorage.getItem('civic-quest-progress') || '{}') }; } catch { return initialProgress; }
};

function App() {
  const [page, setPage] = useState('home');
  const [progress, setProgress] = useState(loadProgress);
  const [quizState, setQuizState] = useState({ index: 0, selected: null, score: 0, finished: false });
  const [notice, setNotice] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { localStorage.setItem('civic-quest-progress', JSON.stringify(progress)); }, [progress]);
  useEffect(() => { if (notice) { const timer = setTimeout(() => setNotice(''), 2600); return () => clearTimeout(timer); } }, [notice]);

  const level = Math.min(4, Math.floor(progress.points / 100) + 1);
  const levelNames = ['Civic Beginner', 'Community Helper', 'Civic Explorer', 'Community Champion'];
  const topicsDone = progress.completedTopics.length;
  const earnedBadges = achievements.filter((a) => a.test(progress));
  const addPoints = (amount, message) => { setProgress((p) => ({ ...p, points: p.points + amount })); setNotice(message); };
  const completeChallenge = (id) => {
    const item = challenges.find((c) => c.id === id);
    if (!item || progress.completedChallenges.includes(id)) return;
    setProgress((p) => ({ ...p, points: p.points + item.points, completedChallenges: [...p.completedChallenges, id] }));
    setNotice(`Challenge complete! +${item.points} points`);
  };
  const completeTopic = (id) => {
    if (progress.completedTopics.includes(id)) return;
    setProgress((p) => ({ ...p, points: p.points + 5, completedTopics: [...p.completedTopics, id] }));
    setNotice('Topic learned! +5 points');
  };
  const completeScenario = (scenario, selected) => {
    if (progress.completedScenarios.includes(scenario.id)) return;
    setProgress((p) => ({ ...p, points: p.points + (selected === scenario.answer ? 10 : 0), completedScenarios: [...p.completedScenarios, scenario.id] }));
    setNotice(selected === scenario.answer ? 'Great civic choice! +10 points' : 'Good thinking — keep practicing!');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'challenges', label: 'Challenges', icon: ListChecks },
    { id: 'quiz', label: 'Quiz', icon: CircleHelp },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];
  const navigate = (id) => { setPage(id); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Leaf size={21} /></div><div><strong>Civic Quest</strong><span>Learn. Play. Act.</span></div><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
        <nav aria-label="Main navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => navigate(id)}><Icon size={19} /><span>{label}</span>{page === id && <span className="nav-dot" />}</button>)}</nav>
        <div className="sidebar-card"><Sparkles size={18} /><div><strong>Keep going!</strong><p>Every good choice makes a difference.</p></div></div>
        <div className="sidebar-footer"><div className="mini-avatar">CE</div><div><strong>Civic Explorer</strong><span>Level {level}</span></div><button className="profile-button" onClick={() => navigate('profile')} aria-label="View profile"><ChevronRight size={17} /></button></div>
      </aside>
      {menuOpen && <button className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      <main className="main-content">
        <header className="topbar"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button><div className="mobile-brand"><div className="brand-mark"><Leaf size={17} /></div><strong>Civic Quest</strong></div><div className="topbar-actions"><div className="points-pill"><Star size={16} fill="currentColor" /> {progress.points} <span>points</span></div><button className="avatar-button" onClick={() => navigate('profile')}>CE</button></div></header>
        <div className="page-wrap">
          {page === 'home' && <HomePage progress={progress} level={level} levelName={levelNames[level - 1]} topicsDone={topicsDone} badges={earnedBadges.length} navigate={navigate} />}
          {page === 'learn' && <LearnPage progress={progress} onComplete={completeTopic} />}
          {page === 'challenges' && <ChallengesPage progress={progress} onComplete={completeChallenge} />}
          {page === 'quiz' && <QuizPage state={quizState} setState={setQuizState} progress={progress} setProgress={setProgress} />}
          {page === 'achievements' && <AchievementsPage progress={progress} />}
          {page === 'profile' && <ProfilePage progress={progress} level={level} levelName={levelNames[level - 1]} badges={earnedBadges.length} />}
        </div>
      </main>
      {notice && <div className="toast"><Check size={17} /> {notice}</div>}
      <nav className="bottom-nav" aria-label="Mobile navigation">{navItems.slice(0, 5).map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}><Icon size={19} /><span>{label}</span></button>)}</nav>
    </div>
  );
}

function PageHeader({ eyebrow, title, description, action }) { return <div className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>; }
function StatCard({ icon: Icon, label, value, note, color }) { return <div className={`stat-card ${color}`}><div className="stat-icon"><Icon size={20} /></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>; }
function HomePage({ progress, level, levelName, topicsDone, badges, navigate }) {
  const nextLevel = ((progress.points % 100) / 100) * 100;
  const featured = challenges.find((c) => !progress.completedChallenges.includes(c.id)) || challenges[0];
  const FeaturedIcon = featured.icon;
  return <><div className="hero"><div className="hero-copy"><span className="eyebrow light">Tuesday, September 22</span><h1>Welcome, Civic Explorer! <span>👋</span></h1><p>Learn something new, make a good choice, and grow your community one quest at a time.</p><div className="hero-actions"><button className="button primary light-button" onClick={() => navigate('learn')}>Start learning <ChevronRight size={17} /></button><button className="text-button light-text" onClick={() => navigate('challenges')}>View challenges</button></div></div><div className="hero-art"><div className="sun"></div><div className="hill hill-back"></div><div className="hill hill-front"></div><div className="hero-illustration">🌎</div><div className="spark spark-one">✦</div><div className="spark spark-two">✦</div></div></div>
    <section className="stats-grid"><StatCard icon={Star} label="Civic points" value={progress.points} note="Keep it up!" color="gold" /><StatCard icon={Zap} label="Current level" value={`Level ${level}`} note={levelName} color="teal" /><StatCard icon={Flame} label="Learning streak" value={`${progress.streak} day${progress.streak === 1 ? '' : 's'}`} note="Great momentum" color="orange" /><StatCard icon={Medal} label="Badges earned" value={`${badges}/5`} note="Unlock more" color="purple" /></section>
    <div className="content-grid dashboard-grid"><section className="panel challenge-feature"><div className="section-heading"><div><span className="eyebrow">Today's quest</span><h2>Make a difference today</h2></div><button className="icon-link" onClick={() => navigate('challenges')} aria-label="See all challenges"><ChevronRight size={18} /></button></div><div className="featured-challenge"><div className="featured-icon"><FeaturedIcon size={28} /></div><div className="featured-copy"><span className="tag">{featured.difficulty} · {featured.points} pts</span><h3>{featured.title}</h3><p>{featured.description}</p></div><button className="button small-button" onClick={() => navigate('challenges')}>Take quest</button></div></section><section className="panel progress-panel"><div className="section-heading"><div><span className="eyebrow">Your journey</span><h2>Level progress</h2></div><Trophy size={20} className="heading-icon" /></div><div className="level-row"><div><strong>Level {level}</strong><span>{levelName}</span></div><span className="level-count">{progress.points % 100}/100 XP</span></div><div className="progress-track"><div style={{ width: `${nextLevel || 4}%` }} /></div><p className="muted">{100 - (progress.points % 100)} points to your next level</p><div className="journey-steps"><span className="done"><Check size={13} /></span><i></i><span className={level > 1 ? 'done' : ''}>{level > 1 ? <Check size={13} /> : 2}</span><i></i><span className={level > 2 ? 'done' : ''}>{level > 2 ? <Check size={13} /> : 3}</span><i></i><span className={level > 3 ? 'done' : ''}>{level > 3 ? <Check size={13} /> : 4}</span></div></section></div>
    <section className="section-block"><div className="section-heading"><div><span className="eyebrow">Explore & grow</span><h2>Learn → Play → Take action</h2></div><button className="text-button" onClick={() => navigate('learn')}>See all topics <ChevronRight size={16} /></button></div><div className="topic-mini-grid">{topics.slice(0, 4).map((topic) => <button className="topic-mini" key={topic.id} onClick={() => navigate('learn')}><span className={`topic-emoji ${topic.color}`}>{topic.emoji}</span><strong>{topic.title}</strong><span>{topic.summary}</span></button>)}</div></section></>;
}

function LearnPage({ progress, onComplete }) { return <><PageHeader eyebrow="Build your knowledge" title="Learn the basics" description="Small everyday actions can create a kinder, safer, cleaner community." /><div className="topic-grid">{topics.map((topic) => <article className="topic-card" key={topic.id}><div className="topic-card-top"><span className={`topic-emoji large ${topic.color}`}>{topic.emoji}</span><span className={`completion ${progress.completedTopics.includes(topic.id) ? 'complete' : ''}`}>{progress.completedTopics.includes(topic.id) ? <><Check size={13} /> Learned</> : '5 pts'}</span></div><h2>{topic.title}</h2><p className="topic-summary">{topic.summary}</p><div className="topic-detail"><strong>Why it matters</strong><p>{topic.why}</p><strong>Good civic choices</strong><ul>{topic.examples.map((example) => <li key={example}><Check size={14} />{example}</li>)}</ul></div><button className={`button full-button ${progress.completedTopics.includes(topic.id) ? 'completed-button' : ''}`} disabled={progress.completedTopics.includes(topic.id)} onClick={() => onComplete(topic.id)}>{progress.completedTopics.includes(topic.id) ? 'Topic completed' : 'Mark as learned'} {!progress.completedTopics.includes(topic.id) && <ChevronRight size={16} />}</button></article>)}</div></>; }

function ChallengesPage({ progress, onComplete }) { return <><PageHeader eyebrow="Take action" title="Daily challenges" description="Ready for a real-world quest? Pick one small action and make it count." action={<div className="challenge-total"><Flame size={18} /><strong>{progress.completedChallenges.length}/{challenges.length}</strong><span>completed</span></div>} /><div className="challenge-list">{challenges.map((challenge) => { const done = progress.completedChallenges.includes(challenge.id); const Icon = challenge.icon; return <article className={`challenge-row ${done ? 'done' : ''}`} key={challenge.id}><div className={`challenge-icon ${challenge.topic}`}><Icon size={22} /></div><div className="challenge-info"><div className="challenge-meta"><span className="tag">{challenge.difficulty}</span><span>{challenge.points} points</span></div><h2>{challenge.title}</h2><p>{challenge.description}</p></div><button className={`button challenge-button ${done ? 'completed-button' : ''}`} onClick={() => onComplete(challenge.id)} disabled={done}>{done ? <><Check size={16} /> Done</> : 'Complete'}</button></article>; })}</div><div className="tip-banner"><Sparkles size={20} /><div><strong>Quest tip</strong><p>Choose actions you can repeat. Civic sense grows through practice!</p></div></div></>; }

function QuizPage({ state, setState, progress, setProgress }) {
  const q = questions[state.index];
  const choose = (index) => { if (state.selected !== null) return; setState({ ...state, selected: index, score: state.score + (index === q.answer ? 1 : 0) }); };
  const next = () => { if (state.index === questions.length - 1) { const finalScore = state.score; setProgress((p) => ({ ...p, points: p.points + finalScore * 10, quizHighScore: Math.max(p.quizHighScore, finalScore) })); setState({ ...state, finished: true }); } else setState({ ...state, index: state.index + 1, selected: null }); };
  const reset = () => setState({ index: 0, selected: null, score: 0, finished: false });
  if (state.finished) { const percentage = Math.round((state.score / questions.length) * 100); return <div className="quiz-result panel"><div className="result-icon"><Trophy size={38} /></div><span className="eyebrow">Quiz complete</span><h1>You're a civic star!</h1><p>You made thoughtful choices and learned along the way.</p><div className="score-circle"><strong>{percentage}%</strong><span>{state.score} / {questions.length} correct</span></div><div className="result-stats"><div><strong>+{state.score * 10}</strong><span>points earned</span></div><div><strong>{progress.quizHighScore}</strong><span>best score</span></div></div><button className="button primary" onClick={reset}><RotateCcw size={17} /> Try again</button></div>; }
  return <><PageHeader eyebrow="Test your civic know-how" title="Civic quiz" description="One question at a time. Choose the kind choice, then discover why it matters." /><div className="quiz-layout"><section className="quiz-card panel"><div className="quiz-top"><span>Question {state.index + 1} of {questions.length}</span><span className="quiz-points"><Star size={14} /> +10 points each</span></div><div className="quiz-progress"><div style={{ width: `${((state.index + 1) / questions.length) * 100}%` }} /></div><h2>{q.question}</h2><div className="quiz-options">{q.options.map((option, index) => { const selected = state.selected === index; const correct = state.selected !== null && index === q.answer; return <button key={option} className={`quiz-option ${selected ? (index === q.answer ? 'correct' : 'wrong') : ''} ${correct ? 'correct-answer' : ''}`} onClick={() => choose(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{state.selected !== null && correct && <Check size={18} />}{state.selected !== null && selected && index !== q.answer && <X size={18} />}</button>; })}</div>{state.selected !== null && <div className={`answer-feedback ${state.selected === q.answer ? 'good' : 'try'}`}><strong>{state.selected === q.answer ? 'That’s right!' : 'Good try!'}</strong><p>{q.explanation}</p></div>}<div className="quiz-footer"><span>{state.selected === null ? 'Pick an answer to continue' : state.selected === q.answer ? 'Nice work!' : 'The highlighted answer is correct'}</span><button className="button primary" disabled={state.selected === null} onClick={next}>{state.index === questions.length - 1 ? 'See result' : 'Next question'} <ChevronRight size={16} /></button></div></section><aside className="quiz-side panel"><div className="quiz-side-icon"><Lightbulb size={22} /></div><h3>Think like a civic hero</h3><p>There can be many kind choices in real life. This quiz helps you practice spotting the safest and fairest one.</p><div className="quiz-record"><span>Your best score</span><strong>{progress.quizHighScore}/{questions.length}</strong></div></aside></div></>;
}

function AchievementsPage({ progress }) { return <><PageHeader eyebrow="Celebrate your progress" title="Achievements" description="Every badge tells a story about how you are helping your community." /><div className="achievement-hero"><div className="achievement-hero-icon"><Award size={28} /></div><div><strong>{achievements.filter((a) => a.test(progress)).length} of {achievements.length} badges unlocked</strong><p>Keep exploring to collect them all!</p></div><div className="achievement-meter"><div style={{ width: `${(achievements.filter((a) => a.test(progress)).length / achievements.length) * 100}%` }} /></div></div><div className="achievement-grid">{achievements.map((achievement) => { const unlocked = achievement.test(progress); const Icon = achievement.icon; return <article className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`} key={achievement.id}><div className="achievement-icon"><Icon size={25} /></div><div><h2>{achievement.title}</h2><p>{achievement.description}</p></div><span className="badge-status">{unlocked ? <><Check size={14} /> Unlocked</> : 'Locked'}</span></article>; })}</div></>; }

function ProfilePage({ progress, level, levelName, badges }) { return <><PageHeader eyebrow="Your civic journey" title="Progress profile" description="A snapshot of the positive difference you are making." /><div className="profile-overview panel"><div className="profile-avatar">CE</div><div className="profile-main"><span className="eyebrow">Civic Explorer</span><h2>{levelName}</h2><div className="profile-progress"><div className="progress-track"><div style={{ width: `${(progress.points % 100) || (progress.points ? 100 : 0)}%` }} /></div><span>{progress.points % 100}/100 XP to next level</span></div></div><div className="profile-level"><Trophy size={19} /><span>Level {level}</span></div></div><div className="profile-stats"><StatCard icon={Star} label="Total points" value={progress.points} note="Civic points" color="gold" /><StatCard icon={Trophy} label="Quiz high score" value={`${progress.quizHighScore}/10`} note="Best attempt" color="teal" /><StatCard icon={ListChecks} label="Challenges" value={progress.completedChallenges.length} note="Completed" color="orange" /><StatCard icon={BookOpen} label="Topics learned" value={`${progress.completedTopics.length}/6`} note="Keep exploring" color="purple" /><StatCard icon={Medal} label="Badges earned" value={`${badges}/5`} note="Achievement trail" color="blue" /><StatCard icon={Flame} label="Current streak" value={`${progress.streak} day`} note="Nice consistency" color="green" /></div><div className="profile-note"><Footprints size={20} /><div><strong>Progress is built one choice at a time.</strong><p>Keep learning, play the quiz, and turn your knowledge into action.</p></div></div></>; }

export default App;
