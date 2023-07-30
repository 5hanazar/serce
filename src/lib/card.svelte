<script lang="ts">
	import type { Member } from "@prisma/client";
	import { formatTime } from "$lib/front";
	import { invalidateAll } from "$app/navigation";
    export let post: import("@prisma/client").Post & {member: Member}
    const onStar = async (postId: number) => {
        const response = await fetch('/', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ postId }),
		});
		if (response.ok) {
            await invalidateAll();
        }
    }
</script>
<article>
    <div>
        <img src="" alt="">
        <b>{post.member.fullName}</b>
        <small>{formatTime(post.createdDate)}</small>
    </div>
    <p>
        {post.description}
    </p>
    <div class="bottom">
        <button on:click={() => onStar(post.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class:hasStar={post.hasStar} fill="currentColor"><path d="m17.55 1.66 3.6 7.31c.26.51.74.86 1.3.94l8.07 1.18c1.42.2 1.98 1.94.96 2.94l-5.84 5.69c-.4.4-.6.97-.5 1.52l1.38 8.04a1.72 1.72 0 0 1-2.5 1.82l-7.22-3.8c-.5-.26-1.1-.26-1.6 0l-7.22 3.8a1.72 1.72 0 0 1-2.5-1.82l1.38-8.04c.1-.55-.1-1.12-.5-1.52l-5.84-5.7c-1.02-.99-.46-2.73.96-2.93l8.07-1.17a1.72 1.72 0 0 0 1.3-.95l3.6-7.31a1.72 1.72 0 0 1 3.1 0z"/></svg>
        </button>
        <small>{post.countStars > 0 ? post.countStars : ''}</small>
    </div>
</article>

<style>
    article {
        box-shadow: 0 0 4px #00000030;
        padding: 1rem;
        margin: 1rem 0;
    }
    img {
        background-color: #eee;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }
    svg {
        color: #eee;
        width: 1rem;
        display: block;
    }
    button {
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }
    div {
        display: flex;
        gap: .5rem;
    }
    b {
        align-self: center;
        margin-right: auto;
    }
    .bottom {
        justify-content: end;
    }
    .bottom > small {
        align-self: center;
    }
    .hasStar {
        color: gold;
    }
</style>