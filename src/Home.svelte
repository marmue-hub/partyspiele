<script lang="ts">
  import Screen from './lib/components/Screen.svelte';
  import GameTile from './lib/components/GameTile.svelte';
  import InstallHint from './lib/components/InstallHint.svelte';
  import { games } from './games';
  import { router } from './lib/router.svelte';
</script>

<Screen title="Partyspiele 🎉">
  <InstallHint />
  <p class="muted">Ein Handy, alle Spieler – einfach herumreichen.</p>
  {#each games as game (game.id)}
    <GameTile {game} onclick={() => router.open(game.id)} />
  {/each}
  <p class="muted more center">Weitere Spiele folgen …</p>
</Screen>

<style>
  .more { margin-top: 1rem; font-size: 0.9rem; }
</style>
