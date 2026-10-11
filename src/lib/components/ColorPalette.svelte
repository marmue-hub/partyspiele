<script lang="ts">
  import { PLAYER_COLORS, textColorOn } from '../colors';

  interface Props {
    selected: string | undefined;
    /** Colors that can't be picked, mapped to a short label (e.g. the owner's initial). */
    taken: Map<string, string>;
    onselect: (id: string) => void;
  }

  let { selected, taken, onselect }: Props = $props();
</script>

<div class="palette" role="radiogroup" aria-label="Farbe">
  {#each PLAYER_COLORS as c (c.id)}
    {@const owner = taken.get(c.id)}
    <button
      type="button"
      role="radio"
      aria-checked={selected === c.id}
      aria-label={owner ? `${c.name} (vergeben)` : c.name}
      class:selected={selected === c.id}
      disabled={owner !== undefined}
      style:background={c.hex}
      style:color={textColorOn(c.hex)}
      onclick={() => onselect(c.id)}
    >
      {owner ?? ''}
    </button>
  {/each}
</div>

<style>
  .palette {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
  button {
    appearance: none;
    aspect-ratio: 1;
    width: 100%;
    border-radius: 50%;
    border: 3px solid transparent;
    font: inherit;
    font-weight: 800;
    font-size: 0.85rem;
    cursor: pointer;
    touch-action: manipulation;
    transition: transform 0.1s;
  }
  button:active:not(:disabled) { transform: scale(0.9); }
  .selected {
    border-color: var(--text);
    box-shadow: 0 0 0 3px var(--bg) inset;
  }
  button:disabled {
    opacity: 0.3;
    cursor: default;
  }
</style>
