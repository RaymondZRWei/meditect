<script lang="ts">
    export let value: number | null;
    export let maxValue: number;

    const defaultValue = 25;

    const width = 80;
    const height = 75;
    const strokeWidth = 5;

    const describeArc = (
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
    ): string => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    };

    const polarToCartesian = (
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number,
    ): { x: number; y: number } => {
        const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const getColor = (value: number): string => {
        const r = Math.min(255, Math.floor(255 * (value / maxValue)));
        const g = Math.min(
            255,
            Math.floor(255 * ((maxValue - value) / maxValue)),
        );
        return `rgb(${r},${g},0)`;
    };

    const updateValue = (val: number | null): [string, string] => {
        if (!val) val = maxValue;

        const adjustedStartAngle = -25;
        const adjustedEndAngle = 205;

        const endAngle =
            adjustedStartAngle +
            ((val ?? defaultValue) / maxValue) *
                (adjustedEndAngle - adjustedStartAngle);

        svgPath = describeArc(
            width / 2,
            height / 2,
            Math.min(width, height) / 2 - 10,
            adjustedStartAngle,
            endAngle,
        );

        color = getColor(val ?? defaultValue);

        return [svgPath, color];
    };

    $: [svgPath, color] = updateValue(value);
</script>

<div class="relative">
    <svg {width} {height} viewBox={`0 0 ${width} ${height}`}>
        <path
            d={svgPath}
            stroke={color}
            stroke-width={strokeWidth}
            fill="none"
        />
    </svg>
    <div
        class="text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center text-black z-50 pb-1"
    >
        {#if value}
            {value}
        {:else}
            ?
        {/if}
    </div>
</div>
