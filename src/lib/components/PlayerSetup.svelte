<script lang="ts">
  import Card from './Card.svelte';

  interface Props {
    players: string[];
    min?: number;
    max?: number;
  }

  let { players = $bindable(), min = 3, max = 20 }: Props = $props();

  let name = $state('');

  const trimmed = $derived(name.trim());
  const duplicate = $derived(players.some((p) => p.toLowerCase() === trimmed.toLowerCase()));
  const canAdd = $derived(trimmed.length > 0 && !duplicate && players.length < max);

  function add(e: SubmitEvent) {
    e.preventDefault();
    if (!canAdd) return;
    players = [...players, trimmed];
    name = '';
  }

  function remove(i: number) {
    players = players.filter((_, j) => j !== i);
  }
</script>

<Card title="Spieler ({players.length})">
  {#if players.length > 0}
    <ul>
      {#each players as p, i (p)}
        <li>
          <span class="grow">{p}</span>
          <button type="button" class="remove" onclick={() => remove(i)} aria-label="{p} entfernen">×</button>
        </li>
      {/each}
    </ul>
  {/if}

  <form onsubmit={add}>
    <input
      bind:value={name}
      placeholder="Name eingeben"
      maxlength="20"
      autocomplete="off"
      autocapitalize="words"
      enterkeyhint="done"
    />
    <button type="submit" disabled={!canAdd}>+</button>
  </form>

  {#if duplicate && trimmed}
    <small class="warn">„{trimmed}“ ist schon dabei.</small>
  {:else if players.length < min}
    <small class="muted">Mindestens {min} Spieler.</small>
  {/if}
</Card>

<style>
  ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
  li {
    display: flex;
    align-items: center;
    background: var(--surface-2);
    border-radius: 12px;
    padding: 0.55rem 0.5rem 0.55rem 0.9rem;
    font-weight: 600;
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
  form { display: flex; gap: 8px; }
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
    background: var(--primary);
    color: var(--text);
    font-size: 1.5rem;
    cursor: pointer;
  }
  form button:disabled { opacity: 0.35; }
  .warn { color: var(--accent); }
</style>
