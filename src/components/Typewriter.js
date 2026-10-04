import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Terminal-style type-in effect. Reveals `text` one character at a time,
 * starting slow and accelerating toward a fast finish - like someone
 * warming up on a keyboard rather than a constant-speed teletype.
 *
 * Stays empty until `active` is true, so a parent can sequence several of
 * these one after another via the `onDone` callback (see CTA.js).
 */
export default function Typewriter({
  text,
  as: Tag = 'span',
  className = '',
  active = true,
  startDelay = 0,
  slowMs = 130,
  fastMs = 20,
  showCaret = true,
  onDone,
  ...rest
}) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active) return undefined;

    if (reduce) {
      setOutput(text);
      setDone(true);
      onDoneRef.current?.();
      return undefined;
    }

    let cancelled = false;
    let timerId;
    let i = 0;
    const total = text.length;

    const step = () => {
      if (cancelled) return;
      i++;
      setOutput(text.slice(0, i));
      if (i >= total) {
        setDone(true);
        onDoneRef.current?.();
        return;
      }
      // Ease-in: lingers near slowMs early on, then ramps toward fastMs.
      const eased = Math.pow(i / total, 1.6);
      const delay = slowMs - (slowMs - fastMs) * eased;
      timerId = setTimeout(step, delay);
    };

    timerId = setTimeout(step, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [active, text, reduce, startDelay, slowMs, fastMs]);

  // Screen readers get the whole text up front, whether or not the type-in
  // has started; the letter-by-letter output is visual only. Without this a
  // heading or link reads as empty until the animation reaches it.
  return (
    <Tag className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {output}
        {showCaret && active && !done && <span className="type-caret" />}
      </span>
    </Tag>
  );
}
