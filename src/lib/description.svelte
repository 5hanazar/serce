<script lang="ts">
	import type { Member } from "@prisma/client";
	import { formatTime } from "$lib/front";
    export let member: Member
    export let description: string
    export let createdDate: number
</script>

<div>
    <img src="" alt="" />
    <a href={`/members/${member.name}`}>{member.fullName}</a>
    <small>{formatTime(createdDate)}</small>
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
	a {
		align-self: center;
		margin-right: auto;
        color: #000;
        font-weight: bold;
	}
    p {
        margin: 0;
        margin-top: 1rem;
    }
</style>