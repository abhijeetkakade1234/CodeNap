// Listen for change events on the radio buttons
document.querySelectorAll('input[name="timer"]').forEach(radio => {
    radio.addEventListener('change', () => {
        // Check if any radio button in the group is checked
        let anyChecked = [...document.querySelectorAll('input[name="timer"]')].some(radio => radio.checked);
        
        // Enable the start button if any radio button is checked
        document.getElementById('startButton').disabled = !anyChecked;
  
        // If a radio button is checked, send a message to the background script with the selected time
        if (anyChecked) {
            let selectedTime = document.querySelector('input[name="timer"]:checked').value;
            chrome.runtime.sendMessage({selectedTime: selectedTime});
        }
    });
});
