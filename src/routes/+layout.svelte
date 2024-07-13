<script lang="ts">
    import "./global.css";

    import { page } from "$app/stores";
    import { Toaster } from "svelte-french-toast";

    import game from "$lib/store/game";

    import Header from "$lib/components/Header.svelte";

    $: isPlaying = $page.url.pathname.includes("/simulation");
</script>

<div
    class="min-h-screen grid {isPlaying && $game
        ? 'grid-rows-[auto]'
        : 'grid-rows-[auto_1fr]'} relative"
>
    <div
        class="{isPlaying
            ? 'hidden'
            : 'block'} absolute inset-0 h-[75vh] bg-gradient-to-b from-slate-300 -z-50"
    ></div>

    <Header />

    <main class="h-full w-full">
        <slot />
    </main>
</div>

<Toaster />
