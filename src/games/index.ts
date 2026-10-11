import type { Component } from 'svelte';
import Imposter from './imposter/Imposter.svelte';

export interface GameInfo {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  color: string;
  minPlayers: number;
  component: Component<{ onexit: () => void }>;
}

/** Register new games here – they appear on the home screen automatically. */
export const games: GameInfo[] = [
  {
    id: 'imposter',
    name: 'Imposter',
    tagline: 'Alle kennen das Wort – bis auf einen.',
    emoji: '🕵️',
    color: '#ff4d8d',
    minPlayers: 3,
    component: Imposter,
  },
];

export const findGame = (id: string | null) => games.find((g) => g.id === id);
