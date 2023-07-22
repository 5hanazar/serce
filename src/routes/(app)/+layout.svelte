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
        <a href="/"><h1>Serçe</h1></a>
		<a href="/profile">
            <h3>{data.user.name}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm-2.1 2.3a8.4 8.4 0 0 0-8.4 8.4c0 .8.6 1.4 1.4 1.4h18.2c.8 0 1.4-.6 1.4-1.4 0-4.6-3.7-8.4-8.4-8.4H9.9z"/></svg>
        </a>
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
	header > div > a:first-of-type {
		margin-right: auto;
	}
    header > div > a {
        display: flex;
        padding: 0 1rem;
        align-items: center;
        text-decoration: none;
        color: #000;
        gap: 1rem;
    }
    header > div > a:hover {
        background-color: #f6f6f6;
    }
    header > div > a > svg {
        width: 2rem;
        color: #ccc;
    }
    
	section {
		margin: 0 auto;
		background-color: #fff;
		padding: 6rem 1rem 1rem 1rem;
        box-sizing: border-box;
		max-width: 100vh;
	}
</style>
