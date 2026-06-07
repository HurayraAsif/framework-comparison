<script lang="ts">
	let title = 'Product Explorer - Home';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="hero">
	<h1>Product Explorer</h1>
	<p>
		Discover our curated collection of workspace and office products designed
		for productivity and comfort.
	</p>
	<a href="/products" class="cta-button">Browse Products</a>
</div>

<section class="features">
	<h2>Features</h2>
	<div class="features-grid">
		<div class="feature">
			<h3>Wide Selection</h3>
			<p>Explore 15 carefully selected products across multiple categories.</p>
		</div>
		<div class="feature">
			<h3>Search & Filter</h3>
			<p>Find products by name, category, or description.</p>
		</div>
		<div class="feature">
			<h3>Save Favorites</h3>
			<p>Mark your favorite products and keep them for later.</p>
		</div>
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 60px 20px;
		background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
		color: #fff;
		border-radius: 8px;
		margin-bottom: 40px;
	}

	.hero h1 {
		color: #fff;
		font-size: 3rem;
		margin: 0 0 20px 0;
	}

	.hero p {
		font-size: 1.2rem;
		margin-bottom: 30px;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.cta-button {
		display: inline-block;
		background: #fff;
		color: #0066cc;
		padding: 12px 30px;
		border-radius: 4px;
		font-weight: bold;
		font-size: 1.1rem;
		transition: background 0.2s ease;
	}

	.cta-button:hover {
		background: #f0f0f0;
		text-decoration: none;
	}

	.features {
		margin-top: 60px;
	}

	.features h2 {
		margin-top: 0;
		text-align: center;
		margin-bottom: 30px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
		margin-bottom: 40px;
	}

	.feature {
		background: #fff;
		padding: 20px;
		border-radius: 8px;
		border: 1px solid #eee;
	}

	.feature h3 {
		color: #0066cc;
		margin-top: 0;
	}

	.feature p {
		margin-bottom: 0;
	}
</style>
