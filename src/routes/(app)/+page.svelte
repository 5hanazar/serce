<script>
	export let data;
</script>

<div>
	All members:
	<ul>
		{#each data.allMembers as member}
			<li>
				{member.name} - {member.fullName}
			</li>
		{/each}
	</ul>
</div>
