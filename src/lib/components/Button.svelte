<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'md' | 'lg';
    block?: boolean;
    children: Snippet;
  }

  let { variant = 'primary', size = 'md', block = false, children, ...rest }: Props = $props();
</script>

<button class="btn {variant} {size}" class:block type="button" {...rest}>
  {@render children()}
</button>

<style>
  .btn {
    appearance: none;
    border: 1px solid transparent;
    border-radius: var(--radius);
    font: inherit;
    font-weight: 700;
    padding: 0.8rem 1.1rem;
    font-size: 1rem;
    color: var(--text);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: transform 0.08s ease, background 0.15s ease;
    touch-action: manipulation;
  }
  .btn:active:not(:disabled) { transform: scale(0.97); }
  .btn:disabled { opacity: 0.4; cursor: default; }
  .block { width: 100%; }
  .lg { padding: 1.1rem 1.25rem; font-size: 1.15rem; }

  .primary { background: var(--primary); }
  .primary:active:not(:disabled) { background: var(--primary-press); }
  .secondary { background: var(--surface-2); border-color: var(--border); }
  .ghost { background: transparent; color: var(--muted); }
  .danger { background: var(--danger); }
</style>
