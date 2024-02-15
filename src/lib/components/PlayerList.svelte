<script lang="ts">
    import type { Player } from "$lib/types/Player";

    export let players: Player[];
</script>

<div class="flex flex-col text-brand-700">
    {#if players && players.length}
        {#each players as player}
            <div class="flex border-solid border-brand-500" class:border-b-2={player.ready}>
                {player.username}
            </div>
        {/each}
    {/if}
</div>