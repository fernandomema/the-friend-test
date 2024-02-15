<script lang="ts">
    import type { Player } from "$lib/types/Player";
    import DelayedRender from "./DelayedRender.svelte";

    export let player1: Player;
    export let player2: Player;
</script>

<div class="flex flex-col w-full">
    <div class="flex justify-center items-center">
        <img src="{player1.avatar}" alt="">
        X
        <img src="{player2.avatar}" alt="">

    </div>
    <div class="flex justify-center">
        {player1.username}
        x
        {player2.username}
    </div>
    
    <div>
        <!-- liquid meter -->
    </div>

    <div class="flex flex-col gap-3">
        <div class="flex justify-between">
            <DelayedRender delay={100}>
                <div>Preguntas respondidas correctamente</div>
                <div>4/10</div>
            </DelayedRender>
            <DelayedRender delay={300}>
                <div>Preguntas respondidas correctamente</div>
                <div>4/10</div>
            </DelayedRender>
            <DelayedRender delay={600}>
                <div>Preguntas respondidas correctamente</div>
                <div>4/10</div>
            </DelayedRender>
            <DelayedRender delay={900}>
                <div>Preguntas respondidas correctamente</div>
                <div>4/10</div>
            </DelayedRender>
            <DelayedRender delay={1200}>
                <div>Preguntas respondidas correctamente</div>
                <div>4/10</div>
            </DelayedRender>
            <DelayedRender delay={1500}>
                <div>Preguntas respondidas correctamente</div>
                <div>4/10</div>
            </DelayedRender>
        </div>
    </div>
</div>