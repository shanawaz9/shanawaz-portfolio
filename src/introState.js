// The terminal boot is an arrival moment, not a page transition. It plays once
// and then stays out of the way - on reloads, and on every return trip from a
// case study (those are static HTML, so coming back remounts the whole app).
//
// Persisted in localStorage rather than sessionStorage so "once" survives a new
// tab and a closed browser, which is where a per-session flag still replayed it.
// Append ?intro=1 to the URL to watch it again without clearing site data.
//
// Read once at module load so every component agrees within a render pass: the
// Loader marks the intro as seen on mount, and a component asking afterwards
// would otherwise get a different answer than the Loader did.
const KEY = 'intro-played';

function forced() {
  try {
    return new URLSearchParams(window.location.search).get('intro') === '1';
  } catch (e) {
    return false;
  }
}

function alreadyPlayed() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch (e) {
    // Private mode / storage blocked: treat as a fresh landing.
    return false;
  }
}

export const PLAY_INTRO = forced() || !alreadyPlayed();

export function markIntroPlayed() {
  try {
    localStorage.setItem(KEY, '1');
  } catch (e) {
    /* storage unavailable - the intro simply plays again next time */
  }
}
