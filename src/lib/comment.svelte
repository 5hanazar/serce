<script lang="ts">
	import type { Member } from "@prisma/client";
	import { formatGreek } from "$lib/front";
	import { invalidateAll } from "$app/navigation";
	import LikeButton from "$lib/likeButton.svelte";
	import Description from "$lib/description.svelte";
	export let userId: number;
	export let comment: import("@prisma/client").Comment & { member: Member };
	const onLikeClick = async (postId: number) => {
		const response = await fetch("/", {
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
	};
</script>

<article>
    <Description member={comment.member} description={comment.description} createdDate={comment.createdDate} />
	<div>
		{#if comment.member.id == userId}
			<button class="edit">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" d="M23.9 21.8V30h-22V8.2h8.3"/><path fill="currentColor" d="M30 7.3a2 2 0 0 1-.7 1.5L14.7 23.4H8.5v-6.1L23.2 2.6a2 2 0 0 1 1.5-.6 2 2 0 0 1 1.6.7l3 3c.5.5.7 1 .7 1.6z"/></svg>
				<small>Edit</small>
			</button>
		{/if}
		<LikeButton isLiked={comment.isLiked} onClick={() => onLikeClick(comment.id)} />
		{#if comment.likeCount > 0}
			<small>{formatGreek(comment.likeCount)}</small>
		{/if}
	</div>
</article>

<style>
	article {
		margin: 1rem 0;
		box-shadow: 0 0 4px #00000030;
		padding: 1rem;
	}
	div {
		display: flex;
		gap: 0.5rem;
        justify-content: end;
	}
	small {
		align-self: center;
	}
	svg {
        display: block;
		width: 1rem;
		color: #ddd;
	}
	button {
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
	}
    button, a {
        margin-left: 1rem;
    }
	.edit {
		display: flex;
		margin: 0;
		font-size: 1rem;
		gap: 0.5rem;
	}
</style>
