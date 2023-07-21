<script>
	import { invalidateAll } from "$app/navigation";
	export let data;
	const resetCookieAndRefresh = () => {
		document.cookie = `user=`;
		invalidateAll();
	};
</script>

<header>
	<div>
		<img src="/favicon.png" alt="" />
		<h3>{data.user.name}</h3>
		<button on:click={(e) => resetCookieAndRefresh()}>Log out</button>
	</div>
</header>

<section>
	<slot />
</section>

<style>
	header {
		position: fixed;
		box-shadow: 0 0 4px #00000040;
		background-color: #fff;
		width: 100%;
	}
	header > div {
		display: flex;
		margin: 0 auto;
		max-width: 100vh;
		height: 5rem;
		gap: 1rem;
	}
	header > div > img {
		margin-right: auto;
	}
	header > div > h3 {
		align-self: center;
	}
	section {
		margin: 0 auto;
		background-color: #fff;
		padding: 6rem 1rem 1rem 1rem;
        box-sizing: border-box;
		max-width: 100vh;
	}
</style>
