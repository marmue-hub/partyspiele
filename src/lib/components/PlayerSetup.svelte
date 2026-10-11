<script lang="ts">
  import Card from './Card.svelte';
  import ColorPalette from './ColorPalette.svelte';
  import { PLAYER_COLORS, colorHex, textColorOn } from '../colors';
  import { MAX_PLAYERS, type Player } from '../stores/players.svelte';

  interface Props {
    players: Player[];
    min?: number;
  }

  let { players = $bindable(), min = 3 }: Props = $props();

  let name = $state('');
  let preferredColor = $state<string | undefined>();
  /** Index of the player whose color is being changed, or null when picking for a new player. */
  let editing = $state<number | null>(null);

  const trimmed = $derived(name.trim());
  const duplicate = $derived(players.some((p) => p.name.toLowerCase() === trimmed.toLowerCase()));
  const full = $derived(players.length >= MAX_PLAYERS);

  const usedColors = $derived(new Set(players.map((p) => p.color)));
  const firstFree = $derived(PLAYER_COLORS.find((c) => !usedColors.has(c.id))?.id);
  // Keep the user's pick unless someone else has taken it meanwhile.
  const newColor = $derived(preferredColor && !usedColors.has(preferredColor) ? preferredColor : firstFree);

  const canAdd = $derived(trimmed.length > 0 && !duplicate && !full && newColor !== undefined);

  const editingPlayer = $derived(editing !== null ? players[editing] : undefined);
  const paletteSelected = $derived(editingPlayer ? editingPlayer.color : newColor);
  const taken = $derived(
    new Map(players.filter((p) => p !== editingPlayer).map((p) => [p.color, initials(p.name)])),
  );

  function initials(n: string) {
    return n.slice(0, 2);
  }

  function add(e: SubmitEvent) {
    e.preventDefault();
    if (!canAdd) return;
    players = [...players, { name: trimmed, color: newColor! }];
    name = '';
    preferredColor = undefined;
  }

  function remove(i: number) {
    players = players.filter((_, j) => j !== i);
    editing = null;
  }

  function selectColor(id: string) {
    if (editing !== null) {
      players[editing].color = id;
      editing = null;
    } else {
      preferredColor = id;
    }
  }

  function toggleEdit(i: number) {
    editing = editing === i ? null : i;
  }
</script>

<Card title="Spieler ({players.length}/{MAX_PLAYERS})">
  {#if players.length > 0}
    <ul>
      {#each players as p, i (p.name)}
        {@const hex = colorHex(p.color)}
        <li class:editing={editing === i} style:--player={hex}>
          <button
            type="button"
            class="swatch"
            style:background={hex}
            style:color={textColorOn(hex)}
            onclick={() => toggleEdit(i)}
            aria-label="Farbe von {p.name} ändern"
          >
            {initials(p.name)}
          </button>
          <span class="grow">{p.name}</span>
          <button type="button" class="remove" onclick={() => remove(i)} aria-label="{p.name} entfernen">×</button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if !full || editingPlayer}
    <div class="picker">
      {#if editingPlayer}
        <small class="muted">Neue Farbe für <strong>{editingPlayer.name}</strong>:</small>
      {/if}
      <ColorPalette selected={paletteSelected} {taken} onselect={selectColor} />
    </div>
  {/if}

  {#if !full}
    <form onsubmit={add}>
      <span class="preview" style:background={newColor ? colorHex(newColor) : 'transparent'}></span>
      <input
        bind:value={name}
        onfocus={() => (editing = null)}
        placeholder="Name eingeben"
        maxlength="20"
        autocomplete="off"
        autocapitalize="words"
        enterkeyhint="done"
      />
      <button type="submit" disabled={!canAdd}>+</button>
    </form>
  {/if}

  {#if duplicate && trimmed}
    <small class="warn">„{trimmed}“ ist schon dabei.</small>
  {:else if full}
    <small class="muted">Alle {MAX_PLAYERS} Farben sind vergeben – mehr Spieler gehen nicht.</small>
  {:else if players.length < min}
    <small class="muted">Mindestens {min} Spieler.</small>
  {/if}
</Card>

<style>
  ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    background: var(--surface-2);
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0.4rem 0.5rem;
    font-weight: 600;
  }
  li.editing { border-color: var(--player); }
  .swatch {
    appearance: none;
    border: none;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
    flex-shrink: 0;
  }
  .remove {
    appearance: none;
    border: none;
    background: none;
    color: var(--muted);
    font-size: 1.4rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  .picker { display: flex; flex-direction: column; gap: 8px; }
  form { display: flex; gap: 8px; align-items: center; }
  .preview {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    flex-shrink: 0;
  }
  input {
    flex: 1;
    min-width: 0;
    font: inherit;
    font-size: 16px; /* prevents iOS zoom on focus */
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
  }
  form button {
    appearance: none;
    border: none;
    border-radius: 12px;
    width: 3rem;
    align-self: stretch;
    background: var(--primary);
    color: var(--text);
    font-size: 1.5rem;
    cursor: pointer;
  }
  form button:disabled { opacity: 0.35; }
  .warn { color: var(--accent); }
</style>
