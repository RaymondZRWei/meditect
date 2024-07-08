<script lang="ts">
    // import heroImage from "$lib/images/hero.png";

    import Scene from "$lib/components/Scene.svelte";
</script>

<section>
    <div
        class="grid grid-rows-2 max-w-screen-xl h-fit px-4 py-8 mx-auto md:grid-rows-none lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
        <div class="row-end-1 w-auto mr-auto place-self-center lg:col-span-8">
            <h1
                class="mb-4 text-4xl font-bold tracking-tight !leading-[1.1] md:text-5xl xl:text-6xl"
            >
                Improving Medical Literacy Through
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                >
                    Interactive Learning
                </span>
            </h1>
            <p class="mb-6 opacity-70 lg:mb-8 md:text-lg lg:text-xl">
                Med Ed aims to tackle the problem of medical illiteracy. It
                integrates medical education into a captivating gaming
                experience that hones medical knowledge.
            </p>
            <a class="btn btn-primary" href="/play">Start Playing</a>
        </div>
        <div class="row-end-2 -mx-[200px] md:row-end-1 lg:mt-0 lg:col-span-4 lg:flex">
            <!-- <img src={heroImage} alt="mockup" /> -->
            <Scene />
        </div>
    </div>
</section>
