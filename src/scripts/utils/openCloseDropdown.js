export const openCloseDropdown = () => {
    const dropdownButtons = document.querySelectorAll('.dropdown-header');
    let chevron;

    function toggleClass(element, className, condition) {
        if (condition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }
    

    function toggleDropdown(btn) {
        const dropdownHeader = btn.closest('.dropdown-header');
        const dropdownContent = dropdownHeader.nextElementSibling;
        const chevron = btn.querySelector('.fa-chevron-down');
    
        const isHidden = dropdownContent.classList.contains('hidden');
    
        toggleClass(chevron, 'rotate-180', isHidden);
        toggleClass(dropdownContent, 'hidden', !isHidden);
        toggleClass(dropdownHeader, 'bg-jaune', isHidden);
        toggleClass(dropdownHeader, 'hover:bg-jaune', !isHidden);
        toggleClass(dropdownContent, 'z-20', isHidden);
        toggleClass(dropdownHeader, 'z-20', isHidden);
    }

    function closeOtherDropdowns(clickedButton) {
        dropdownButtons.forEach(btn => {
            if (btn !== clickedButton) {
                const dropdownHeader = btn.closest('.dropdown-header');
                const dropdownContent = dropdownHeader.nextElementSibling;
                const chevron = btn.querySelector('.fa-chevron-down');
    
                toggleClass(chevron, 'rotate-180', false);
                toggleClass(dropdownContent, 'hidden', true);
                toggleClass(dropdownHeader, 'bg-jaune', false);
                toggleClass(dropdownHeader, 'hover:bg-jaune', true);
                toggleClass(dropdownContent, 'z-20', false);
                toggleClass(dropdownHeader, 'z-20', false);
            }
        });
    }

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
