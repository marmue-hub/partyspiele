<script lang="ts">
  import { colorHex, textColorOn } from '../colors';
  import type { Player } from '../stores/players.svelte';

  let { player, size = 'md' }: { player: Player; size?: 'md' | 'lg' } = $props();

  const hex = $derived(colorHex(player.color));
</script>

<span class="chip {size}" style:background={hex} style:color={textColorOn(hex)}>{player.name}</span>

<style>
  .chip {
    display: inline-block;
    border-radius: 999px;
    padding: 0.15em 0.7em;
    font-weight: 800;
    word-break: break-word;
  }
  .lg { font-size: 1.6rem; padding: 0.2em 0.8em; }
</style>
