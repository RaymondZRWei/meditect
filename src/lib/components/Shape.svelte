<script lang="ts">
    import { T, T as Threlte, useLoader } from "@threlte/core";
    import { createTransition, Float, GLTF } from "@threlte/extras";
    import * as THREE from "three";

    import { GLTFLoader } from "three/examples/jsm/Addons.js";
    import { gsap } from "gsap";
    import { elasticOut } from "svelte/easing";
    import { onMount } from "svelte";

    export let position: [number, number, number] = [0, 0, 0];
    export let rate: number = 0.5;
    export let path: string = '/dna-model/scene.gltf';
	export let scale: [number, number, number] = [1, 1, 1];

    const sfx = [
        new Audio("/sounds/hit1.ogg"),
        new Audio("/sounds/hit2.ogg"),
        new Audio("/sounds/hit3.ogg"),
        new Audio("/sounds/hit4.ogg"),
        new Audio("/sounds/hit5.ogg"),
    ];

    let visible = false;
    // let model: THREE.Group | null = null;
	let model = useLoader(GLTFLoader).load(path)

    let reducedMotionRate = 0;

    function handleClick(event: MouseEvent) {
        gsap.utils.random(sfx).play();
        if ("object" in event && event.object instanceof THREE.Mesh) {
            gsap.to(event.object.rotation, {
                x: `0`,
                y: `0`,
                z: `+=0.5`,
                duration: 1.3,
                ease: "elastic.out(1,0.3)",
                yoyo: true,
            });
        }
    }

    const bounce = createTransition((ref) => {
        return {
            tick(t) {
                if (t > 0) visible = true;
                ref.scale.set(t * scale[0], t * scale[1], t * scale[2]);
            },
            easing: elasticOut,
            duration: gsap.utils.random(800, 1200),
            delay: gsap.utils.random(0, 500),
        };
    });

    onMount(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        reducedMotionRate = prefersReducedMotion ? 0 : 1;
    });

    $: compoundRate = rate * reducedMotionRate;
</script>

<Threlte.Group position={position.map((p) => p * 2)}>
    <Float
        speed={5 * compoundRate}
        rotationSpeed={3 * compoundRate}
        rotationIntensity={[0, 1, 0.5]}
        floatIntensity={5 * compoundRate}
    >
        {#if $model}
            <T is={$model.scene}
                {visible}
                in={bounce}
                interactive
                on:click={handleClick}
            />
        {/if}
    </Float>
</Threlte.Group>
