<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { formToObj, formatTime } from '$lib/front';
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
		if (response.ok) invalidateAll();
	};
</script>

<h1>Home</h1>
{#each data.posts as post}
    <div>
        {post.member.fullName}
        <p>
            {post.description}
        </p>
        {formatTime(post.createdDate)}
    </div>
{/each}

<form on:submit={submit}>
    <input type="text" name="description">
    <button>Submit</button>
</form>

<style>
    div {
        box-shadow: 0 0 4px #00000030;
        padding: 1rem;
    }
</style>