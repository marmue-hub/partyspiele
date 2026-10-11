<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';
  import PlayerAvatar from './PlayerAvatar.svelte';
  import { colorHex, textColorOn } from '../colors';
  import { uniqueInitials } from '../initials';
  import type { Player } from '../stores/players.svelte';

  /**
   * Pass-the-phone flow: each player in turn takes the device,
   * reveals their secret, hides it again and passes it on.
   * The player's color fills the panel so everyone sees whose turn it is.
   */
  interface Props {
    players: Player[];
    /** Content shown to the player while revealed. */
    secret: Snippet<[player: Player, index: number]>;
    ondone: () => void;
  }

  let { players, secret, ondone }: Props = $props();

  let index = $state(0);
  let revealed = $state(false);

  const player = $derived(players[index]);
  const isLast = $derived(index === players.length - 1);
  const hex = $derived(colorHex(player.color));
  const initials = $derived(uniqueInitials(players.map((p) => p.name)));

  function next() {
    revealed = false;
    if (isLast) ondone();
    else index += 1;
  }
</script>

<div class="wrap" style:--player={hex} style:--on-player={textColorOn(hex)}>
  <p class="progress label">Spieler {index + 1} von {players.length}</p>

  {#if !revealed}
    <div class="panel hidden-panel">
      <PlayerAvatar color={player.color} initials={initials[index]} size="lg" />
      <p>Gib das Handy an</p>
      <h2 class="name">{player.name}</h2>
      <p class="small">Nur {player.name} darf hinschauen!</p>
    </div>
    <Button size="lg" block color={hex} onclick={() => (revealed = true)}>👁️ Ich bin {player.name} – aufdecken</Button>
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
    background:
      repeating-linear-gradient(45deg, transparent, transparent 14px, rgb(0 0 0 / 0.08) 14px, rgb(0 0 0 / 0.08) 28px),
      var(--player);
    color: var(--on-player);
    animation: slide-in 0.3s ease-out;
  }
  .hidden-panel p { opacity: 0.85; }
  .secret-panel {
    background: color-mix(in srgb, var(--player) 18%, var(--surface));
    border: 3px solid var(--player);
    animation: flip 0.25s ease-out;
  }
  .name { font-size: 2.6rem; word-break: break-word; }
  .small { font-size: 0.9rem; }
  @keyframes flip {
    from { transform: rotateY(90deg); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
  @keyframes slide-in {
    from { transform: translateX(30%); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
</style>
