<script lang="ts">
  import type { GameInfo } from '../../games';

  let { game, onclick }: { game: GameInfo; onclick: () => void } = $props();
</script>

<button type="button" class="tile" {onclick} style:--tile-color={game.color}>
  <span class="emoji" aria-hidden="true">{game.emoji}</span>
  <span class="text">
    <strong>{game.name}</strong>
    <small class="muted">{game.tagline}</small>
    <small class="meta">{game.minPlayers}+ Spieler</small>
  </span>
</button>

<style>
  .tile {
    appearance: none;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    font: inherit;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 6px solid var(--tile-color);
    border-radius: var(--radius);
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.08s;
  }
  .tile:active { transform: scale(0.98); }
  .emoji { font-size: 2.4rem; }
  .text { display: flex; flex-direction: column; gap: 3px; }
  strong { font-size: 1.2rem; }
  .meta { color: var(--tile-color); font-weight: 600; }
</style>
