import axios from 'axios'; // Use ES6 import

// Function to handle form submission
async function handleDeleteForm(event) {
    event.preventDefault();
    const foodId = document.getElementById('foodId').value;
    try {
        const response = await axios.delete('/foods/delete', {
            data: { foodId }
        });
        if (response.status === 200) {
            alert('Food item deleted successfully.');
        } else {
            alert('Error deleting food item: ' + response.data);
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// Adding event listener to the form
document.getElementById('deleteFoodForm').addEventListener('submit', handleDeleteFoodForm);
