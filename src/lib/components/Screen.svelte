<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    /** Shows a back button in the header when set. */
    onback?: () => void;
    children: Snippet;
    /** Sticky action area at the bottom (main buttons). */
    footer?: Snippet;
  }

  let { title, onback, children, footer }: Props = $props();
</script>

<div class="screen">
  <header>
    {#if onback}
      <button class="back" type="button" onclick={onback} aria-label="Zurück">‹</button>
    {/if}
    <h1>{title}</h1>
  </header>

  <main>
    {@render children()}
  </main>

  {#if footer}
    <footer>
      {@render footer()}
    </footer>
  {/if}
</div>

<style>
  .screen {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
  }
  header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: calc(env(safe-area-inset-top) + 12px) 0 12px;
    background: var(--bg);
  }
  h1 { font-size: 1.6rem; }
  .back {
    appearance: none;
    border: none;
    background: var(--surface-2);
    color: var(--text);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    font-size: 1.8rem;
    line-height: 1;
    padding-bottom: 0.2rem;
    cursor: pointer;
    flex-shrink: 0;
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    padding-bottom: 16px;
  }
  footer {
    position: sticky;
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 0 calc(env(safe-area-inset-bottom) + 12px);
    background: linear-gradient(to bottom, transparent, var(--bg) 25%);
  }
</style>
