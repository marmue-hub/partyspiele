/** Minimal hash router: `#/` is the home screen, `#/<gameId>` opens a game. */
function readHash(): string | null {
  const id = location.hash.replace(/^#\/?/, '');
  return id || null;
}

let gameId = $state<string | null>(readHash());

window.addEventListener('hashchange', () => {
  gameId = readHash();
});

export const router = {
  get gameId() {
    return gameId;
  },
  open(id: string) {
    location.hash = `/${id}`;
  },
  home() {
    location.hash = '/';
  },
};
