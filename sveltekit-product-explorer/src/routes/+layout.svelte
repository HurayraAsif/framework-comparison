<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav style="background: #fff; border-bottom: 1px solid #eee;">
	<div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
		<a href="/" style="font-weight: bold; font-size: 1.2rem;">
			Product Explorer
		</a>
		<div style="display: inline-block; margin-left: 30px;">
			<a href="/" style="margin-right: 20px;">Home</a>
			<a href="/products">Products</a>
		</div>
	</div>
</nav>

<main>
	{@render children()}
</main>
