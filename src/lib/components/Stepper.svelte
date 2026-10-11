<script lang="ts">
  interface Props {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    /** Optional display formatter, e.g. for minutes. */
    format?: (v: number) => string;
  }

  let { label, value = $bindable(), min = 0, max = 99, step = 1, format = String }: Props = $props();

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  $effect(() => {
    if (value !== clamp(value)) value = clamp(value);
  });
</script>

<div class="stepper">
  <span class="grow">{label}</span>
  <button type="button" onclick={() => (value = clamp(value - step))} disabled={value <= min} aria-label="weniger">−</button>
  <output>{format(value)}</output>
  <button type="button" onclick={() => (value = clamp(value + step))} disabled={value >= max} aria-label="mehr">+</button>
</div>

<style>
  .stepper { display: flex; align-items: center; gap: 0.6rem; }
  button {
    appearance: none;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
    font-size: 1.3rem;
    cursor: pointer;
    touch-action: manipulation;
  }
  button:disabled { opacity: 0.35; }
  output { min-width: 3.2rem; text-align: center; font-weight: 700; font-variant-numeric: tabular-nums; }
</style>
