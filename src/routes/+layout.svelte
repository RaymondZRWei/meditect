<script lang="ts">
    import "./global.css";

    import { page } from "$app/stores";
    import { Toaster } from "svelte-french-toast";

    import Header from "$lib/components/Header.svelte";
    import game from "$lib/store/game";

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
            : 'block'} absolute inset-0 h-[50vh] bg-gradient-to-b from-slate-400/70 -z-50"
    ></div>

    <Header />

    <main class="h-full w-full">
        <slot />
    </main>
</div>

<Toaster />
