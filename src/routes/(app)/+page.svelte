<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Card from '$lib/card.svelte';
	import { clearForm, formToObj } from '$lib/front';
	export let data;
    const submit = async (e: SubmitEvent) => {
		e.preventDefault();
        const data = formToObj(e)
		const response = await fetch($page.url.pathname, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ description: data.description }),
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
    <Card memberId={data.user.id} post={post} />
{/each}

<form on:submit={submit}>
    <input type="text" name="description">
    <button>Submit</button>
</form>