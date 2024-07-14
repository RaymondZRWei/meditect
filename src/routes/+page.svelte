<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import gsap from "gsap";
    import ScrollTrigger from "gsap/dist/ScrollTrigger";

    import Footer from "$lib/components/Footer.svelte";
    import Scene from "$lib/components/Scene.svelte";

    import MdiGithub from "~icons/mdi/github";
    import SimpleIconsDevpost from "~icons/simple-icons/devpost";
    import gabe from "$lib/images/gabe.webp";
    import raymond from "$lib/images/raymond.webp";
    import henry from "$lib/images/henry.webp";
    import elijah from "$lib/images/elijah.webp";

    if (browser) {
        gsap.registerPlugin(ScrollTrigger);
    }

    onMount(() => {
        // Scroll Indicator
        gsap.to("#mouse", {
            opacity: 0,
            scrollTrigger: {
                trigger: "#content",
                start: "top bottom-=100",
                end: "top bottom-=100",
                scrub: true,
                // markers: true,
            },
        });
    });

    interface TeamMember {
        name: string;
        image: string;
        devPostLink: string;
        githubLink: string;
    }

    const teamMembers: TeamMember[] = [
        {
            name: "Gabe D'Souza",
            image: gabe,
            devPostLink: "https://devpost.com/principle105",
            githubLink: "https://github.com/principle105",
        },
        {
            name: "Raymond Wei",
            image: raymond,
            devPostLink: "https://devpost.com/raymondweizr",
            githubLink: "https://github.com/RaymondZRWei",
        },
        {
            name: "Henry Wei",
            image: henry,
            devPostLink: "https://devpost.com/henryweihw",
            githubLink: "https://github.com/HenryWei8",
        },
        {
            name: "Elijah Won",
            image: elijah,
            devPostLink: "https://devpost.com/ejinsw",
            githubLink: "https://github.com/ejinsw",
        },
    ];
</script>

<div class="relative">
    <div class="relative">
        <section
            class="grid min-h-screen h-full pb-80 pt-12 grid-cols-5 max-w-screen-xl mx-auto"
        >
            <div class="pt-20 col-span-3">
                <h1
                    class="mb-4 text-4xl font-mono tracking-tighter !leading-[1.2] font-bold md:text-5xl xl:text-6xl"
                >
                    Micro-Credentials through a
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                    >
                        Simulated Experience
                    </span>
                </h1>
                <p class="mb-6 text-slate-500 md:mb-10 md:text-lg lg:text-xl">
                    Bridging theory and practice in medicine.
                </p>
                <div>
                    <a
                        class="bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg px-6 py-4"
                        href="/simulation"
                    >
                        Start Simulation
                    </a>
                </div>
            </div>
            <div class="col-span-2">
                <Scene />
            </div>
        </section>
    </div>

    <div
        class="w-10 h-16 border-[3px] border-slate-400 rounded-3xl fixed z-20 bottom-8 left-1/2 before:w-3 before:h-3 before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:bg-slate-400 before:rounded-full before:animate-wheel transition-opacity"
        id="mouse"
    />

    <div class="flex flex-col pt-24" id="content">
        <div class="max-w-screen-lg mx-auto">
            <section>
                <h2 class="text-6xl font-bold text-center mb-16">Our Team</h2>
                <div
                    class="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-32"
                >
                    {#each teamMembers as teamMember}
                        <div class="text-center">
                            <img
                                class="rounded-xl sm:size-48 lg:size-60 mx-auto"
                                src={teamMember.image}
                                alt={teamMember.name}
                            />
                            <div class="mt-2 sm:mt-4">
                                <h3
                                    class="text-sm font-medium text-slate-800 sm:text-base lg:text-lg"
                                >
                                    {teamMember.name}
                                </h3>
                                <div class="flex justify-center gap-1 mt-1">
                                    <a
                                        href={teamMember.devPostLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-slate-600 hover:text-slate-800 transition-colors"
                                    >
                                        <SimpleIconsDevpost class="w-6 h-6" />
                                    </a>
                                    <a
                                        href={teamMember.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-slate-600 hover:text-slate-800 transition-colors"
                                    >
                                        <MdiGithub class="w-6 h-6" />
                                    </a>
                                    {#if teamMember.name == "Raymond Wei"}
                                        <a
                                            href={"https://github.com/inconspicuousaltacc"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-slate-600 hover:text-slate-800 transition-colors"
                                        >
                                            <MdiGithub class="w-6 h-6" />
                                        </a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>
        </div>
    </div>

    <Footer />
</div>
