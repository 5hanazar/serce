<script lang="ts">
    export let hasStar: boolean;
    export let onStar: any
</script>

<button on:click={onStar}>
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 32 32" class:hasStar>
        <circle class="ring" fill="none" stroke="currentColor" stroke-miterlimit="10" cx="16" cy="16" r="15.5" />
        <path class="star" fill="currentColor" d="m17.5 1 3.7 7.7c.2.5.7.9 1.3 1l8 1.2c1.4.2 2 2 1 3l-5.9 6c-.4.4-.6 1-.5 1.6l1.4 8.4c.3 1.5-1.2 2.6-2.5 1.9l-7.2-4c-.5-.3-1.1-.3-1.6 0l-7.2 4c-1.3.7-2.8-.4-2.5-2l1.4-8.3c0-.6-.1-1.2-.5-1.6l-5.9-6c-1-1-.4-2.8 1-3l8-1.3c.6 0 1.1-.4 1.3-1L14.5 1a1.7 1.7 0 0 1 3 0z" />
        <path class="g1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="m6 6 2 2M1.5 16h3M6 26l2-2M16 27.5v3M24 24l2 2M27.5 16h3M24 8l2-2M16 1.5v3" />
    </svg>
</button>

<style>
    .hasStar > .star {
        color: gold !important;
        animation: star .5s linear;
    }
    .hasStar > .ring, .hasStar > .g1 {
        animation: ripple .2s linear;
    }
    .hasStar > .g1 {
        animation-delay: .2s;
    }
    
    svg {
        display: block;
        width: 1rem;
        color: gold;
        overflow: visible;
    }
    svg>* {
        scale: 2;
        transform-origin: center;
    }

    .star {
        scale: 1;
        color: #eee;
    }
    .ring, .g1 {
        opacity: 0;
    }

    @keyframes star {
        20% {
            transform: scale(0);
        }

        80% {
            transform: scale(0);
        }

        100% {
            transform: scale(1);
        }
    }

    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }

        80% {
            transform: scale(.8);
            opacity: 1;
        }

        100% {
            transform: scale(1);
            opacity: 0;
        }
    }

    button {
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }
</style>