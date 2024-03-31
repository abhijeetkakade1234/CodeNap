// Listen for change events on the radio buttons
document.querySelectorAll('input[name="timer"]').forEach(radio => {
    radio.addEventListener('change', () => {
        // Check if any radio button in the group is checked
        let anyChecked = [...document.querySelectorAll('input[name="timer"]')].some(radio => radio.checked);
        
        // Enable the start button if any radio button is checked
        document.getElementById('startButton').disabled = !anyChecked;
    });
});

// Listen for click events on the start button
document.getElementById('startButton').addEventListener('click', () => {
    // Check if any radio button is checked
    let anyChecked = [...document.querySelectorAll('input[name="timer"]')].some(radio => radio.checked);
    
    // If no radio button is checked, alert the user
    if (!anyChecked) {
        alert('Please select a time');
        return;
    }
    
    // If a radio button is checked, send a message to the background script with the selected time
    let selectedTime = document.querySelector('input[name="timer"]:checked').value;
    chrome.runtime.sendMessage({selectedTime: selectedTime});
});
