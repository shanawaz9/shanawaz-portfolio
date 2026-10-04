import { useEffect, useRef, useState } from 'react';

/* Sprites are authored as plain silhouettes ('#' filled, '.' empty; rows must
   be equal length). buildPixels splits each into a stair-stepped outline and
   an interior, giving the classic hollow pixel-cursor look.
   hotspot is the cell that sits under the real mouse position.

   Cell size lives in CSS (--cursor-px) so the cursor can scale with the
   viewport; the sprite's grid dimensions and hotspot are handed to CSS as
   unitless custom properties for it to multiply out. */

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
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      style={{ '--cols': cols, '--rows': rows, '--hx': hotspot.x, '--hy': hotspot.y }}
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
  // Optional tag shown beside the pointer, from the hovered element's
  // data-cursor-label (e.g. "Read case study" on the project cards).
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Last known pointer position, so a scroll can re-check what's under it.
    const pos = { x: -1, y: -1 };

    // Shape and label follow whatever element is under the pointer.
    // A labelled element keeps the normal arrow: the label itself says
    // what clicking does, so the pointing hand would be redundant.
    const updateFor = (target) => {
      const el = target && target.closest ? target : null;
      const tagged = el && el.closest('[data-cursor-label]');
      setShape(!tagged && el && el.closest(INTERACTIVE_SELECTOR) ? 'hand' : 'arrow');
      setLabel(tagged ? tagged.getAttribute('data-cursor-label') : '');
    };

    const handleMouseMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (rootRef.current) {
        rootRef.current.style.left = e.clientX + 'px';
        rootRef.current.style.top = e.clientY + 'px';
      }
      if (!readySet.current) {
        readySet.current = true;
        setReady(true);
      }
    };
    const handleMouseOver = (e) => updateFor(e.target);
    // Scrolling with a still mouse moves content out from under the pointer
    // without any mouse event, so re-check the element under it - otherwise
    // a card's label lingers after the card has gone. Scroll events already
    // arrive at most once per frame, and elementFromPoint is cheap.
    const handleScroll = () => {
      if (pos.x < 0) return;
      updateFor(document.elementFromPoint(pos.x, pos.y));
    };
    // Pointer left the window: drop any label.
    const handleMouseOut = (e) => {
      if (!e.relatedTarget) setLabel('');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`cursor-dot${ready ? ' cursor-dot--ready' : ''}`} ref={rootRef} aria-hidden="true">
      <PixelCursorIcon shape={shape} />
      <span className={`cursor-label${label ? ' cursor-label--on' : ''}`}>{label}</span>
    </div>
  );
}
