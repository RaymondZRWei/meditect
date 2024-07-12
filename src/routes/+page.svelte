<script lang="ts">
    import Scene from "$lib/components/Scene.svelte";
</script>

<section class="grid h-full pb-32 pt-6 grid-cols-5 max-w-screen-xl mx-auto">
    <div class="pt-32 col-span-3">
        <h1
            class="mb-4 text-4xl font-mono tracking-tighter !leading-[1.2] font-semibold md:text-5xl xl:text-6xl"
        >
            Medical Education through
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            >
                Simulated Experience
            </span>
        </h1>
        <p class="mb-6 text-slate-500 md:mb-8 md:text-lg lg:text-xl">
            There was a problem with learning medicine, it was boring! Med Ed
            solves that issue with game driven teaching where learning isn't
            just not boring, it's fun!
        </p>
        <div>
            <a
                class="bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg px-6 py-4"
                href="/game"
            >
                Start Playing
            </a>
        </div>
    </div>
    <div class="col-span-2">
        <Scene />
    </div>
</section>
