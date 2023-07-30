<script lang="ts">
	import type { Member } from "@prisma/client";
	import { formatStar, formatTime } from "$lib/front";
	import { invalidateAll } from "$app/navigation";
	import StarButton from "./starButton.svelte";
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
        <StarButton hasStar={post.hasStar} onStar={() => onStar(post.id)} />
        {#if post.countStars > 0}
            <small>{formatStar(post.countStars)}</small>
        {/if}
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
</style>