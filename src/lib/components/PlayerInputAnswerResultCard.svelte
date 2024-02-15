<script lang="ts">
    import { svelteStore } from "$lib/store";
    import type { Player } from "$lib/types/Player";
    import { fade } from "svelte/transition";

    export let player: Player;
    export let showAnswer: boolean = true;
    export let index: number = 0;
</script>

<div transition:fade={{ delay: (index * 300) + 600}} class="flex flex-col border-2 border-dashed border-brand-300 p-3 rounded">
    <div class="flex justify-between">
        <div>
            <div class="font-hindi-guntur text-brand-900">{player.username}</div>
            <div class="font-indie-flower text-brand-900">{player.choice}</div>
        </div>
        <div transition:fade={{ delay: ($svelteStore.players.length * 300) + 600 + 300 }} class="self-center">
            {#if showAnswer}
                {#if player.lastAnswerWasCorrect}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check fill-brand-500 current" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-down fill-brand-500" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                    </svg>
                {/if}
            {/if}
        </div>
    </div>
</div>