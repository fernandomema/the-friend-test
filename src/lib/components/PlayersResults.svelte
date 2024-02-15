<script lang="ts">
    import { spin } from "$lib/spintax";
    import type { Player } from "$lib/types/Player";
    import { fade } from "svelte/transition";
    import DelayedRender from "./DelayedRender.svelte";

    export let players: Player[];
    let modulesCount = 0;

    const pairs = (arr: Player[]) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat();

    let couples: Player[][] = pairs(players);
    sortCouplesByScoring();

    function sortCouplesByScoring() {
        couples.sort((a, b) => {
            return (a[0].correctAnswers[a[1].username] + a[1].correctAnswers[a[0].username]) - (b[0].correctAnswers[b[1].username] + b[1].correctAnswers[b[0].username])
        });
    }

    function getPlayerByScore(best: boolean) {
        const orderedPlayers = [...players].sort((a, b) => {
            let aScore = Object.values(a.correctAnswers).length > 0 ? Object.values(a.correctAnswers).reduce((c, d) => c + d) : 0;
            let bScore = Object.values(b.correctAnswers).length > 0 ? Object.values(b.correctAnswers).reduce((c, d) => c + d) : 0;
            if (best) {
                return aScore - bScore;
            } else {
                return aScore + bScore;
            }
        });
        return orderedPlayers[0];
    }

    let bestPlayer = getPlayerByScore(true);
    let worstPlayer = getPlayerByScore(false);

</script>

<div class="mx-auto container p-4 rounded-2xl bg-brand-100 font-hindi-guntur">
    <div class="flex flex-col gap-5">

        <!-- Best couple -->
        <DelayedRender delay={modulesCount++ * 1200}>
            <div in:fade class="flex flex-col gap-5 w-full border-2 border-dashed border-brand-300 p-3 rounded">
                <div class="flex text-xl">
                    Mejor Pareja:
                </div>
                <div class="flex text-3xl font-bold justify-center">
                    {couples[0][0].username} X {couples[0][1].username}
                </div>
                <div class="flex">
                    {spin(`{${couples[0][0].username} y ${couples[0][1].username} se conocen demasiado bien. {|Sera que son novios?|Hacen muy buena pareja|Deberian estar juntos} {|❤️|💕|💘|💟|(๑ᵕ◡ᵕ)(ˆ◡ˆc)|}}`)}
                </div>
            </div>
        </DelayedRender>
    
        <!-- 2n Best couple -->
        {#if couples[1]}
            <DelayedRender delay={modulesCount++ * 1200}>
                <div in:fade class="flex flex-col gap-5 w-full  border-2 border-dashed border-brand-300 p-3 rounded">
                    <div class="flex text-xl ">
                        Segunda mejor Pareja:
                    </div>
                    <div class="flex text-3xl font-bold justify-center">
                        {couples[1][0].username} X {couples[1][1].username}
                    </div>
                    <div class="flex">
                        {#if couples[1][0] == couples[0][0] || couples[1][0] == couples[0][1]}
                            Parece que a {couples[1][0].username} se le da muy bien conocer a los demas
                        {:else if couples[1][1] == couples[0][0] || couples[1][1] == couples[0][1]}
                            Parece que a {couples[1][0].username} se le da muy bien conocer a los demas
                        {:else}
                            {couples[0][0].username} y {couples[0][1].username} tambien parecen conocerse bien.
                        {/if}
                    </div>
                </div>
            </DelayedRender>
        {/if}
    
        <!-- Worst couple -->
        <DelayedRender delay={modulesCount++ * 1200}>
        <div in:fade class="flex flex-col gap-5 w-full border-2 border-dashed border-brand-300 p-3 rounded">
            <div class="flex text-xl">
                Peor Pareja:
            </div>
            <div class="flex text-3xl font-bold justify-center">
                {couples.at(-1)?.[0].username} X {couples.at(-1)?.[1].username}
            </div>
            <div class="flex">
                {spin(`{Sera que ${couples[0][0].username} y ${couples[0][1].username} son enemigos?|${couples[0][0].username} y ${couples[0][1].username} deberian pasar mas tiempo juntos{ | parece que apenas se conocen| no parecen conocerse en absoluto}}`)}
            </div>
        </div>
        </DelayedRender>
    
        <!-- Best player -->
        <DelayedRender delay={modulesCount++ * 1200}>
        <div in:fade class="flex flex-col gap-5 w-full border-2 border-dashed border-brand-300 p-3 rounded">
            <div class="flex text-xl">
                Mejor amig@
            </div>
            <div class="flex text-3xl font-bold justify-center">
                {bestPlayer.username}
            </div>
            <div class="flex">
                {spin(`{Parece ser que ${bestPlayer.username} {os conoce mejor que nadie|es el/la amig@ que mejor os conoce}. {|Alguna vez entra en su casa?}}`)}
            </div>
        </div>
        </DelayedRender>
    
        <!-- Worst player -->
        <DelayedRender delay={modulesCount++ * 1200}>
        <div in:fade class="flex flex-col gap-5 w-full border-2 border-dashed border-brand-300 p-3 rounded">
            <div class="flex text-xl">
                Peor amig@
            </div>
            <div class="flex text-3xl font-bold justify-center">
                {worstPlayer.username}
            </div>
            <div class="flex">
                {spin(`{{Parece ser que|Creo que|Me parece que} ${worstPlayer.username} {casi no|apenas} conoce a nadie. {|Seguro que es vuestr@ amig@?|Sera que se ha colado en esta fiesta?|Es nuev@ en el grupo?|Alguien sabe quien es?}}`)}
            </div>
        </div>
        </DelayedRender>
    
        <!-- Overview -->
        <div class="flex flex-col gap-5 w-full">
            {#each couples as couple}
                <DelayedRender>
                    <div in:fade={{delay: modulesCount++ * 1200}} class="border-2 border-dashed border-brand-300 p-3 rounded">
                        <div class="flex text-3xl font-bold justify-center">
                            {couple[0].username} x {couple[1].username}
                        </div>
                        <div class="flex border-2 border-solid border-brand-500 padding-3 rounded-3xl overflow-hidden">
                            <div class="h-10 bg-brand-600" style="width: {((couple[0].correctAnswers[couple[1].username] || 0) * 50) / (couple[0].answerCount[couple[1].username] || 0)}%;">
                            </div>
                            <div class="h-10 bg-brand-400" style="width: {((couple[1].correctAnswers[couple[0].username] || 0) * 50) / (couple[1].answerCount[couple[0].username] || 0)}%;">
            
                            </div>
                        </div>
                        <div class="text-brand-900 mt-3">
                            {couple[0].username} a respondido bien {couple[0].answerCount[couple[1].username] || 0} preguntas sobre {couple[1].username} de las {couple[0].correctAnswers[couple[1].username] || 0} que ha respondido.<br>
                            {couple[1].username} a respondido bien {couple[1].answerCount[couple[0].username] || 0} preguntas sobre {couple[0].username} de las {couple[1].correctAnswers[couple[0].username] || 0} que ha respondido.
                        </div>
                    </div>
                </DelayedRender>
            {/each}
        </div>
        
    </div>
</div>