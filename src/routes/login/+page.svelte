<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { clearForm, formToObj } from "$lib/front";
    let status = " ";
	const submit = async (e: SubmitEvent) => {
		e.preventDefault();
        const data = formToObj(e)        
		const response = await fetch(`${base}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ nickname: data.nickname, password: data.password }),
		});
		if (response.ok) await goto(`${base}/posts`, { replaceState: true });
		else if (response.status == 401) {
			status = "Invalid credentials";
            clearForm(e)
		}
	};
</script>

<section>
	<form on:submit={submit}>
		<label for="nickname">Name</label>
		<input name="nickname" type="text" />
		<label for="password">Password</label>
		<input name="password" type="password" />
		<br />
		<button>Login</button>
	</form>
	<div>{status}</div>
</section>

<style>
	section {
		display: flex;
		position: absolute;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		gap: 2rem;
	}
	form {
		display: grid;
		grid-template-columns: auto auto;
		background-color: #fff;
		padding: 1rem;
		gap: 1rem;
	}
	label {
		text-align: end;
	}
	div {
		white-space: pre;
	}
</style>
