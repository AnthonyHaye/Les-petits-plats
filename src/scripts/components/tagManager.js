// tagManager.js
import { selectedTags, updateRecetteCourante, ToutesRecettes , RecetteFiltrees, AfficheListeDeroulanteFiltre, resetRecetteFiltrees } from '../page/main.js';
import { combinedFilter } from '../utils/combinedFilter.js';


// Function to update the dropdown menu based on selected tags
     const updateDropdownVisibilityForTags = (type) => {
    // Get all dropdown items for the specified type
    const dropdownItems = document.querySelectorAll(`.dropdown-item-${type}`);    
    dropdownItems.forEach(item => {
        const itemName = item.textContent.trim();        
        // If the item is selected, hide it from the dropdown
        if (selectedTags[type].includes(itemName)) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
};

// Function to add a tag
export const addTag = (tag, type) => {    
    if (!selectedTags[type].includes(tag)) {
        selectedTags[type].push(tag);
        renderTags();
        filterRecettes();
        updateDropdownVisibilityForTags(type);
    } 
};

// Function to delete a tag
export const removeTag = (tag, type) => {    
    const index = selectedTags[type].indexOf(tag);
    if (index > -1) {
        // Remove the tag from the table using Splice
        selectedTags[type].splice(index, 1);
        renderTags();
        filterRecettes();
        updateDropdownVisibilityForTags(type);
        if (Object.values(selectedTags).every(tags => tags.length === 0)) {
            // Reset the main research field
            const searchInput = document.getElementById('chercheRecette');
            if (searchInput) {
                searchInput.value = '';
                const clearSearchButton = document.getElementById('clearSearchInput');
                clearSearchButton.classList.add('hidden');
            }
        }        
    }     
};

// Deletion function of all tags if the deleted button on the search bar is clicked
export const resetTags = () => {
    for (const type in selectedTags) {
        selectedTags[type] = [];
    }
    renderTags();
    filterRecettes();
};


// Function to display tags
const renderTags = () => {
    const tagSection = document.querySelector('.tag_section');
    tagSection.innerHTML = '';
    for (const type in selectedTags) {
        selectedTags[type].forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag w-48 h-12 flex items-center justify-between p-2 m-1 bg-jaune rounded-lg';
            tagElement.innerHTML = `
                <span class="tag-text" aria-label="Tag ${tag}">${tag}</span>
                <button class="ml-2 text-black hover:text-white" aria-label="Remove tag ${tag}">
                    <span class="fas fa-times" aria-hidden="true"></span>
                </button>
            `;
            tagElement.addEventListener('click', () => removeTag(tag, type));
            tagSection.appendChild(tagElement);
        });
    }
};

// Function to filter the recipes according to the selected tags
const filterRecettes = () => {
    if (Object.values(selectedTags).every(tags => tags.length === 0)) {
        resetRecetteFiltrees();
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes); 
        return; 
    }
    const filteredRecettes = combinedFilter(selectedTags, RecetteFiltrees);

    // Revenue update displayed with filtered recipes
    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes); 
};
