// utils/toggleDeleteBtn.js
export function toggleDeleteBtn(inputElement, clearButton) {
        if (inputElement.value.length > 0) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }
    }