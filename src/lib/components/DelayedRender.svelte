<script>
    export let delay = 200;
    export let render = false;

    setTimeout(() => {
        render = true;
    }, delay)
</script>

{#if !render}
    <div class:invisible={!render} class="w-full h-full">
        <slot/>
    </div>
{:else}
    <slot/>
{/if}