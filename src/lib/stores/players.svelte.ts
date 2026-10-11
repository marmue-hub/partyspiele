import { persisted } from '../persisted.svelte';

/** Shared player list – entered once, used by every game. */
export const players = persisted<string[]>('players', []);
