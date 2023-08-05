<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { base } from "$app/paths";
	import Comment from "$lib/comment.svelte";
	import Description from "$lib/description.svelte";
	import { clearForm, formToObj, formatGreek } from "$lib/front";
	import LikeButton from "$lib/likeButton.svelte";
	export let data;

	const onLikeClick = async () => {
		const response = await fetch(`${base}/posts`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ postId: data.post.id }),
		});
		if (response.ok) {
			await invalidateAll();
		}
	};
    const onDeleteClick = async () => {
		const response = await fetch(`${base}/posts/${data.post.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			}
		});
		if (response.ok) {
			await goto(`${base}/posts`, { replaceState: true });
		}
	};
    const submit = async (e: SubmitEvent) => {
		e.preventDefault();
        const form = formToObj(e)
		const response = await fetch(`${base}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ postId: data.post.id, description: form.description }),
		});
		if (response.ok) {
            clearForm(e)
            await invalidateAll();
            window.scrollTo(0, document.body.scrollHeight);
        }
	};
</script>

<Description isMine={data.post.isMine} member={data.post.member} description={data.post.description} createdDateRelative={data.post.createdDateRelative} />
<div>
	{#if data.post.isMine}
		<button class="edit">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" d="M23.9 21.8V30h-22V8.2h8.3" /><path fill="currentColor" d="M30 7.3a2 2 0 0 1-.7 1.5L14.7 23.4H8.5v-6.1L23.2 2.6a2 2 0 0 1 1.5-.6 2 2 0 0 1 1.6.7l3 3c.5.5.7 1 .7 1.6z" /></svg>
			<small>Edit</small>
		</button>
        <button on:click={() => onDeleteClick()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M6.9 30.5c0 .8.7 1.5 1.6 1.5h15c.9 0 1.6-.7 1.6-1.5l1.1-22.7H5.8l1 22.7h.1zm12.5-17c0-.4.3-.7.7-.7h1c.4 0 .7.3.7.6v13c0 .3-.3.6-.7.6h-1a.7.7 0 0 1-.7-.6v-13 .1zm-4.6 0c0-.4.3-.7.7-.7h1c.4 0 .7.3.7.6v13c0 .3-.3.6-.7.6h-1a.7.7 0 0 1-.7-.6v-13 .1zm-4.6 0c0-.4.3-.7.7-.7h1c.4 0 .7.3.7.6v13c0 .3-.3.6-.7.6h-1a.7.7 0 0 1-.7-.6v-13 .1zM20 1.6V.3c0-.1-.2-.3-.4-.3h-7.2c-.2 0-.4.2-.4.3v1.3H5a1 1 0 0 0-1 1v3.2h24V2.7c0-.6-.5-1.1-1-1.1"/></svg>
            <small>Delete</small>
        </button>
	{/if}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M5.2 23A5 5 0 0 1 0 18V6C0 3.1 2.3.8 5.2.8h21.6C29.7.8 32 3.1 32 6v12a5 5 0 0 1-5.2 5H18l-8.4 7.8a2 2 0 0 1-3.2-1.6V23H5.2z" /></svg>
	{#if data.post.commentCount > 0}
		<small>{formatGreek(data.post.commentCount)}</small>
	{/if}
	<LikeButton isLiked={data.post.isLiked} onClick={() => onLikeClick()} />
	{#if data.post.likeCount > 0}
		<small>{formatGreek(data.post.likeCount)}</small>
	{/if}
</div>
<h3>Comments</h3>

<form on:submit={submit}>
    <input type="text" name="description" required>
    <button>Submit</button>
</form>
{#each data.comments as comment}
    <Comment comment={comment} />
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
	div > button {
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
        display: flex;
        font-size: 1rem;
		gap: 0.5rem;
	}
	div > button, div > svg {
		margin-left: 1rem;
	}
	.edit {
		margin: 0;
	}
    h3 {
        margin-top: 2rem;
    }
</style>
