<script lang="ts">
	import { base } from "$app/paths";
	import type { Member } from "@prisma/client";
	export let isMine: boolean;
	export let member: Member;
	export let description: string;
	export let files: string;
	export let createdDateRelative: string;
</script>

<div>
	<img src="" alt="" />
	{#if isMine}
		<b>{member.fullName}</b>
	{:else}
		<a href={`${base}/members/${member.name}`}>{member.fullName}</a>
	{/if}
	<small>{createdDateRelative}</small>
</div>
<p>
	{description}
</p>

{#if files}
<article>
    {#each files.split(";") as src}
	    {#if src.endsWith(".mp4")}
		<video controls>
			<source src={`/files/${src}`} type="video/mp4" />
			<track kind="captions" />
		</video>
        {:else}
        <img src={`/files/${src}`} alt="" />
	    {/if}
    {/each}
</article>
{/if}

<style>
	div > img {
		border-radius: 50%;
		background-color: #eee;
		width: 2rem;
		height: 2rem;
	}
	div {
		display: flex;
		gap: 0.5rem;
	}
	a,
	b {
		align-self: center;
		margin-right: auto;
	}
	a {
		color: #000;
		font-weight: bold;
	}
    article > * {
        height: 30vh;
    }
</style>
