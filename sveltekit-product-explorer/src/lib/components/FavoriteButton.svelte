<script lang="ts">
	interface Props {
		productId: number;
	}

	let { productId }: Props = $props();

	let isFavorite = $state(false);

	function loadFavorite() {
		if (typeof window !== 'undefined') {
			const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
			isFavorite = favorites.includes(productId);
		}
	}

	function toggleFavorite() {
		let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

		if (favorites.includes(productId)) {
			favorites = favorites.filter((id: number) => id !== productId);
			isFavorite = false;
		} else {
			favorites.push(productId);
			isFavorite = true;
		}

		localStorage.setItem('favorites', JSON.stringify(favorites));
	}

	loadFavorite();
</script>

<button
	class="favorite-button"
	class:active={isFavorite}
	onclick={toggleFavorite}
	aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
>
	{isFavorite ? '♥' : '♡'}
</button>

<style>
	.favorite-button {
		background: #fff;
		border: 2px solid #ff1744;
		color: #ff1744;
		padding: 8px 12px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: all 0.2s ease;
	}

	.favorite-button:hover {
		background: #ffebee;
	}

	.favorite-button.active {
		background: #ff1744;
		color: #fff;
	}

	.favorite-button.active:hover {
		background: #d01040;
	}
</style>
