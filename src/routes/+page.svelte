<script lang="ts">
    import { syncedStore, getYjsValue } from "@syncedstore/core";
    import { svelteSyncedStore } from "@syncedstore/svelte";

    import { svelteStore, getRtcProvider } from "$lib/store";
    import { onDestroy, onMount } from "svelte";
    import { RoomStatus } from "$lib/RoomStatus";
    import { JoinStatus } from "$lib/JoinStatus";
    import { blur, fade, fly, slide } from "svelte/transition";
    import PlayerList from "$lib/components/PlayerList.svelte";
    import { questions } from "$lib/questions";
    import { QuestionType, type Question } from "$lib/types/Question";
    import type { Player } from "$lib/types/Player";
    import type { WebrtcProvider } from "y-webrtc";
    import classes from "svelte-transition-classes";
    import Splash from "$lib/components/Splash.svelte";
    import DelayedRender from "$lib/components/DelayedRender.svelte";
    import PlayerResults from "$lib/components/CouplePlayerResults.svelte";
    import PlayersResults from "$lib/components/PlayersResults.svelte";
    import BottomModal from "$lib/components/bottomModal.svelte";
    import PlayerInputAnswerResultCard from "$lib/components/PlayerInputAnswerResultCard.svelte";
    import { text } from "@sveltejs/kit";

    const rounds = 4;
    let loaded = false;
    let rtc: WebrtcProvider;
    
    let joinStatus = JoinStatus.splash;

    let roomId: string | null;
    let username: string = "";
    let player: Player | undefined;
    let question: Question | undefined;
    let currentQuestion: string | undefined;
    let allPlayersReady: boolean = false;
    let couples: [Player[]];

    onMount(() => {
        localStorage.log = 'true'
        loaded = true;
        roomId = localStorage.getItem('roomId');
        const searchParams = new URL(document.location).searchParams;
        if (searchParams.has('username')) {
            username = searchParams.get('username')!;
        } else if (localStorage.getItem('username')) {
            username = localStorage.getItem('username')!;
        }
        initializeRoom();
        setTimeout(() => {
            //joinStatus = JoinStatus.menu;
        }, 1250)
        svelteStore.subscribe((data) => {
            player = data.players.find(p => p.username == username);
            question = data.room.currentQuestion;
            currentQuestion = question?.question;
            allPlayersReady = $svelteStore.players.filter(p => p.ready).length == $svelteStore.players.length;
            if (currentQuestion) {
                data.players.forEach((player, index) => {
                    currentQuestion = currentQuestion!.replace(`{user${index+1}}`, player.username);
                })
            } 
        })
    });

    onDestroy(() => {
        console.log('dis');
        //if (rtc) rtc.disconnect();
    });

    function focus(el) {
        el.focus();
    }

    function similarity(a,b) {
        var equivalency = 0;
        var minLength = (a.length > b.length) ? b.length : a.length;    
        var maxLength = (a.length < b.length) ? b.length : a.length;    
        for(var i = 0; i < minLength; i++) {
            if(a[i] == b[i]) {
                equivalency++;
            }
        }
        

        var weight = equivalency / maxLength;
        return weight * 100;
    }

    function setStatus(status: RoomStatus) {
        $svelteStore.room.status = status;
    }

    function joinPlayer(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        localStorage.setItem('username', username);
        if (!$svelteStore.players.find(p => p.username == username)) {
            $svelteStore.players.push({
                username: username,
                host: ($svelteStore.players.length == 0) as boolean,
                ready: false,
                choice: "",
                correctAnswers: {},
                answerCount: {},
                lastAnswerWasCorrect: false
            });
        }
        joinStatus = JoinStatus.joined;
        $svelteStore.players.forEach(p => {
            if (p.username == username) player = p;
        });
    }

    function joinRoom() {
        if (!roomId) return;
        localStorage.setItem('roomId', roomId);
        let {webrtcProvider} = getRtcProvider(roomId);
        rtc = webrtcProvider;
        joinStatus = JoinStatus.username;
    }

    function initializeRoom() {
        setStatus(RoomStatus.waitingPlayersJoin);
    }


    function toggleReady(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        $svelteStore.players.forEach(player => {
            if (player.username == username) {
                if (player.ready && $svelteStore.room.status != RoomStatus.waitingPlayersJoin) return;
                player.ready = !player.ready;
            }
        });
    }


    function startMatch(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        questions.sort(() => 0.5 - Math.random());
        $svelteStore.room.currentQuestion = questions[0];
        $svelteStore.room.currentPlayers = JSON.parse(JSON.stringify($svelteStore.players)).sort(() => 0.5 - Math.random())
        $svelteStore.players.forEach(p => p.ready = false);
        $svelteStore.room.currentRound = 0;
        setStatus(RoomStatus.waitingPlayerAnswers);
    }


    function nextRound(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        const currentPlayer = $svelteStore.players.find(p => p.username == $svelteStore.room.currentPlayers![0].username)!;
        $svelteStore.players.forEach( p => {
            if (p.username == currentPlayer.username) return console.log('hoster', p.choice);
            if (question?.type == QuestionType.input) {
                console.log(JSON.parse(JSON.stringify(currentPlayer)))
                console.log(p.choice, currentPlayer.choice, similarity(p.choice, currentPlayer.choice))
            }
            if ((question?.type == QuestionType.input && similarity(p.choice, currentPlayer.choice) >= 75) || (question?.type != QuestionType.input && p.choice == currentPlayer.choice)) {
                if (!p.correctAnswers[currentPlayer.username]) p.correctAnswers[currentPlayer.username] = 0;
                p.correctAnswers[currentPlayer.username]++;
            }
            if (!p.answerCount[currentPlayer.username]) p.answerCount[currentPlayer.username] = 0;
            p.answerCount[currentPlayer.username]++;
        }); 

        $svelteStore.room.currentRound!++;

        if ($svelteStore.room.currentRound! < rounds) {
            questions.sort(() => 0.5 - Math.random());
            $svelteStore.room.currentQuestion = questions[0];
            $svelteStore.room.currentPlayers = JSON.parse(JSON.stringify($svelteStore.players)).sort(() => 0.5 - Math.random())
            $svelteStore.players.forEach(p => {
                p.ready = false;
                p.choice = '';
            });
            setStatus(RoomStatus.waitingPlayerAnswers);
        } else {
            setStatus(RoomStatus.results);
            
        }

    }

</script>

<div class="w-full min-h-screen bg-gradient-to-br from-brand-300 to-brand-700 font-hindi-guntur font-bold s" class:hidden={!loaded} class:in-circle-hesitate={loaded}>
    {#key joinStatus}
        <div out:fade in:fade={{delay: 450}}>
            {#if joinStatus == JoinStatus.splash}
                {#if loaded}    
                    <Splash>
                        <div class="flex flex-col gap-5">
                            <div>Que estas buscando?</div>
                            <DelayedRender delay={800}>
                                <div class="flex flex-col gap-5">
                                    <a href="#" on:click={() => {joinStatus = JoinStatus.roomId}} class="magictime puffIn relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-brand-600 transition-all duration-150 ease-in-out rounded hover:pr-6 bg-gray-50 group">
                                        <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-brand-600 group-hover:h-full"></span>
                                        <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                            <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Invitar a mis amigos</span>
                                    </a>
                                    <DelayedRender delay={500}>
                                    <a href="#" on:click={() => {joinStatus = JoinStatus.roomId}} class="magictime puffIn relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-brand-600 transition-all duration-150 ease-in-out rounded hover:pr-6 bg-gray-50 group">
                                        <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-brand-600 group-hover:h-full"></span>
                                        <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                            <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Unirme a mis amigos</span>
                                    </a>
                                    </DelayedRender>
                                </div>
                            </DelayedRender>
                        </div>
                    </Splash>
                {/if}
            {:else if joinStatus == JoinStatus.username}
                <div class="pt-5 flex flex-col px-5">
                    <div class="text-5xl text-white">Bienvenido!</div>
                    <div class="text-2xl text-white">Vamos a presentarnos</div>
                </div>

                <div class="mx-2 p-4 rounded-2xl bg-brand-100 mt-5">
                    <div class="container mx-auto text-brand-700 text-2xl">
                        <div class="flex flex-col gap-5">
                            <div class="border-b-2 border-solid border-brand-500">Como te llaman tus amigos?</div>
                            <input type="text" bind:value={username} use:focus placeholder="Juan alberto" class="focus:outline-none font-indie-flower text-center py-3 pl-4 pr-12 font-semibold text-brand-600 rounded bg-transparent"/>
                        </div>
                    </div>
                </div>

                {#if username}
                    <div class="fixed bottom-0 left-0 right-0">
                        <div class="flex flex-col gap-3 rounded-t-2xl bg-brand-100 w-full p-3">
                            <button transition:fade class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" on:click={joinPlayer}>
                                Me llaman <span class="font-indie-flower underline">{username}</span>
                            </button>
                        </div>
                    </div>
                {/if}
            {:else if joinStatus == JoinStatus.roomId}
                <div class="pt-5 flex flex-col px-5">
                    <div class="text-5xl text-white">Genial!</div>
                    <div class="text-2xl text-white">Vamos a encontrar tus amigos</div>
                </div>

                <div class="mx-2 p-4 rounded-2xl bg-brand-100 mt-5">
                    <div class="container mx-auto text-brand-700 text-2xl">
                        <div class="flex flex-col gap-5">
                            <div class="border-b-2 border-solid border-brand-500">Cual es el codigo de la sala?</div>
                            <input type="text" bind:value={roomId} use:focus placeholder="123456" class="focus:outline-none font-indie-flower text-center py-3 pl-4 pr-12 font-semibold text-brand-600 rounded bg-transparent"/>
                        </div>
                    </div>
                </div>

                {#if roomId}
                    <BottomModal>
                        <button transition:fade class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" on:click={joinRoom}>
                            Encuentra a mis amigos
                        </button>
                    </BottomModal>
                {/if}
            {:else}
                {#if $svelteStore.room.status == RoomStatus.waitingPlayersJoin}
                    <div class="pt-5 flex flex-col px-5">
                        <div class="text-5xl text-white">Preparados, listos...</div>
                        <div class="text-2xl text-white">Esperando a que se unan todos los jugadores</div>
                    </div>
                    <div class="mx-2 p-4 rounded-2xl bg-brand-100 mt-5">
                        <PlayerList players={$svelteStore.players}></PlayerList>
                    </div>
                    <div class="fixed bottom-0 left-0 right-0">
                        <div class="flex flex-col gap-3 rounded-t-2xl bg-brand-100 w-full p-3">
                            {#each $svelteStore.players as player}
                                {#if player.username == username}
                                    {#if player.host && allPlayersReady}
                                        <button 
                                                class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-500 text-white" 
                                                on:click={startMatch}
                                            >    
                                            Comenzar la partida
                                        </button>
                                    {/if}
                                    {#if player.ready}
                                        <button 
                                            class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" 
                                            on:click={toggleReady}
                                        >
                                            Ya no estoy listo
                                        </button>
                                    {:else}
                                        <button
                                            class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" 
                                            on:click={toggleReady}
                                        >
                                            Estoy listo
                                        </button>
                                    {/if}
                                {/if}
                            {/each }
                        </div>
                    </div>
                {:else if $svelteStore.room.status == RoomStatus.waitingPlayerAnswers}
                    <div class="pt-5 flex flex-col px-5">
                        <div class="text-2xl text-white">
                            {currentQuestion} 
                        </div>
                    </div>
                    <div class="mx-2 p-4 rounded-2xl bg-brand-100 mt-5">
                        <div class="flex flex-col gap-8 mb-8">
                            {#if question?.type == QuestionType.choice}
                                {#each question.choices || [] as choice}
                                <button class="relative text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" on:click={(e) => {
                                    player.choice = choice.text;
                                    toggleReady(e);
                                }}>
                                    {choice.text}
                                    {#if allPlayersReady}
                                        <div class="absolute bottom-0 translate-y-1/2 flex z-10">
                                            {#each $svelteStore.players.filter(p => p.choice == choice.text) as player}
                                                <div class="w-10 h-10 bg-brand-950 rounded-full">
                                                    <img src="https://ui-avatars.com/api/?name={player.username}" alt="" class="w-full h-full rounded-full">
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </button>
                                {/each}
                            {:else if question?.type == QuestionType.boolean}
                                <button class="relative text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" on:click={(e) => {
                                    player.choice = 'true';
                                    toggleReady(e);
                                }}>
                                    Si
                                    {#if allPlayersReady}
                                        <div class="absolute bottom-0 translate-y-1/2 flex z-10">
                                            {#each $svelteStore.players.filter(p => p.choice == 'true') as player}
                                                <div class="w-10 h-10 bg-brand-950 rounded-full">
                                                    <img src="https://ui-avatars.com/api/?name={player.username}" alt="" class="w-full h-full rounded-full">
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </button>
                                <button class="relative text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" on:click={(e) => {
                                    player.choice = 'false';
                                    toggleReady(e);
                                }}>
                                    No
                                    {#if allPlayersReady}
                                        <div class="absolute bottom-0 translate-y-1/2 flex z-10">
                                            {#each $svelteStore.players.filter(p => p.choice == 'false') as player}
                                                <div class="w-10 h-10 bg-brand-950 rounded-full">
                                                    <img src="https://ui-avatars.com/api/?name={player.username}" alt="" class="w-full h-full rounded-full">
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </button>
                            {:else if question?.type == QuestionType.input}
                                <div class="flex flex-col gap-5">
                                    {#if !allPlayersReady}
                                        {#if player}
                                            <input type="text" use:focus bind:value={player.choice} placeholder={question.placeholder} class="font-indie-flower text-center py-3 pl-4 pr-12 font-semibold text-brand-600 rounded bg-transparent"/>
                                        {/if}
                                    {:else}
                                        {#each $svelteStore.players as player, index}
                                            {#if player.username != $svelteStore.room.currentPlayers?.[0].username}
                                                <PlayerInputAnswerResultCard player={player} index={index}/>
                                            {/if}
                                        {/each}
                                        <PlayerInputAnswerResultCard player={$svelteStore.players.find(p => p.username == $svelteStore.room.currentPlayers?.[0].username)} index={0} showAnswer={false}/>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="fixed bottom-0 left-0 right-0">
                        <div class="flex flex-col gap-3 rounded-t-2xl bg-brand-100 w-full p-3">
                            {#if player?.host && allPlayersReady}
                                <button 
                                        class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-500 text-white" 
                                        on:click={nextRound}
                                    >
                                    Continuar
                                </button>
                            {/if}
                            {#if !player?.ready && (question?.type == QuestionType.input || question?.type == QuestionType.number)}
                                <button
                                    class="text-center w-full rounded border-2 border-brand-500 border-solid py-2 bg-brand-700 text-white" 
                                    on:click={toggleReady}
                                >
                                    Enviar mi respuesta
                                </button>
                            {/if}
                        </div>  
                    </div> 
                {:else if $svelteStore.room.status == RoomStatus.results}
                    {#if $svelteStore.room.currentPlayers?.[0] && $svelteStore.room.currentPlayers?.[1]}
                        <PlayersResults players={$svelteStore.players}></PlayersResults>
                    {/if}
                {/if}
            {/if}
        </div>
    {/key}
</div>

<style>
    @keyframes circle-in-hesitate {
        0% {
            clip-path: circle(0%);
        }
        40% {
            clip-path: circle(40%);
        }
        100% {
            clip-path: circle(125%);
        }
    }

    .in-circle-hesitate {
        animation: 2.5s cubic-bezier(.25, 1, .30, 1) circle-in-hesitate both;
    }
</style>



