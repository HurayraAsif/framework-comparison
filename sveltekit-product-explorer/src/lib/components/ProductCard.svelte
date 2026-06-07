<script lang="ts">
	interface Props {
		id: number;
		name: string;
		image: string;
		category: string;
		price: number;
		rating: number;
	}

	let { id, name, image, category, price, rating }: Props = $props();
</script>

<div class="product-card">
	<div class="product-image">
		<img src={image} alt={name} />
	</div>
	<div class="product-info">
		<h3>{name}</h3>
		<p class="category">{category}</p>
		<p class="description-preview">{name}</p>
		<div class="product-meta">
			<span class="rating">★ {rating}</span>
			<span class="price">${price.toFixed(2)}</span>
		</div>
		<a href={`/products/${id}`} class="view-details">View Details</a>
	</div>
</div>

<style>
	.product-card {
		background: #fff;
		border: 1px solid #eee;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
		transition: box-shadow 0.2s ease;
	}

	.product-card:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.product-image {
		width: 100%;
		height: 200px;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.product-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 10px;
	}

	.product-info {
		padding: 15px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	h3 {
		font-size: 1.1rem;
		margin: 0 0 5px 0;
		color: #222;
	}

	.category {
		font-size: 0.85rem;
		color: #666;
		margin: 0 0 8px 0;
	}

	.description-preview {
		font-size: 0.9rem;
		color: #555;
		margin: 0 0 auto 0;
	}

	.product-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 12px 0;
		font-size: 0.95rem;
	}

	.rating {
		color: #ff9800;
		font-weight: bold;
	}

	.price {
		font-weight: bold;
		color: #0066cc;
	}

	.view-details {
		display: inline-block;
		background: #0066cc;
		color: #fff;
		padding: 8px 16px;
		border-radius: 4px;
		text-align: center;
		margin-top: 12px;
		transition: background 0.2s ease;
	}

	.view-details:hover {
		background: #0052a3;
		text-decoration: none;
	}
</style>
