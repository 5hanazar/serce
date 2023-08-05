<script lang="ts">
	import { base } from "$app/paths";
	import type { Member } from "@prisma/client";
    export let isMine: boolean
    export let member: Member
    export let description: string
    export let createdDateRelative: string
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

<style>
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
    a, b {
        align-self: center;
		margin-right: auto;
    }
	a {
        color: #000;
        font-weight: bold;
	}
    p {
        margin: 0;
        margin-top: 1rem;
    }
</style>