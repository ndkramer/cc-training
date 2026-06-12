/**
 * Spinner - Animated loading indicator
 *
 * Props:
 *   size: number - Icon size in pixels (default: 16)
 *   permissionMode: 'default' | 'acceptEdits' | 'plan' | 'bypassPermissions' - Color mode
 *   status: string - Optional status override (e.g., 'compacting')
 */

const SPINNER_FRAMES = ['·', '✢', '*', '✶', '✻', '✽', '✽', '✻', '✶', '*', '✢', '·'];

const LOADING_MESSAGES = [
  'Accomplishing',
  'Actioning',
  'Actualizing',
  'Baking',
  'Booping',
  'Brewing',
  'Calculating',
  'Cerebrating',
  'Channelling',
  'Churning',
  'Clauding',
  'Coalescing',
  'Cogitating',
  'Computing',
  'Combobulating',
  'Concocting',
  'Considering',
  'Contemplating',
  'Cooking',
  'Crafting',
  'Creating',
  'Crunching',
  'Deciphering',
  'Deliberating',
  'Determining',
  'Discombobulating',
  'Doing',
  'Effecting',
  'Elucidating',
  'Enchanting',
  'Envisioning',
  'Finagling',
  'Flibbertigibbeting',
  'Forging',
  'Forming',
  'Frolicking',
  'Generating',
  'Germinating',
  'Hatching',
  'Herding',
  'Honking',
  'Ideating',
  'Imagining',
  'Incubating',
  'Inferring',
  'Manifesting',
  'Marinating',
  'Meandering',
  'Moseying',
  'Mulling',
  'Mustering',
  'Musing',
  'Noodling',
  'Percolating',
  'Perusing',
  'Philosophising',
  'Pontificating',
  'Pondering',
  'Processing',
  'Puttering',
  'Puzzling',
  'Reticulating',
  'Ruminating',
  'Scheming',
  'Schlepping',
  'Shimmying',
  'Simmering',
  'Smooshing',
  'Spelunking',
  'Spinning',
  'Stewing',
  'Sussing',
  'Synthesizing',
  'Thinking',
  'Tinkering',
  'Transmuting',
  'Unfurling',
  'Unravelling',
  'Vibing',
  'Wandering',
  'Whirring',
  'Wibbling',
  'Working',
  'Wrangling',
];

const MAX_LOADING_MESSAGE_LEN = Math.max(...LOADING_MESSAGES.map(m => m.length));

function pick1(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function padText(text, maxChars) {
  if (text.length >= maxChars) return text;
  return text + ' '.repeat(maxChars - text.length);
}

function setChar(str, index, char) {
  if (index < 0 || index >= str.length) return str;
  return str.slice(0, index) + char + str.slice(index + 1);
}

function transformChar(_inChar, targetChar, step) {
  if (targetChar === ' ') return ' ';
  switch (step) {
    case 3:
      return targetChar;
    case 2:
      return pick1(['.', '_', targetChar]);
    case 1:
      return pick1(['.', '_', targetChar]);
    case 0:
      return '▌';
  }
}

function useTextAnimation(text, maxChars) {
  const [chars, setChars] = React.useState(' '.repeat(maxChars));
  const tickState = React.useRef({
    index: 0,
    targetText: padText(text, maxChars),
  });

  React.useEffect(() => {
    tickState.current.index = 0;
    tickState.current.targetText = padText(text, maxChars);

    let frameId = null;
    let lastTime = 0;
    const frameDelay = 40;

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameDelay) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      const idx = tickState.current.index;

      if (idx - 3 >= tickState.current.targetText.length) {
        frameId = null;
        return;
      }

      tickState.current.index++;
      setChars(chars => {
        let newChars = chars;

        for (let step = 0; step <= 3; step++) {
          const charIdx = idx - step;
          if (charIdx >= 0 && charIdx < tickState.current.targetText.length) {
            newChars = setChar(
              newChars,
              charIdx,
              transformChar(
                chars[charIdx],
                tickState.current.targetText[charIdx],
                step,
              ),
            );
          }
        }
        return newChars;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [text, maxChars]);

  return chars;
}

function Spinner({
  size = 16,
  permissionMode = 'default',
  status,
}) {
  const [iconIndex, setIconIndex] = React.useState(0);
  const [loadingMessage, setLoadingMessage] = React.useState(pick1(LOADING_MESSAGES));
  const cycleCount = React.useRef(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex(prevIndex => (prevIndex + 1) % SPINNER_FRAMES.length);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Cycle messages with increasing delay
  React.useEffect(() => {
    const delays = [2000, 3000, 5000];
    const getDelay = () => delays[Math.min(cycleCount.current, delays.length - 1)];

    let timeoutId;
    const cycleMessage = () => {
      setLoadingMessage(pick1(LOADING_MESSAGES));
      cycleCount.current++;
      timeoutId = setTimeout(cycleMessage, getDelay());
    };

    timeoutId = setTimeout(cycleMessage, getDelay());
    return () => clearTimeout(timeoutId);
  }, []);

  let statusText = loadingMessage;
  if (status === 'compacting') {
    statusText = 'Compacting';
  }

  const text = useTextAnimation(
    statusText + '...',
    MAX_LOADING_MESSAGE_LEN + 3,
  );

  // Icon color based on permission mode
  const iconColorMap = {
    default: 'var(--claude-orange)',
    acceptEdits: 'var(--fg-primary)',
    plan: 'rgb(14, 99, 156)',
    bypassPermissions: 'rgb(229, 115, 115)',
  };
  const iconColor = iconColorMap[permissionMode] || iconColorMap.default;

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'var(--fg-primary)',
      position: 'relative',
      height: 19.5,
    }}>
      <span style={{
        fontFamily: 'monospace',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 8,
        fontSize: `${size}px`,
        color: iconColor,
        position: 'absolute',
        left: -22,
      }}>
        {SPINNER_FRAMES[iconIndex]}
      </span>
      <span style={{
        fontWeight: 600,
        fontFamily: 'sans-serif',
        fontSize: 13,
        whiteSpace: 'pre',
        lineHeight: '19.5px',
      }}>
        {text}
      </span>
    </div>
  );
}
