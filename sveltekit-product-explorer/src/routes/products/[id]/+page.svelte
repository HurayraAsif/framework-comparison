<script lang="ts">
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import products from '$lib/data/products.json';
	import { page } from '$app/stores';

	const id = parseInt($page.params.id);
	const product = products.find((p) => p.id === id);

	let title = product ? `${product.name} - Product Explorer` : 'Product Not Found';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if product}
	<div class="product-detail">
		<div class="breadcrumb">
			<a href="/">Home</a>
			<span>/</span>
			<a href="/products">Products</a>
			<span>/</span>
			<span>{product.name}</span>
		</div>

		<div class="detail-container">
			<div class="product-image-section">
				<img src={product.image} alt={product.name} />
			</div>

			<div class="product-details-section">
				<div class="detail-header">
					<div>
						<h1>{product.name}</h1>
						<p class="category">{product.category}</p>
					</div>

					<FavoriteButton productId={product.id} />
				</div>

				<div class="rating-price">
					<span class="rating">★ {product.rating} / 5</span>
					<span class="price">${product.price.toFixed(2)}</span>
				</div>

				<div class="description">
					<h2>About This Product</h2>
					<p>{product.description}</p>
				</div>

				<div class="actions">
					<a href="/products" class="btn-secondary">Back to Products</a>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div style="text-align: center; padding: 40px;">
		<h1>Product Not Found</h1>
		<p>
			<a href="/products">Back to Products</a>
		</p>
	</div>
{/if}

<style>
	.product-detail {
		max-width: 1200px;
		margin: 0 auto;
	}

	.breadcrumb {
		margin-bottom: 30px;
		font-size: 0.95rem;
		color: #666;
	}

	.breadcrumb a {
		color: #0066cc;
	}

	.breadcrumb span {
		margin: 0 8px;
	}

	.detail-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		margin-bottom: 60px;
		background: #fff;
		padding: 30px;
		border-radius: 8px;
		border: 1px solid #eee;
	}

	.product-image-section {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f5f5f5;
		border-radius: 8px;
		padding: 20px;
	}

	.product-image-section img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	.product-details-section {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.detail-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.detail-header h1 {
		margin-top: 0;
	}

	.category {
		color: #666;
		font-size: 1rem;
		margin: 5px 0 0 0;
	}

	.rating-price {
		display: flex;
		gap: 40px;
		align-items: center;
		font-size: 1.1rem;
	}

	.rating {
		color: #ff9800;
		font-weight: bold;
	}

	.price {
		color: #0066cc;
		font-weight: bold;
		font-size: 1.3rem;
	}

	.description h2 {
		margin-top: 0;
		color: #222;
	}

	.actions {
		margin-top: 20px;
	}

	.btn-secondary {
		display: inline-block;
		background: #f0f0f0;
		color: #0066cc;
		padding: 12px 30px;
		border-radius: 4px;
		font-weight: bold;
		transition: background 0.2s ease;
		border: 1px solid #ddd;
	}

	.btn-secondary:hover {
		background: #e0e0e0;
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.detail-container {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.detail-header {
			flex-direction: column;
			gap: 15px;
		}

		.rating-price {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}
	}
</style>
