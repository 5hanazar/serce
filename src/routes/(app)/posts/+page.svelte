<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Post from '$lib/post.svelte';
	import { clearForm, formToObj } from '$lib/front';
	import { base } from '$app/paths';
	export let data;
    
    const submit = async (e: SubmitEvent) => {
		e.preventDefault();
        const form = formToObj(e)
        const formData = new FormData();
		formData.append("data", JSON.stringify({ description: form.description }));
		const response = await fetch(`${base}/posts`, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: formData,
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
    <Post post={post} />
{/each}

<form on:submit={submit}>
    <input type="text" name="description" required>
    <button>Submit</button>
</form>