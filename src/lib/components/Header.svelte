<script lang="ts">
    import { page } from "$app/stores";

    import logo from "$lib/images/logo.png";
    import game from "$lib/store/game";
    import color from "tailwindcss/colors";

    const onScroll = () => {
        const header = document.getElementById("header");

        if (!header) return;

        if (window.scrollY > 100) {
            header.style.background = color.white;
            header.classList.add("shadow-md");
        } else {
            header.style.background = color.transparent;
            header.classList.remove("shadow-md");
        }
    };

    $: isPlaying = $page.url.pathname.includes("/simulation");
</script>

<svelte:window on:scroll={onScroll} />

<header
    class="py-8 px-12 flex overflow-auto {isPlaying && $game !== null
        ? 'absolute'
        : 'sticky z-50 w-full'} top-0 justify-between items-center transition-all"
    id="header"
>
    <a href="/" class="flex items-center gap-3">
        <img src={logo} alt="Meditect Logo" class="size-12" />
        {#if !isPlaying || $game === null}
            <div class="text-3xl font-bold tracking-tight">Meditect</div>
        {/if}
    </a>
</header>
