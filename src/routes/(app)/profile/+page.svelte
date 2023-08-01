<script>
	import { invalidateAll } from "$app/navigation";
	import { formatTime } from "$lib/front";
    export let data
	const resetCookieAndRefresh = async () => {
		document.cookie = `user=`;
		await invalidateAll();
	};
</script>
<h2>Profile</h2>
<table>
    <tr>
        <th>Name:</th>
        <td>{data.user.name}</td>
    </tr>
    <tr>
        <th>Fullname:</th>
        <td>{data.user.fullName}</td>
    </tr>
    <tr>
        <th>Follower Count:</th>
        <td>{data.user.followerCount}</td>
    </tr>
    <tr>
        <th>Created Date:</th>
        <td>{formatTime(data.user.createdDate)}</td>
    </tr>
</table>
<button on:click={resetCookieAndRefresh}>Log out</button>
 <style>
    th {
        text-align: end;
    }
    table {
        margin: 1rem 0;
    }
 </style>
