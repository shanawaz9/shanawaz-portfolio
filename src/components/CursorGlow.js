import { useEffect, useRef, useState } from 'react';

const PIXEL = 2;

/* Sprites are authored as plain silhouettes ('#' filled, '.' empty; rows must
   be equal length). buildPixels splits each into a stair-stepped outline and
   an interior, giving the classic hollow pixel-cursor look.
   hotspot is the cell that sits under the real mouse position. */

/* Classic arrow: vertical left edge, diagonal right edge, then a notch
   splitting into a short foot and the tail. */
const ARROW = {
  hotspot: { x: 0, y: 0 },
  rows: [
    '#..........',
    '##.........',
    '###........',
    '####.......',
    '#####......',
    '######.....',
    '#######....',
    '########...',
    '#########..',
    '##########.',
    '###########',
    '#######....',
    '###.####...',
    '##..####...',
    '#....####..',
    '.....####..',
    '......##...',
  ],
};

/* Pointing hand: index finger up, folded-knuckle bumps beside it,
   thumb on the left, palm below. */
const HAND = {
  hotspot: { x: 5, y: 0 },
  rows: [
    '....##.........',
    '....##.........',
    '....##.........',
    '....##.........',
    '....##.........',
    '....##.........',
    '....##.##.##...',
    '....##########.',
    '....###########',
    '.##.###########',
    '.##############',
    '.##############',
    '.##############',
    '..#############',
    '..#############',
    '...############',
    '...############',
    '....##########.',
  ],
};

/* A filled cell is outline when any of its 4 neighbours is empty or off-grid;
   the rest is interior. */
function buildPixels({ rows, hotspot }) {
  const numRows = rows.length;
  const cols = rows[0].length;
  const at = (x, y) => (y < 0 || y >= numRows || x < 0 || x >= cols ? '.' : rows[y][x]);
  const pixels = [];
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rows[y][x] !== '#') continue;
      const outline =
        at(x, y - 1) !== '#' || at(x, y + 1) !== '#' ||
        at(x - 1, y) !== '#' || at(x + 1, y) !== '#';
      pixels.push({ x, y, kind: outline ? 'o' : 'i' });
    }
  }
  return { pixels, cols, rows: numRows, hotspot };
}

const SHAPES = { arrow: buildPixels(ARROW), hand: buildPixels(HAND) };

function PixelCursorIcon({ shape }) {
  const { pixels, cols, rows, hotspot } = SHAPES[shape];
  return (
    <svg
      className="cursor-pixel-svg"
      width={cols * PIXEL}
      height={rows * PIXEL}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      style={{ transform: `translate(${-hotspot.x * PIXEL}px,${-hotspot.y * PIXEL}px)` }}
    >
      {/* Interior first so the outline always wins on any shared edge. */}
      {pixels.map((p) => (
        <rect
          key={`${p.x}-${p.y}`}
          x={p.x}
          y={p.y}
          width="1"
          height="1"
          className={p.kind === 'o' ? 'px-outline' : 'px-fill'}
        />
      ))}
    </svg>
  );
}

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';

export default function CursorGlow() {
  const rootRef = useRef(null);
  const readySet = useRef(false);
  const [shape, setShape] = useState('arrow');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rootRef.current) {
        rootRef.current.style.left = e.clientX + 'px';
        rootRef.current.style.top = e.clientY + 'px';
      }
      if (!readySet.current) {
        readySet.current = true;
        setReady(true);
      }
    };
    const handleMouseOver = (e) => {
      setShape(e.target.closest(INTERACTIVE_SELECTOR) ? 'hand' : 'arrow');
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className={`cursor-dot${ready ? ' cursor-dot--ready' : ''}`} ref={rootRef}>
      <PixelCursorIcon shape={shape} />
    </div>
  );
}
