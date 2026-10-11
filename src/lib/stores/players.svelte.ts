import { persisted } from '../persisted.svelte';
import { PLAYER_COLORS } from '../colors';

export interface Player {
  name: string;
  /** Id from PLAYER_COLORS, unique among players. */
  color: string;
}

export const MAX_PLAYERS = PLAYER_COLORS.length;

/** Shared player list – entered once, used by every game. */
export const players = persisted<Player[]>('players', []);

// Migrate v0.1 data (plain name strings) by assigning free colors in order.
if (players.value.some((p) => typeof p === 'string')) {
  players.value = (players.value as unknown as (string | Player)[])
    .slice(0, MAX_PLAYERS)
    .map((p, i) => (typeof p === 'string' ? { name: p, color: PLAYER_COLORS[i].id } : p));
}
