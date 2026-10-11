<script lang="ts">
  import { onMount } from 'svelte';
  import Button from './Button.svelte';

  interface Props {
    seconds: number;
    autostart?: boolean;
    onend?: () => void;
  }

  let { seconds, autostart = false, onend }: Props = $props();

  // svelte-ignore state_referenced_locally
  let remaining = $state(seconds);
  let running = $state(false);
  let endAt = 0;
  let handle: ReturnType<typeof setInterval> | undefined;

  const done = $derived(remaining <= 0);
  const label = $derived.by(() => {
    const s = Math.ceil(remaining);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  });

  function tick() {
    remaining = Math.max(0, (endAt - Date.now()) / 1000);
    if (remaining <= 0) {
      stop();
      beep();
      onend?.();
    }
  }

  function start() {
    if (done) remaining = seconds;
    endAt = Date.now() + remaining * 1000;
    running = true;
    handle = setInterval(tick, 200);
  }

  function stop() {
    running = false;
    clearInterval(handle);
  }

  function reset() {
    stop();
    remaining = seconds;
  }

  function beep() {
    try {
      const ctx = new AudioContext();
      [0, 0.35, 0.7].forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.3, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.3);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.3);
      });
    } catch {
      // audio not available
    }
  }

  onMount(() => {
    if (autostart) start();
    return stop;
  });
</script>

<div class="timer" class:done class:low={!done && remaining <= 10}>
  <div class="time">{label}</div>
  <div class="row">
    {#if running}
      <Button variant="secondary" block onclick={stop}>Pause</Button>
    {:else}
      <Button variant="secondary" block onclick={start}>{done ? 'Neu starten' : remaining < seconds ? 'Weiter' : 'Start'}</Button>
    {/if}
    <Button variant="ghost" onclick={reset} disabled={remaining === seconds && !running}>Reset</Button>
  </div>
</div>

<style>
  .timer { display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
  .time {
    text-align: center;
    font-size: 4rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    transition: color 0.2s;
  }
  .low .time { color: var(--accent); }
  .done .time { color: var(--danger); animation: pulse 0.8s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: 0.4; } }
</style>
