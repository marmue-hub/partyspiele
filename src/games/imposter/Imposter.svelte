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
  import PlayerChip from '../../lib/components/PlayerChip.svelte';
  import PlayerAvatar from '../../lib/components/PlayerAvatar.svelte';
  import { uniqueInitials } from '../../lib/initials';
  import { players, type Player } from '../../lib/stores/players.svelte';
  import { persisted } from '../../lib/persisted.svelte';
  import { pick, pickIndices } from '../../lib/random';
  import { categories, pictureCategories } from './words';

  let { onexit }: { onexit: () => void } = $props();

  const MIN_PLAYERS = 3;

  const settings = persisted('imposter:settings', {
    imposters: 1,
    categoryIds: categories.map((c) => c.id),
    showCategoryToImposter: true,
    minutes: 3,
    pictureMode: false,
    pictureCategoryIds: pictureCategories.map((c) => c.id),
  });

  type Phase = 'setup' | 'reveal' | 'discuss' | 'result';
  let phase = $state<Phase>('setup');
  let resolved = $state(false);

  interface Round {
    players: Player[];
    word: string;
    /** Set in picture mode. */
    emoji?: string;
    categoryLabel: string;
    categoryEmoji?: string;
    imposters: Set<number>;
    starter: Player;
    starterInitials: string;
  }
  let round = $state<Round | null>(null);

  // Avoid repeating words within a session.
  const usedWords = new Set<string>();

  const maxImposters = $derived(Math.max(1, Math.floor((players.value.length - 1) / 2)));
  const canStart = $derived(players.value.length >= MIN_PLAYERS);

  function startRound() {
    const list = $state.snapshot(players.value);
    const candidates = settings.value.pictureMode
      ? pictureCategories
          .filter((c) => settings.value.pictureCategoryIds.includes(c.id))
          .flatMap((c) =>
            c.items.map((it) => ({ word: it.word, emoji: it.emoji, categoryLabel: c.label, categoryEmoji: c.emoji })),
          )
      : categories
          .filter((c) => settings.value.categoryIds.includes(c.id))
          .flatMap((c) => c.words.map((w) => ({ word: w, emoji: undefined, categoryLabel: c.label, categoryEmoji: undefined })));
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
    const starterIndex = pick([...list.keys()].filter((i) => !imposters.has(i)));

    round = {
      players: list,
      word: choice.word,
      emoji: choice.emoji,
      categoryLabel: choice.categoryLabel,
      categoryEmoji: choice.categoryEmoji,
      imposters,
      starter: list[starterIndex],
      starterInitials: uniqueInitials(list.map((p) => p.name))[starterIndex],
    };
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
      <Toggle
        label="Bilder-Modus"
        hint="Bild + Wort – auch für Kinder, die noch nicht lesen können."
        bind:checked={settings.value.pictureMode}
      />
    </Card>

    <Card title={settings.value.pictureMode ? 'Bild-Kategorien' : 'Kategorien'}>
      {#if settings.value.pictureMode}
        <ChipSelect
          options={pictureCategories.map((c) => ({ value: c.id, label: `${c.emoji} ${c.label}` }))}
          bind:selected={settings.value.pictureCategoryIds}
        />
      {:else}
        <ChipSelect
          options={categories.map((c) => ({ value: c.id, label: c.label }))}
          bind:selected={settings.value.categoryIds}
        />
      {/if}
    </Card>
  {:else if phase === 'reveal' && round}
    <PassAndReveal players={round.players} ondone={() => (phase = 'discuss')}>
      {#snippet secret(_player, i)}
        {#if round!.imposters.has(i)}
          <span class="role-emoji">🕵️{#if round!.emoji}❓{/if}</span>
          <h2 class="imposter">Du bist der Imposter!</h2>
          {#if settings.value.showCategoryToImposter}
            {#if round!.categoryEmoji}
              <span class="category-emoji">{round!.categoryEmoji}</span>
            {/if}
            <p class="muted">Kategorie: {round!.categoryLabel}</p>
          {/if}
          <p class="muted">Lass dir nichts anmerken.</p>
        {:else if round!.emoji}
          <span class="picture">{round!.emoji}</span>
          <h2 class="picture-word">{round!.word}</h2>
        {:else}
          <p class="label">Dein Wort</p>
          <h2 class="word">{round!.word}</h2>
          <p class="muted">{round!.categoryLabel}</p>
        {/if}
      {/snippet}
    </PassAndReveal>
  {:else if phase === 'discuss' && round}
    <Card>
      <div class="starter">
        <PlayerAvatar color={round.starter.color} initials={round.starterInitials} size="lg" />
        <p class="center big">🎤 <PlayerChip player={round.starter} /> beginnt.</p>
      </div>
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
          <p class="center">🕵️ <PlayerChip player={round.players[i]} size="lg" /></p>
        {/each}
      </Card>
      <Card title={round.emoji ? 'Das Bild' : 'Das Wort'}>
        {#if round.emoji}
          <span class="picture center">{round.emoji}</span>
        {/if}
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
  .category-emoji { font-size: 3rem; }
  .picture { font-size: 8rem; line-height: 1.1; display: block; }
  .picture-word { font-size: 1.6rem; }
  .starter { display: flex; flex-direction: column; align-items: center; gap: 12px; }
</style>
