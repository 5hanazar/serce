<script lang="ts">
	import type { Member } from "@prisma/client";
	import { formatGreek, formatTime } from "$lib/front";
	import { invalidateAll } from "$app/navigation";
	import StarButton from "./starButton.svelte";
	export let memberId: number;
	export let post: import("@prisma/client").Post & { member: Member };
	const onStar = async (postId: number) => {
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
	<div>
		<img src="" alt="" />
		<b>{post.member.fullName}</b>
		<small>{formatTime(post.createdDate)}</small>
	</div>
	<p>
		{post.description}
	</p>
	<div class="bottom">
		{#if post.memberId == memberId}
			<button class="edit">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" d="M23.9 21.8V30h-22V8.2h8.3"/><path fill="currentColor" d="M30 7.3a2 2 0 0 1-.7 1.5L14.7 23.4H8.5v-6.1L23.2 2.6a2 2 0 0 1 1.5-.6 2 2 0 0 1 1.6.7l3 3c.5.5.7 1 .7 1.6z"/></svg>
				<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" d="M24.1 22v8.5H1.5V7.9H10" /><path fill="currentColor" d="M30.5 7a2 2 0 0 1-.7 1.6L14.7 23.7H8.3v-6.4L23.5 2.1c.4-.4 1-.6 1.6-.6.6 0 1.1.2 1.6.7l3.1 3.2c.5.4.7 1 .7 1.6z"/></svg> -->
				<small>Edit</small>
			</button>
		{/if}
		<button>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M5.2 23A5 5 0 0 1 0 18V6C0 3.1 2.3.8 5.2.8h21.6C29.7.8 32 3.1 32 6v12a5 5 0 0 1-5.2 5H18l-8.4 7.8a2 2 0 0 1-3.2-1.6V23H5.2z" /></svg>
		</button>
        {#if post.countComments > 0}
			<small>{formatGreek(post.countComments)}</small>
		{/if}
		<StarButton hasStar={post.hasStar} onStar={() => onStar(post.id)} />
		{#if post.countStars > 0}
			<small>{formatGreek(post.countStars)}</small>
		{/if}
	</div>
</article>

<style>
	article {
		margin: 1rem 0;
		box-shadow: 0 0 4px #00000030;
		padding: 1rem;
	}
	img {
		border-radius: 50%;
		background-color: #eee;
		width: 2rem;
		height: 2rem;
	}
	div {
		display: flex;
		gap: 0.5rem;
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
	svg {
        display: block;
		width: 1rem;
		color: #ddd;
	}
	button {
		margin-left: 1rem;
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
	}
	.edit {
		display: flex;
		align-items: center;
		margin: 0;
		font-size: 1rem;
		gap: 0.5rem;
	}
</style>
