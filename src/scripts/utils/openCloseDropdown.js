export const openCloseDropdown = () => {
    const dropdownButtons = document.querySelectorAll('.dropdown-header');
    let chevron;

    // Function to open/close the dropdown
    function toggleDropdown(btn) {
        const dropdownHeader = btn.closest('.dropdown-header');
        const dropdownContent = dropdownHeader.nextElementSibling;
        chevron = btn.querySelector('.fa-chevron-down');
        chevron.classList.toggle('rotate-180');
        dropdownContent.classList.toggle('hidden');
        dropdownHeader.classList.toggle('bg-jaune');
        dropdownHeader.classList.toggle('hover:bg-jaune');
        dropdownContent.classList.toggle('z-20');
        dropdownHeader.classList.toggle('z-20');
    };

    // Function to close the other dropdowns when one of them is clicked
    function closeOtherDropdowns(clickedButton) {
        dropdownButtons.forEach(btn => {
            const dropdownHeader = btn.closest('.dropdown-header');
            const dropdownContent = dropdownHeader.nextElementSibling;
            chevron = btn.querySelector('.fa-chevron-down');

            if (btn !== clickedButton) {
                // Reset the design of non-clicked dropdowns
                chevron.classList.remove('rotate-180');
                dropdownContent.classList.add('hidden');
                dropdownHeader.classList.remove('bg-jaune');
                dropdownHeader.classList.add('hover:bg-jaune');
                dropdownContent.classList.remove('z-20');
                dropdownHeader.classList.remove('z-20');
            }
        });
    };

    // Function to manage the focusable elements in the dropdown
    function focusableElements(btn) {
        const dropdownContent = btn.closest('.dropdown-header').nextElementSibling;        
        const focusableElements = dropdownContent.querySelectorAll('input, button, li');
        dropdownContent.classList.contains('hidden') ? 
        focusableElements.forEach(element => element.setAttribute('tabindex', '-1')) : 
        focusableElements.forEach(element => element.setAttribute('tabindex', '0'));
    };

    dropdownButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeOtherDropdowns(btn);  
            toggleDropdown(btn);       
            focusableElements(btn);    
        });
    });
};
