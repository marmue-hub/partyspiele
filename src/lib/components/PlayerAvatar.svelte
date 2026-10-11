<script lang="ts">
  import { colorHex, textColorOn } from '../colors';

  interface Props {
    /** Color id from PLAYER_COLORS. */
    color: string;
    initials: string;
    size?: 'sm' | 'lg';
  }

  let { color, initials, size = 'sm' }: Props = $props();

  const hex = $derived(colorHex(color));
</script>

<span class="avatar {size}" style:background={hex} style:color={textColorOn(hex)}>{initials}</span>

<style>
  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 800;
    flex-shrink: 0;
    line-height: 1;
  }
  .sm { width: 2.2rem; height: 2.2rem; font-size: 0.8rem; }
  .lg {
    width: 6rem;
    height: 6rem;
    font-size: 2.2rem;
    border: 4px solid rgb(255 255 255 / 0.7);
    box-shadow: 0 4px 14px rgb(0 0 0 / 0.3);
  }
</style>
