<script lang="ts" generics="T extends string">
  interface Props {
    options: { value: T; label: string }[];
    /** Selected values (multi-select). Keeps at least `min` selected. */
    selected: T[];
    min?: number;
  }

  let { options, selected = $bindable(), min = 1 }: Props = $props();

  function toggle(v: T) {
    if (selected.includes(v)) {
      if (selected.length > min) selected = selected.filter((s) => s !== v);
    } else {
      selected = [...selected, v];
    }
  }
</script>

<div class="chips">
  {#each options as o (o.value)}
    <button type="button" class:on={selected.includes(o.value)} onclick={() => toggle(o.value)}>
      {o.label}
    </button>
  {/each}
</div>

<style>
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  button {
    appearance: none;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--muted);
    border-radius: 999px;
    padding: 0.5rem 0.9rem;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    touch-action: manipulation;
  }
  .on { background: var(--primary); border-color: var(--primary); color: var(--text); }
</style>
