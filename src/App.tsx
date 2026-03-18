import { useState, useEffect } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

const curiosities = [
  // Science
  "Why do cats purr?",
  "Why do we yawn?",
  "Why do octopuses have three hearts?",
  "Why does ice float on water?",
  "Why do we dream?",
  "How do rockets escape Earth's gravity?",
  "Why do stars twinkle?",
  "Why does lightning happen?",
  "Why do humans need sleep?",
  "Why is the sky blue?",
  "Why do magnets attract certain metals?",
  "Why do we get hiccups?",
  "How do mirrors reflect images?",
  "How does sound travel through air?",
  "Why do volcanoes erupt?",
  "Why do onions make us cry?",
  "Why do some people have blue eyes?",
  "What causes a rainbow to form?",
  "Why do we blush?",
  "Why does metal rust?",
  "Why does snow appear white?",
  "Why do we have different blood types?",
  "How do vaccines teach the immune system to fight disease?",
  "Why does hot water sometimes freeze faster than cold water?",
  "How does DNA carry the blueprint for all living things?",
  "Why do wounds close and heal on their own?",
  "How do muscles grow stronger after exercise?",
  "How does the human brain store and retrieve memories?",
  "Why do we have an appendix if we don't seem to need it?",
  "How does anesthesia make people temporarily unconscious?",
  "Why do we sneeze?",
  "How does the body fight off infections?",
  // History
  "Why did the Roman Empire fall?",
  "How were the Egyptian pyramids built without modern machinery?",
  "How did ancient sailors navigate oceans without GPS?",
  "Why did the Renaissance begin in Italy?",
  "How was writing first invented?",
  "Why did the dinosaurs go extinct 66 million years ago?",
  "How did the printing press change civilization?",
  "Why was the Great Wall of China built?",
  "How did humans first discover how to make fire?",
  // Technology
  "How does WiFi work?",
  "How does GPS know your location?",
  "How do submarines dive?",
  "How does a camera capture an image?",
  "How do 3D printers build objects?",
  "How do wind turbines generate electricity?",
  "How does a microwave heat food?",
  "How do touchscreens know where your finger is?",
  "Why do computers use binary code?",
  "How does Bluetooth transmit data without wires?",
  "Why do batteries eventually run out of power?",
  "How does encryption keep your data secure online?",
  "How do self-driving cars perceive the road?",
  "How does a solar panel convert sunlight into electricity?",
  "Why does the internet never fully go down?",
  "How does a microchip hold billions of transistors?",
  "How does facial recognition software identify people?",
  // Space & Nature
  "Why does the Moon always face Earth?",
  "Why do leaves change color in autumn?",
  "Why do whales sing?",
  "Why do birds migrate?",
  "Why do fireflies glow?",
  "How do bees make honey?",
  "Why do planets orbit the Sun?",
  "Why do some animals hibernate?",
  "How does a caterpillar become a butterfly?",
  "Why do spiders spin webs?",
  "How do trees communicate underground?",
  "How do airplanes stay airborne?",
  "How do chameleons change color?",
  "Why is the ocean salty?",
  "How do fish breathe underwater?",
  "Why do some animals glow in the dark?",
  "How do black holes form?",
  "Why does Mars appear red?",
  "How do the Northern Lights form?",
  "Why does the Moon cause ocean tides?",
  "Why is Saturn surrounded by rings?",
  "How do coral reefs form?",
  "Why do deserts get freezing cold at night despite scorching days?",
  "How far away is the nearest star to our Sun?",
  "Why does Earth have seasons?",
  "How do hurricanes form over the ocean?",
  // Random Facts
  "Why do airplanes fly?",
  "Why do we have fingerprints?",
  "Why are fingerprints unique?",
  "How is glass made?",
  "Why do some fruits change color when ripe?",
  "Why do diamonds sparkle?",
  "How does a compass work?",
  "Why do we laugh when we're tickled?",
  "Why does music give us goosebumps?",
  "Why is yawning contagious?",
  "How do parrots learn to mimic human speech?",
  "Why do we cry when overwhelmed with joy?",
  "How does caffeine keep us awake?",
  "Why do some people sleepwalk?",
  "How do dogs recognize their owners by scent alone?",
  "Why do we get butterflies in our stomach when nervous?",
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<string>(() =>
    localStorage.getItem('cg_current') ?? curiosities[0]
  );
  const [pool, setPool] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cg_pool');
      return saved ? JSON.parse(saved) : shuffle(curiosities);
    } catch {
      return shuffle(curiosities);
    }
  });
  const [count, setCount] = useState<number>(() =>
    Number(localStorage.getItem('cg_count') ?? 0)
  );

  useEffect(() => {
    localStorage.setItem('cg_count', String(count));
    localStorage.setItem('cg_pool', JSON.stringify(pool));
    localStorage.setItem('cg_current', currentQuestion);
  }, [count, pool, currentQuestion]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const isExhausted = count >= curiosities.length;

  const handleReset = () => {
    localStorage.removeItem('cg_count');
    localStorage.removeItem('cg_pool');
    localStorage.removeItem('cg_current');
    setCount(0);
    setPool(shuffle(curiosities));
    setCurrentQuestion(curiosities[0]);
    setShowResetConfirm(false);
  };

  const generateNewCuriosity = () => {
    const activePool = pool.length > 0 ? pool : shuffle(curiosities);
    const [next, ...remaining] = activePool;
    setCurrentQuestion(next);
    setPool(remaining);
    setCount((c) => c + 1);
  };

  const handleTopSurprise = generateNewCuriosity;

  const handleLearnMore = () => {
    const searchQuery = encodeURIComponent(currentQuestion);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div className="app-shell flex min-h-screen flex-col overflow-hidden">
      <div className="app-orb app-orb-cyan" />
      <div className="app-orb app-orb-violet" />
      <div className="app-orb app-orb-teal" />
      <div className="app-grid" />

      <header className="app-header app-reveal app-reveal-delay-1 relative z-20">
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(30,58,95,0.9)] bg-[rgba(13,20,36,0.8)] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Sparkles className="h-5 w-5 text-[#00d4ff]" />
            </div>
            <p className="text-base font-semibold text-[#f0f4ff]">Curiosity Engine</p>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-[#94a3b8] sm:block">{count} curiosities explored</p>
            <button
              onClick={handleTopSurprise}
              disabled={isExhausted}
              className={`app-cta rounded-xl border px-4 py-2 text-sm font-semibold shadow transition-all duration-300 ${
                isExhausted
                  ? 'cursor-not-allowed border-[rgba(255,255,255,0.06)] bg-[rgba(40,40,50,0.6)] text-[#4a5568]'
                  : 'app-cta-primary border-[rgba(240,244,255,0.14)] text-[#f0f4ff] shadow-[0_10px_28px_rgba(59,130,246,0.28)]'
              }`}
            >
              <span className="app-button-sheen" />
              <span className="relative z-10">Surprise Me</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section
          className={`mx-auto w-full overflow-hidden px-5 transition-all duration-500 ease-in-out sm:px-8 ${count === 0 ? 'max-h-[700px] pb-8 pt-8 opacity-100 sm:pt-12' : 'max-h-0 pb-0 pt-0 opacity-0 pointer-events-none'}`}
        >
          <div className="app-hero-shell app-reveal app-reveal-delay-2 rounded-[36px] p-[1px]">
            <div className="app-hero-inner rounded-[35px] border border-[rgba(255,255,255,0.08)] px-6 py-10 text-center sm:px-10 sm:py-14">
              <h1 className="app-reveal app-reveal-delay-4 mx-auto mb-4 w-full max-w-none text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#f0f4ff] sm:text-5xl lg:text-6xl">
                Discover something new every day.
                <span className="app-title-gradient mt-2 block">Explore your first curiosity.</span>
              </h1>

              <p className="app-reveal app-reveal-delay-5 mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#94a3b8] sm:text-lg">
                Explore random curiosities from science, history, technology, and beyond. Start with one click and keep discovering.
              </p>

              <div className="app-reveal app-reveal-delay-6 flex justify-center">
                <button
                  onClick={handleTopSurprise}
                  className="app-cta app-cta-primary inline-flex items-center justify-center rounded-2xl border border-[rgba(240,244,255,0.14)] px-7 py-4 text-base font-semibold text-[#f0f4ff] shadow-[0_18px_40px_rgba(59,130,246,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(168,85,247,0.32)] active:translate-y-0"
                >
                  <span className="app-button-sheen" />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Surprise Me
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="generator" className="mx-auto flex w-full flex-1 items-center px-5 pb-8 pt-6 sm:px-8">
          <div className="mx-auto w-full">
            <section
              className={`app-panel app-reveal app-reveal-delay-7 group mb-6 rounded-[32px] p-[1px] transition-all duration-300 hover:-translate-y-1 ${count === 0 ? 'pointer-events-none opacity-60 blur-[10px]' : ''}`}
            >
              <div className="app-panel-inner rounded-[31px] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,rgba(13,20,36,0.94),rgba(10,15,28,0.98))] p-6 shadow-[0_24px_80px_rgba(2,6,23,0.65)] backdrop-blur-2xl sm:p-8 lg:p-10">
                <div className="mb-8 flex items-center justify-center">
                  <div className="app-icon-frame flex h-20 w-20 items-center justify-center rounded-[26px] border border-[rgba(240,244,255,0.1)] bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(168,85,247,0.28),rgba(0,212,255,0.2))] shadow-[0_0_40px_rgba(59,130,246,0.28)] backdrop-blur-xl">
                    <Sparkles className="h-9 w-9 text-[#f0f4ff]" />
                  </div>
                </div>

                <div className="mb-8 text-center sm:mb-10">
                  <h2 className="mx-auto mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#64748b]">
                    Random Curiosity Generator
                  </h2>

                  <p className="mx-auto max-w-5xl text-3xl font-bold leading-[1.2] tracking-[-0.03em] text-[#f0f4ff] sm:text-4xl lg:text-5xl">
                    {currentQuestion}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={generateNewCuriosity}
                    disabled={isExhausted}
                    className={`app-cta inline-flex flex-1 items-center justify-center rounded-2xl border px-6 py-4 text-base font-semibold transition duration-300 ${
                      isExhausted
                        ? 'cursor-not-allowed border-[rgba(255,255,255,0.06)] bg-[rgba(40,40,50,0.6)] text-[#4a5568]'
                        : 'app-cta-primary border-[rgba(240,244,255,0.12)] text-[#f0f4ff] shadow-[0_18px_40px_rgba(59,130,246,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(168,85,247,0.32)] active:translate-y-0'
                    }`}
                  >
                    <span className="app-button-sheen" />
                    <span className="relative z-10">Surprise Me</span>
                  </button>
                  <button
                    onClick={handleLearnMore}
                    className="app-cta app-cta-secondary group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[rgba(30,58,95,0.9)] bg-[rgba(13,20,36,0.88)] px-6 py-4 text-base font-semibold text-[#f0f4ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(0,212,255,0.45)] hover:bg-[rgba(15,23,42,0.96)] hover:text-[#00d4ff]"
                  >
                    <span className="app-button-sheen" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Learn More
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              </div>
            </section>

            <div className="app-reveal app-reveal-delay-8 mx-auto max-w-xl rounded-[24px] border border-[rgba(30,58,95,0.7)] bg-[rgba(13,20,36,0.72)] px-6 py-5 text-center shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
              <p className="text-base text-[#94a3b8] sm:text-lg">
                Curiosities explored today:{' '}
                <span className="bg-[linear-gradient(90deg,#f0f4ff_0%,#00d4ff_55%,#a855f7_100%)] bg-clip-text font-bold text-transparent">
                  {count}
                </span>
              </p>
              {isExhausted && (
                <div className="mt-4">
                  <p className="mb-3 text-sm text-[#64748b]">You've explored all 100 curiosities!</p>
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.1)] px-5 py-2.5 text-sm font-semibold text-[#f87171] transition duration-200 hover:border-[rgba(239,68,68,0.7)] hover:bg-[rgba(239,68,68,0.18)] hover:text-[#fca5a5]"
                  >
                    Reset Curiosities
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,6,23,0.85)] px-5 backdrop-blur-md">
          <div className="w-full max-w-md rounded-[28px] border border-[rgba(239,68,68,0.3)] bg-[rgba(13,20,36,0.97)] p-8 shadow-[0_32px_80px_rgba(2,6,23,0.8)] text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.1)]">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#f0f4ff]">Reset all curiosities?</h2>
            <p className="mb-7 text-sm leading-relaxed text-[#94a3b8]">
              This will reset your explored count back to <span className="font-semibold text-[#f0f4ff]">0</span> and bring back the welcome screen. All 100 curiosities will be available again.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 rounded-xl border border-[rgba(30,58,95,0.9)] bg-[rgba(13,20,36,0.88)] px-5 py-3 text-sm font-semibold text-[#94a3b8] transition duration-200 hover:text-[#f0f4ff]"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.12)] px-5 py-3 text-sm font-semibold text-[#f87171] transition duration-200 hover:border-[rgba(239,68,68,0.7)] hover:bg-[rgba(239,68,68,0.2)] hover:text-[#fca5a5]"
              >
                Yes, reset to <span className="font-mono">0</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer app-reveal app-reveal-delay-8 relative z-10 mt-auto border-t border-[rgba(30,58,95,0.4)] bg-[rgba(10,15,28,0.58)]">
        <div className="mx-auto relative w-full px-5 py-7 text-sm text-[#94a3b8] sm:px-8 sm:py-8">
          <div className="font-medium text-[#64748b]">v2.0</div>

          <div className="app-footer-copy mt-3 text-center lg:mt-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2">
            Built with <span className="text-[#ec4899]">♥</span> by <span className="font-semibold text-[#f0f4ff]">Jagrat Ahuja</span>
            <br />© 2026 All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
