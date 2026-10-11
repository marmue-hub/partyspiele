<script lang="ts">
  import { router } from './lib/router.svelte';
  import { keepAwake } from './lib/wakeLock';
  import { findGame } from './games';
  import Home from './Home.svelte';

  const game = $derived(findGame(router.gameId));

  // Keep the screen on while a game is running.
  $effect(() => {
    if (game) return keepAwake();
  });
</script>

{#if game}
  {#key game.id}
    <game.component onexit={router.home} />
  {/key}
{:else}
  <Home />
{/if}
