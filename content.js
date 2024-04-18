let alertShown = false; // Flag to track whether the alert has been shown

document.addEventListener('DOMContentLoaded', function() {
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
        
        // If no radio button is checked and alert hasn't been shown yet, show the alert and set the flag
        if (!anyChecked && !alertShown) {
            alertShown = true;
            alert('Please select a time');
            return;
        }
        
        // If no radio button is checked and alert has been shown already, return without doing anything
        if (!anyChecked && alertShown) {
            return;
        }
        
        // Reset the flag if a radio button is checked
        alertShown = false;
        
        // If a radio button is checked, send a message to the background script with the selected time
        let selectedTime = document.querySelector('input[name="timer"]:checked').value;
        chrome.runtime.sendMessage({selectedTime: selectedTime});

        // Alert the user that the timer has been set for the selected time
        alert(`Timer has been set for ${selectedTime} minutes`);
    });
});
