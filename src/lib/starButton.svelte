<script lang="ts">
</script>
<button class="like-button">
    <div class="like-wrapper">
        <div class="ripple"></div>
        <svg class="heart" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path d="m12.96 1.63 2.26 4.78c.16.33.46.56.81.61l5.05.77c.88.13 1.23 1.27.6 1.92l-3.66 3.72c-.25.26-.37.63-.3 1l.86 5.25c.15.92-.78 1.62-1.57 1.19l-4.5-2.48c-.31-.17-.7-.17-1.01 0l-4.51 2.48c-.8.43-1.72-.27-1.57-1.19l.87-5.25c.06-.37-.06-.74-.31-1L2.33 9.71c-.64-.65-.29-1.79.6-1.92l5.04-.77c.35-.05.65-.28.8-.61l2.27-4.78a1.05 1.05 0 0 1 1.93 0h-.01z"/></svg>
        <div class="particles" style="--total-particles: 6">
            <div class="particle" style="--i: 1; --color: #FFAB00"></div>
            <div class="particle" style="--i: 2; --color: #FFAB00"></div>
            <div class="particle" style="--i: 3; --color: #FFAB00"></div>
            <div class="particle" style="--i: 4; --color: #FFAB00"></div>
            <div class="particle" style="--i: 5; --color: #FFAB00"></div>
            <div class="particle" style="--i: 6; --color: #FFAB00"></div>
        </div>
    </div>
</button>

<style>
    @charset "UTF-8";

    *,
    *:before,
    *:after {
        position: relative;
        box-sizing: border-box;
    }

    :root {
        --color-bg: #fff;
        --color-heart: #FFAB00;
        --easing: cubic-bezier(.7, 0, .3, 1);
        --duration: .5s;
    }

    .like-button {
        font-size: 1.5rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        border-radius: 50%;
        background: white;
        width: 1em;
        height: 1em;
        padding: 0;
        margin: 0;
        outline: none;
        z-index: 2;
        -webkit-transition: -webkit-transform var(--duration) var(--easing);
        transition: -webkit-transform var(--duration) var(--easing);
        transition: transform var(--duration) var(--easing);
        transition: transform var(--duration) var(--easing), -webkit-transform var(--duration) var(--easing);
        cursor: pointer;
    }

    .like-button:before {
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        -webkit-transition: inherit;
        transition: inherit;
    }

    .like-button:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: inherit;
        z-index: -1;
    }

    .like-button:active:before {
        -webkit-animation: depress-shadow var(--duration) var(--easing) both;
        animation: depress-shadow var(--duration) var(--easing) both;
    }

    .like-button:focus:after {
        -webkit-animation: depress var(--duration) var(--easing) both;
        animation: depress var(--duration) var(--easing) both;
    }

    @-webkit-keyframes depress {

        from,
        to {
            -webkit-transform: none;
            transform: none;
        }

        50% {
            -webkit-transform: translateY(5%) scale(0.9);
            transform: translateY(5%) scale(0.9);
        }
    }

    @keyframes depress {

        from,
        to {
            -webkit-transform: none;
            transform: none;
        }

        50% {
            -webkit-transform: translateY(5%) scale(0.9);
            transform: translateY(5%) scale(0.9);
        }
    }

    @-webkit-keyframes depress-shadow {

        from,
        to {
            -webkit-transform: none;
            transform: none;
        }

        50% {
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
        }
    }

    @keyframes depress-shadow {

        from,
        to {
            -webkit-transform: none;
            transform: none;
        }

        50% {
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
        }
    }

    .like-wrapper {
        display: grid;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        z-index: 1;
    }

    .like-wrapper>* {
        margin: auto;
        grid-area: 1 / 1;
    }

    .heart {
        width: .9em;
        height: .9em;
        display: block;
        -webkit-transform-origin: center center;
        transform-origin: center center;
    }

    .heart>path {
        fill: #ddd;
        -webkit-transition: fill var(--duration) var(--easing);
        transition: fill var(--duration) var(--easing);
    }

    .like-button:focus .heart>path {
        fill: var(--color-heart);
    }

    .like-button:focus .heart {
        -webkit-animation: heart-bounce var(--duration) var(--easing);
        animation: heart-bounce var(--duration) var(--easing);
    }

    @-webkit-keyframes heart-bounce {
        40% {
            -webkit-transform: scale(0.7);
            transform: scale(0.7);
        }

        0%,
        80%,
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes heart-bounce {
        40% {
            -webkit-transform: scale(0.7);
            transform: scale(0.7);
        }

        0%,
        80%,
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    /* Added wrapper to prevent layout jank with resizing particles */
    .particles {
        width: 1px;
        height: 1px;
    }

    .particle {
        position: absolute;
        top: 0;
        left: 0;
        height: .1em;
        width: .1em;
        border-radius: .05em;
        background-color: var(--color);
        --percentage: calc(var(--i) / var(--total-particles));
        --Θ: calc(var(--percentage) * 1turn);
        -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
        transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
        -webkit-transition: all var(--duration) var(--easing);
        transition: all var(--duration) var(--easing);
    }

    .like-button:focus .particle {
        -webkit-animation: particles-out calc(var(--duration) * 1.2) var(--easing) forwards;
        animation: particles-out calc(var(--duration) * 1.2) var(--easing) forwards;
    }

    @-webkit-keyframes particles-out {
        50% {
            height: .3em;
        }

        50%,
        60% {
            height: .3em;
            -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
            transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
        }

        60% {
            height: .2em;
        }

        100% {
            -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
            transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
        }
    }

    @keyframes particles-out {
        50% {
            height: .3em;
        }

        50%,
        60% {
            height: .3em;
            -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
            transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
        }

        60% {
            height: .2em;
        }

        100% {
            -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
            transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
        }
    }

    .ripple {
        height: 1em;
        width: 1em;
        border-radius: 50%;
        overflow: hidden;
        z-index: 1;
    }

    .ripple:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0.4em solid var(--color-heart);
        border-radius: inherit;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    .like-button:focus .ripple:before {
        -webkit-animation: ripple-out var(--duration) var(--easing);
        animation: ripple-out var(--duration) var(--easing);
    }

    @-webkit-keyframes ripple-out {
        from {
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        to {
            -webkit-transform: scale(5);
            transform: scale(5);
        }
    }

    @keyframes ripple-out {
        from {
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        to {
            -webkit-transform: scale(5);
            transform: scale(5);
        }
    }
    /* Reset the animation when clicking again! */
    .like-button:focus {
        pointer-events: none;
        cursor: normal;
    }
</style>