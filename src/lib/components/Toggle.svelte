<script lang="ts">
  let { label, hint, checked = $bindable() }: { label: string; hint?: string; checked: boolean } = $props();
</script>

<label class="toggle">
  <span class="grow stack-text">
    <span>{label}</span>
    {#if hint}<small class="muted">{hint}</small>{/if}
  </span>
  <input type="checkbox" bind:checked />
  <span class="switch" aria-hidden="true"></span>
</label>

<style>
  .toggle { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
  .stack-text { display: flex; flex-direction: column; gap: 2px; }
  input { position: absolute; opacity: 0; pointer-events: none; }
  .switch {
    width: 3.1rem;
    height: 1.9rem;
    border-radius: 1rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .switch::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.2s;
  }
  input:checked + .switch { background: var(--primary); }
  input:checked + .switch::after { transform: translateX(1.2rem); }
</style>
