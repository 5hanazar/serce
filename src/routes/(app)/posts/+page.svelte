<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Post from '$lib/post.svelte';
	import { clearForm, formToObj } from '$lib/front';
	export let data;
    const submit = async (e: SubmitEvent) => {
		e.preventDefault();
        const form = formToObj(e)
		const response = await fetch('/posts', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ description: form.description }),
		});
		if (response.ok) {
            clearForm(e)
            await invalidateAll();
            window.scrollTo(0, document.body.scrollHeight);
        }
	};
</script>

<h1>Home</h1>
{#each data.posts as post}
    <Post userId={data.user.id} post={post} />
{/each}

<form on:submit={submit}>
    <input type="text" name="description" required>
    <button>Submit</button>
</form>