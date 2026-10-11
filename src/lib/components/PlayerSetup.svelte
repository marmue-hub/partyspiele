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

  /** Index of the player being edited (name + color), or null when adding a new player. */
  let editing = $state<number | null>(null);
  let draftName = $state('');

  const nameTaken = (n: string, except?: number) =>
    players.some((p, i) => i !== except && p.name.toLowerCase() === n.toLowerCase());

  // --- adding ---
  const trimmed = $derived(name.trim());
  const duplicate = $derived(nameTaken(trimmed));
  const full = $derived(players.length >= MAX_PLAYERS);

  const usedColors = $derived(new Set(players.map((p) => p.color)));
  const firstFree = $derived(PLAYER_COLORS.find((c) => !usedColors.has(c.id))?.id);
  // Keep the user's pick unless someone else has taken it meanwhile.
  const newColor = $derived(preferredColor && !usedColors.has(preferredColor) ? preferredColor : firstFree);
  const canAdd = $derived(trimmed.length > 0 && !duplicate && !full && newColor !== undefined);

  // --- editing ---
  const editingPlayer = $derived(editing !== null ? players[editing] : undefined);
  const draftTrimmed = $derived(draftName.trim());
  const draftDuplicate = $derived(editing !== null && nameTaken(draftTrimmed, editing));
  const draftValid = $derived(draftTrimmed.length > 0 && !draftDuplicate);

  // --- palette ---
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

  function startEdit(i: number) {
    if (editing === i) return finishEdit();
    finishEdit();
    editing = i;
    draftName = players[i].name;
  }

  /** Saves a valid name change and leaves edit mode. Color changes are applied immediately. */
  function finishEdit() {
    if (editing !== null && draftValid) players[editing].name = draftTrimmed;
    editing = null;
  }

  function submitEdit(e: SubmitEvent) {
    e.preventDefault();
    if (draftValid) finishEdit();
  }

  function selectColor(id: string) {
    if (editing !== null) players[editing].color = id;
    else preferredColor = id;
  }

  function focus(node: HTMLInputElement) {
    node.focus();
    node.select();
  }
</script>

<Card title="Spieler ({players.length}/{MAX_PLAYERS})">
  {#if players.length > 0}
    <ul>
      {#each players as p, i}
        {@const hex = colorHex(p.color)}
        <li class:editing={editing === i} style:--player={hex}>
          <button
            type="button"
            class="swatch"
            style:background={hex}
            style:color={textColorOn(hex)}
            onclick={() => startEdit(i)}
            aria-label="{p.name} bearbeiten"
          >
            {initials(p.name)}
          </button>

          {#if editing === i}
            <form class="edit" onsubmit={submitEdit}>
              <input
                bind:value={draftName}
                use:focus
                maxlength="20"
                autocomplete="off"
                autocapitalize="words"
                enterkeyhint="done"
                aria-label="Name ändern"
              />
              <button type="submit" class="done" disabled={!draftValid} aria-label="Fertig">✓</button>
            </form>
          {:else}
            <button type="button" class="name grow" onclick={() => startEdit(i)}>{p.name}</button>
            <button type="button" class="remove" onclick={() => remove(i)} aria-label="{p.name} entfernen">×</button>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}

  {#if editingPlayer}
    {#if draftDuplicate}
      <small class="warn">„{draftTrimmed}“ ist schon dabei.</small>
    {/if}
    <small class="muted">Farbe für <strong>{draftTrimmed || editingPlayer.name}</strong>:</small>
  {/if}

  {#if !full || editingPlayer}
    <ColorPalette selected={paletteSelected} {taken} onselect={selectColor} />
  {/if}

  {#if !full}
    <form class="add" onsubmit={add}>
      <span class="preview" style:background={newColor ? colorHex(newColor) : 'transparent'}></span>
      <input
        bind:value={name}
        onfocus={finishEdit}
        placeholder="Neuer Spieler"
        maxlength="20"
        autocomplete="off"
        autocapitalize="words"
        enterkeyhint="done"
      />
      <button type="submit" class="plus" disabled={!canAdd}>+</button>
    </form>
  {/if}

  {#if duplicate && trimmed}
    <small class="warn">„{trimmed}“ ist schon dabei.</small>
  {:else if full && !editingPlayer}
    <small class="muted">Alle {MAX_PLAYERS} Farben sind vergeben – mehr Spieler gehen nicht.</small>
  {:else if players.length < min}
    <small class="muted">Mindestens {min} Spieler.</small>
  {:else if editing === null}
    <small class="muted">Tippe auf einen Spieler, um Name oder Farbe zu ändern.</small>
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
    min-height: 3.2rem;
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
  .name {
    appearance: none;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    padding: 0.4rem 0;
    cursor: pointer;
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
  form { display: flex; gap: 8px; align-items: center; }
  .edit { flex: 1; min-width: 0; }
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
  .edit input { padding: 0.45rem 0.7rem; }
  .plus, .done {
    appearance: none;
    border: none;
    border-radius: 12px;
    background: var(--primary);
    color: var(--text);
    cursor: pointer;
  }
  .plus { width: 3rem; align-self: stretch; font-size: 1.5rem; }
  .done { width: 2.4rem; height: 2.4rem; font-size: 1.1rem; font-weight: 800; }
  .plus:disabled, .done:disabled { opacity: 0.35; }
  .warn { color: var(--accent); }
</style>
