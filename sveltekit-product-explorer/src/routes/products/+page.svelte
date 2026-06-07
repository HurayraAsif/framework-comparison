<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import products from '$lib/data/products.json';

	let title = 'Products - Product Explorer';

	let searchValue = $state('');
	let activeCategory = $state('all');

	const categories = [...new Set(products.map((p) => p.category))].sort();

	let filteredProducts = $derived.by(() => {
		return products.filter((product) => {
			const matchesSearch =
				searchValue === '' ||
				`${product.name} ${product.category} ${product.description}`
					.toLowerCase()
					.includes(searchValue.toLowerCase());

			const matchesCategory =
				activeCategory === 'all' || product.category === activeCategory;

			return matchesSearch && matchesCategory;
		});
	});

	let visibleCount = $derived(filteredProducts.length);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div>
	<h1>Products</h1>

	<div class="filters-container">
		<div class="search-box">
			<input
				type="text"
				bind:value={searchValue}
				placeholder="Search products..."
				aria-label="Search products"
			/>
		</div>

		<div class="category-filters" aria-label="Product categories">
			<button
				type="button"
				class="category-btn"
				class:active={activeCategory === 'all'}
				onclick={() => (activeCategory = 'all')}
			>
				All Categories
			</button>

			{#each categories as category}
				<button
					type="button"
					class="category-btn"
					class:active={activeCategory === category}
					onclick={() => (activeCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<div class="results-info">
		Showing {visibleCount} of {products.length} products
	</div>

	{#if visibleCount === 0}
		<div class="no-results">
			<p>No products found matching your criteria.</p>
		</div>
	{:else}
		<div class="products-grid">
			{#each filteredProducts as product (product.id)}
				<ProductCard {...product} />
			{/each}
		</div>
	{/if}
</div>

<style>
	h1 {
		margin-bottom: 30px;
	}

	.filters-container {
		background: #fff;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 20px;
		border: 1px solid #eee;
	}

	.search-box {
		margin-bottom: 15px;
	}

	.search-box input {
		width: 100%;
		max-width: 400px;
		padding: 10px 15px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.search-box input:focus {
		outline: none;
		border-color: #0066cc;
		box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
	}

	.category-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.category-btn {
		background: #fff;
		border: 1px solid #ddd;
		color: #333;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.95rem;
		transition: all 0.2s ease;
	}

	.category-btn:hover {
		border-color: #0066cc;
		color: #0066cc;
	}

	.category-btn.active {
		background: #0066cc;
		color: #fff;
		border-color: #0066cc;
	}

	.results-info {
		padding: 15px 0;
		color: #666;
		font-size: 0.95rem;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 20px;
		margin-bottom: 40px;
	}

	.no-results {
		text-align: center;
		padding: 40px 20px;
		color: #666;
	}
</style>
