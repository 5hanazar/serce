<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import Comment from "$lib/comment.svelte";
	import Description from "$lib/description.svelte";
	import { formatGreek, formatTime } from "$lib/front";
	import LikeButton from "$lib/likeButton.svelte";
	export let data;

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

<Description member={data.post.member} description={data.post.description} createdDate={data.post.createdDate} />
<div>
	{#if data.post.memberId == data.user.id}
		<button class="edit">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" d="M23.9 21.8V30h-22V8.2h8.3" /><path fill="currentColor" d="M30 7.3a2 2 0 0 1-.7 1.5L14.7 23.4H8.5v-6.1L23.2 2.6a2 2 0 0 1 1.5-.6 2 2 0 0 1 1.6.7l3 3c.5.5.7 1 .7 1.6z" /></svg>
			<small>Edit</small>
		</button>
	{/if}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M5.2 23A5 5 0 0 1 0 18V6C0 3.1 2.3.8 5.2.8h21.6C29.7.8 32 3.1 32 6v12a5 5 0 0 1-5.2 5H18l-8.4 7.8a2 2 0 0 1-3.2-1.6V23H5.2z" /></svg>
	{#if data.post.comments.length > 0}
		<small>{formatGreek(data.post.comments.length)}</small>
	{/if}
	<LikeButton isLiked={data.post.isLiked} onClick={() => onLikeClick(data.post.id)} />
	{#if data.post.likeCount > 0}
		<small>{formatGreek(data.post.likeCount)}</small>
	{/if}
</div>
<h3>Comments</h3>
{#each data.post.comments as comment}
    <Comment userId={data.user.id} comment={comment} />
{/each}

<style>
	div {
		display: flex;
		gap: 0.5rem;
        justify-content: end;
        margin-top: 1rem;
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
	button, svg {
		margin-left: 1rem;
	}
	.edit {
		display: flex;
		margin: 0;
		font-size: 1rem;
		gap: 0.5rem;
	}
    h3 {
        margin-top: 2rem;
    }
</style>
