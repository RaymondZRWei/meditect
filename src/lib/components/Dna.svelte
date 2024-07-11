<script lang="ts">
    import { T as Threlte } from "@threlte/core";
    import {
        ContactShadows,
        Environment,
        interactivity,
        transitions,
    } from "@threlte/extras";
    import Shape from "./Shape.svelte";

    interactivity();
    transitions();
</script>

<Threlte.PerspectiveCamera
    makeDefault
    position={[0, 0, 25]}
    aspect={1}
    fov={30}
    near={1}
    far={40}
/>

<Environment files="smallroom.hdr" path="/" format="hdr"></Environment>
<ContactShadows
    position={[0, -6, 0]}
    opacity={0.65}
    scale={100}
    blur={0.5}
    far={30}
></ContactShadows>

<!-- Pill -->
<Shape
    scale={[0.28, 0.28, 0.28]}
    position={[-2, -1, 0]}
    rate={1}
    path={"/dna-model/scene.gltf"}
/>
