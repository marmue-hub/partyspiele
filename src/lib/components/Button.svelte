<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { textColorOn } from '../colors';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'md' | 'lg';
    block?: boolean;
    /** Custom background (hex), e.g. a player color. Text color adapts automatically. */
    color?: string;
    children: Snippet;
  }

  let { variant = 'primary', size = 'md', block = false, color, children, ...rest }: Props = $props();
</script>

<button
  class="btn {variant} {size}"
  class:block
  class:custom={color}
  style:background={color}
  style:color={color && textColorOn(color)}
  type="button"
  {...rest}
>
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
  .custom {
    border-color: rgb(255 255 255 / 0.35);
    box-shadow: 0 4px 14px rgb(0 0 0 / 0.35);
  }
  .custom:active:not(:disabled) { filter: brightness(0.9); }
</style>
