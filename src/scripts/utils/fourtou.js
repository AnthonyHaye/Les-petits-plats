<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="src/css/style.css" rel="stylesheet">
  <!-- Ajouter les polices Google -->
  <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <title>Les petits plats</title>
</head>
<body class="font-manrope bg-gris-light">
  <header class="relative bg-cover bg-center bg-banner h-96" style="background-image: url('src/img/utils/banner.webp');" aria-label="Bannière du site">
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-white">
      <div class="absolute top-4 left-4">
        <img src="src/img/utils/logo.svg" alt="Logo Les Petits Plats" class="w-48 h-auto">
      </div>
      <div class="text-center w-full">
        <h1 class="text-jaune text-2xl font-anton md:text-4xl">
          <span class="block mt-5">CHERCHEZ PARMI PLUS DE 1500 RECETTES</span>
          <span class="block -mt-0.5">DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</span>
        </h1>
        <div class="mt-8 w-full relative">
          <div class="m-2 flex flex-row justify-between items-center bg-white rounded-xl shadow-lg overflow-hidden relative border-solid hover:border-2 hover:border-jaune">
            <input type="text" id="chercheRecette" placeholder="Rechercher une recette, un ingrédient, ..." class="text-base m-1 p-1 w-5/6 text-black outline-none" aria-label="Champ de recherche de recette">
            <button id="clearSearchInput" class="p-2 text-black hover:text-jaune hidden" aria-label="Effacer la recherche">
              <span class="fas fa-times md:text-2xl"></span>
            </button>
            <label for="chercheRecette" class="sr-only" tabindex="0" aria-label="Recherche recette"></label>
            <button class="p-3 bg-gray-800 text-white flex items-center justify-center hover:bg-jaune hover:text-noir rounded-r-lg" aria-label="Bouton de recherche">
              <i class="fas fa-search md:text-2xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main class="flex flex-col w-full min-h-full relative" aria-label="Contenu principal">
    <div class="filter_section flex flex-col items-center w-full relative z-20 md:flex-row-reverse" aria-label="Section de filtrage">
      <p class="nbr_recette font-bold text-xl font-manrope m-2" aria-live="polite"></p>
      <div class="contenairFiltre flex flex-col justify-between" aria-label="Filtres"></div>
    </div>
    <div class="tag_section w-full flex flex-col-reverse items-center min-h-32 bg-blue-300" aria-label="Section des tags"></div>
    <div class="card_section flex flex-col items-center relative z-10" aria-label="Section des cartes de recettes"></div>
  </main>
  <script type="module" src="src/scripts/page/main.js"></script>
</body>
</html>
