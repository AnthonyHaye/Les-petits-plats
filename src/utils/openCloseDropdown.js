export const openCloseDropdown = () => {
        const dropdownButtons = document.querySelectorAll('.dropdown_btn');
        let chevron;
    
        function toggleDropdown(btn) {
            const dropdownContent = btn.nextElementSibling;
            chevron = btn.querySelector('.fa-chevron-down');
            chevron.classList.toggle('rotate-180'); // Utilisation de rotate-180 pour la rotation
            dropdownContent.classList.toggle('hidden'); // Utilisation de hidden pour afficher/masquer
        };
    
        function closeOtherDropdowns(clickedButton) {
            dropdownButtons.forEach(btn => {
                chevron = btn.querySelector('.fa-chevron-down');
                if (btn !== clickedButton) {
                    chevron.classList.remove('rotate-180');
                    btn.nextElementSibling.classList.add('hidden');
                }
            });
        };
    
        function focusableElements(btn) {
            const dropdownContent = btn.nextElementSibling;
            const focusableElements = dropdownContent.querySelectorAll('input, button, li');
    
            dropdownContent.classList.contains('hidden') ? 
            focusableElements.forEach(element => element.setAttribute('tabindex', '-1')) : 
            focusableElements.forEach(element => element.setAttribute('tabindex', '0'));
        };
    
        dropdownButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleDropdown(btn);
                closeOtherDropdowns(btn);
                focusableElements(btn);
            });
        });
    };
    