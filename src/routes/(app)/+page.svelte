<script>
	import { formatTime } from '$lib/shared';

	export let data;
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

<style>
    div {
        box-shadow: 0 0 4px #00000030;
        padding: 1rem;
    }
</style>