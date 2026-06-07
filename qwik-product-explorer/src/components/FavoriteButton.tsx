import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface FavoriteButtonProps {
  productId: number;
}

const STORAGE_KEY = "favoriteProducts";

export default component$<FavoriteButtonProps>(({ productId }) => {
  const isFavorite = useSignal(false);

  useVisibleTask$(() => {
    try {
      const storedFavorites = window.localStorage.getItem(STORAGE_KEY);

      if (!storedFavorites) {
        isFavorite.value = false;
        return;
      }

      const favorites = JSON.parse(storedFavorites);

      if (Array.isArray(favorites)) {
        isFavorite.value = favorites.includes(productId);
      }
    } catch {
      isFavorite.value = false;
    }
  });

  const toggleFavorite = $(() => {
    try {
      const storedFavorites = window.localStorage.getItem(STORAGE_KEY);
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      const favorites: number[] = Array.isArray(parsedFavorites)
        ? parsedFavorites.filter((id) => typeof id === "number")
        : [];

      const nextFavorites = favorites.includes(productId)
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
      isFavorite.value = nextFavorites.includes(productId);
    } catch {
      isFavorite.value = !isFavorite.value;
    }
  });

  return (
    <button
      type="button"
      class={isFavorite.value ? "favorite-button active" : "favorite-button"}
      onClick$={toggleFavorite}
      aria-pressed={isFavorite.value}
      aria-label={
        isFavorite.value ? "Remove from favorites" : "Add to favorites"
      }
      title={isFavorite.value ? "Remove from favorites" : "Add to favorites"}
    >
      ♥
    </button>
  );
});
