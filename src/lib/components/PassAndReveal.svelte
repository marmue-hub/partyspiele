<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';

  /**
   * Pass-the-phone flow: each player in turn takes the device,
   * reveals their secret, hides it again and passes it on.
   */
  interface Props {
    players: string[];
    /** Content shown to the player while revealed. */
    secret: Snippet<[player: string, index: number]>;
    ondone: () => void;
  }

  let { players, secret, ondone }: Props = $props();

  let index = $state(0);
  let revealed = $state(false);

  const player = $derived(players[index]);
  const isLast = $derived(index === players.length - 1);

  function next() {
    revealed = false;
    if (isLast) ondone();
    else index += 1;
  }
</script>

<div class="wrap">
  <p class="progress label">Spieler {index + 1} von {players.length}</p>

  {#if !revealed}
    <div class="panel hidden-panel">
      <p class="muted">Gib das Handy an</p>
      <h2 class="name">{player}</h2>
      <p class="muted small">Nur {player} darf hinschauen!</p>
    </div>
    <Button size="lg" block onclick={() => (revealed = true)}>Ich bin {player} – aufdecken</Button>
  {:else}
    <div class="panel secret-panel">
      {@render secret(player, index)}
    </div>
    <Button size="lg" block variant="secondary" onclick={next}>
      {isLast ? 'Verdecken & Spiel starten' : 'Verdecken & weitergeben'}
    </Button>
  {/if}
</div>

<style>
  .wrap { flex: 1; display: flex; flex-direction: column; gap: 16px; }
  .progress { text-align: center; }
  .panel {
    flex: 1;
    min-height: 50dvh;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px;
    text-align: center;
  }
  .hidden-panel {
    background: repeating-linear-gradient(45deg, var(--surface), var(--surface) 14px, var(--surface-2) 14px, var(--surface-2) 28px);
    border: 1px solid var(--border);
  }
  .secret-panel {
    background: var(--surface);
    border: 2px solid var(--accent);
    animation: flip 0.25s ease-out;
  }
  .name { font-size: 2.6rem; word-break: break-word; }
  .small { font-size: 0.9rem; }
  @keyframes flip {
    from { transform: rotateY(90deg); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
</style>
