<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";


    let mounted = false;
    let showBottom = false;

    onMount(() => {
        mounted = true;
        setTimeout(() => {
            showBottom = true;
        }, 1500)
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magic/1.1.0/magic.min.css" integrity="sha512-5KJYgPF7pe0cdJAg/9X6UdHE5cN9fqjjIi8ASyIqlcsKZdHVouNRcweLGEdtrIJJxMn+GqwJBjAurCjWOvEdJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div class="flex justify-center items-center min-h-screen">
    <img src="/logo.png" alt="" class="backdrop:shadow-lg magictime" class:swashIn={mounted}>
</div>

{#if showBottom}
    <div class="fixed bottom-0 left-0 right-0 magictime spaceInDown">
        <div class="flex flex-col gap-3 rounded-t-2xl bg-brand-100 w-full p-3">
            <slot/>
        </div>
    </div>
{/if}