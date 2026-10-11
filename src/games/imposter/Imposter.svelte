<script lang="ts">
  import Screen from '../../lib/components/Screen.svelte';
  import Card from '../../lib/components/Card.svelte';
  import Button from '../../lib/components/Button.svelte';
  import Stepper from '../../lib/components/Stepper.svelte';
  import Toggle from '../../lib/components/Toggle.svelte';
  import ChipSelect from '../../lib/components/ChipSelect.svelte';
  import PlayerSetup from '../../lib/components/PlayerSetup.svelte';
  import PassAndReveal from '../../lib/components/PassAndReveal.svelte';
  import Timer from '../../lib/components/Timer.svelte';
  import { players } from '../../lib/stores/players.svelte';
  import { persisted } from '../../lib/persisted.svelte';
  import { pick, pickIndices } from '../../lib/random';
  import { categories } from './words';

  let { onexit }: { onexit: () => void } = $props();

  const MIN_PLAYERS = 3;

  const settings = persisted('imposter:settings', {
    imposters: 1,
    categoryIds: categories.map((c) => c.id),
    showCategoryToImposter: true,
    minutes: 3,
  });

  type Phase = 'setup' | 'reveal' | 'discuss' | 'result';
  let phase = $state<Phase>('setup');
  let resolved = $state(false);

  interface Round {
    players: string[];
    word: string;
    categoryLabel: string;
    imposters: Set<number>;
    starter: string;
  }
  let round = $state<Round | null>(null);

  // Avoid repeating words within a session.
  const usedWords = new Set<string>();

  const maxImposters = $derived(Math.max(1, Math.floor((players.value.length - 1) / 2)));
  const canStart = $derived(players.value.length >= MIN_PLAYERS);

  function startRound() {
    const list = [...players.value];
    const pool = categories.filter((c) => settings.value.categoryIds.includes(c.id));
    const candidates = pool.flatMap((c) => c.words.map((w) => ({ word: w, category: c })));
    let fresh = candidates.filter((c) => !usedWords.has(c.word));
    if (fresh.length === 0) {
      usedWords.clear();
      fresh = candidates;
    }
    const choice = pick(fresh);
    usedWords.add(choice.word);

    const imposterCount = Math.min(settings.value.imposters, maxImposters);
    const imposters = new Set(pickIndices(list.length, imposterCount));
    // The imposter shouldn't have to open the round.
    const starter = pick(list.filter((_, i) => !imposters.has(i)));

    round = { players: list, word: choice.word, categoryLabel: choice.category.label, imposters, starter };
    resolved = false;
    phase = 'reveal';
  }

  function back() {
    if (phase === 'setup') onexit();
    else phase = 'setup';
  }

  const title = $derived(
    { setup: 'Imposter', reveal: 'Rollen ansehen', discuss: 'Diskussion', result: 'Auflösung' }[phase],
  );
</script>

<Screen {title} onback={back}>
  {#if phase === 'setup'}
    <Card>
      <p>
        Alle bekommen dasselbe geheime Wort – nur der <strong>Imposter</strong> nicht. Reihum sagt jeder ein Wort
        dazu. Findet den Imposter, bevor er das Wort errät!
      </p>
    </Card>

    <PlayerSetup bind:players={players.value} min={MIN_PLAYERS} />

    <Card title="Einstellungen">
      <Stepper label="Imposter" bind:value={settings.value.imposters} min={1} max={maxImposters} />
      <Stepper
        label="Diskussionszeit"
        bind:value={settings.value.minutes}
        min={0}
        max={15}
        format={(m) => (m === 0 ? 'aus' : `${m} min`)}
      />
      <Toggle
        label="Kategorie-Hinweis"
        hint="Der Imposter sieht die Kategorie des Wortes."
        bind:checked={settings.value.showCategoryToImposter}
      />
    </Card>

    <Card title="Kategorien">
      <ChipSelect
        options={categories.map((c) => ({ value: c.id, label: c.label }))}
        bind:selected={settings.value.categoryIds}
      />
    </Card>
  {:else if phase === 'reveal' && round}
    <PassAndReveal players={round.players} ondone={() => (phase = 'discuss')}>
      {#snippet secret(_player, i)}
        {#if round!.imposters.has(i)}
          <span class="role-emoji">🕵️</span>
          <h2 class="imposter">Du bist der Imposter!</h2>
          {#if settings.value.showCategoryToImposter}
            <p class="muted">Kategorie: {round!.categoryLabel}</p>
          {/if}
          <p class="muted">Lass dir nichts anmerken.</p>
        {:else}
          <p class="label">Dein Wort</p>
          <h2 class="word">{round!.word}</h2>
          <p class="muted">{round!.categoryLabel}</p>
        {/if}
      {/snippet}
    </PassAndReveal>
  {:else if phase === 'discuss' && round}
    <Card>
      <p class="center big">🎤 <strong>{round.starter}</strong> beginnt.</p>
      <p class="muted center">Reihum sagt jeder ein Wort zum Begriff. Danach wird diskutiert und abgestimmt.</p>
    </Card>
    {#if settings.value.minutes > 0}
      <Card>
        <Timer seconds={settings.value.minutes * 60} />
      </Card>
    {/if}
  {:else if phase === 'result' && round}
    {#if !resolved}
      <Card>
        <p class="center big">Abgestimmt?</p>
        <p class="muted center">Zeigt gleichzeitig auf euren Verdächtigen – dann auflösen.</p>
      </Card>
    {:else}
      <Card title={round.imposters.size > 1 ? 'Die Imposter' : 'Der Imposter'}>
        {#each [...round.imposters] as i (i)}
          <h2 class="imposter center">🕵️ {round.players[i]}</h2>
        {/each}
      </Card>
      <Card title="Das Wort">
        <h2 class="word center">{round.word}</h2>
        <p class="muted center">{round.categoryLabel}</p>
      </Card>
    {/if}
  {/if}

  {#snippet footer()}
    {#if phase === 'setup'}
      <Button size="lg" block disabled={!canStart} onclick={startRound}>Spiel starten</Button>
    {:else if phase === 'discuss'}
      <Button size="lg" block onclick={() => (phase = 'result')}>Zur Abstimmung</Button>
    {:else if phase === 'result'}
      {#if !resolved}
        <Button size="lg" block onclick={() => (resolved = true)}>Auflösen</Button>
      {:else}
        <Button size="lg" block onclick={startRound}>Neue Runde</Button>
        <Button block variant="ghost" onclick={() => (phase = 'setup')}>Einstellungen</Button>
      {/if}
    {/if}
  {/snippet}
</Screen>

<style>
  .role-emoji { font-size: 4rem; }
  .imposter { color: var(--pink); font-size: 2rem; }
  .word { color: var(--accent); font-size: 2.6rem; word-break: break-word; }
  .big { font-size: 1.3rem; }
</style>
