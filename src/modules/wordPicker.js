import _words from '@/assets/words';

const words = _words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

function pick() {
  const shuffled = words.sort().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 25);
}

export { pick, words };
