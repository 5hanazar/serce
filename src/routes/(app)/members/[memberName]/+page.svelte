<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { base } from "$app/paths";
    export let data
	const resetCookieAndRefresh = async () => {
		document.cookie = `user=`;
		await invalidateAll();
	};
    const follow = async () => {
		const response = await fetch(`${base}/members`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ memberId: data.member.id }),
		});
		if (response.ok) {
			await invalidateAll();
		}
	};
</script>
<h2>
    {#if data.isMine}
        My Profile
    {:else}
        {data.member.fullName}
    {/if}
</h2>
<table>
    <tr>
        <th>Name:</th>
        <td>{data.member.nickname}</td>
    </tr>
    <tr>
        <th>Fullname:</th>
        <td>{data.member.fullName}</td>
    </tr>
    <tr>
        <th>Post Count:</th>
        <td>{data.postCount}</td>
    </tr>
    <tr>
        <th>Follower Count:</th>
        <td>{data.followerCount}</td>
    </tr>
    <tr>
        <th>Following Count:</th>
        <td>{data.followingCount}</td>
    </tr>
    <tr>
        <th>Last Online:</th>
        <td>{data.member.lastOnline}</td>
    </tr>
    <tr>
        <th>Created Date:</th>
        <td>{data.member.createdDate}</td>
    </tr>
</table>
{#if data.isMine}
    <button on:click={resetCookieAndRefresh}>Log out</button>
    {:else}
    <button on:click={() => follow()}>
        {#if data.isFollowed}
            Unfollow
        {:else}
            Follow
        {/if}
    </button>
{/if}
 <style>
    th {
        text-align: end;
    }
    table {
        margin-top: 1rem;
    }
 </style>
