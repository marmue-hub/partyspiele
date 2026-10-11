<script lang="ts">
  import { persisted } from '../persisted.svelte';

  const dismissed = persisted('installHintDismissed', false);

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const standalone =
    ('standalone' in navigator && (navigator as { standalone?: boolean }).standalone) ||
    matchMedia('(display-mode: standalone)').matches;
</script>

{#if isIOS && !standalone && !dismissed.value}
  <div class="hint">
    <p>
      <strong>Tipp:</strong> Tippe in Safari auf <span class="share">⎋ Teilen</span> und dann auf
      <strong>„Zum Home-Bildschirm“</strong> – dann läuft die App auch offline.
    </p>
    <button type="button" onclick={() => (dismissed.value = true)} aria-label="Hinweis schließen">×</button>
  </div>
{/if}

<style>
  .hint {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    background: color-mix(in srgb, var(--accent) 15%, var(--surface));
    border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
    border-radius: var(--radius);
    padding: 0.8rem 0.6rem 0.8rem 1rem;
    font-size: 0.95rem;
  }
  .share { white-space: nowrap; font-weight: 600; }
  button {
    appearance: none;
    border: none;
    background: none;
    color: var(--muted);
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
  }
</style>
