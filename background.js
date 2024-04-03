let selectedTime = 30; // Initialize selectedTime if no Default timer is set

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Message received from UI:', message);

  // Get the selected time from the message
  selectedTime = message.selectedTime;
  console.log('Selected time:', selectedTime);

  // Schedule the first reminder
  scheduleReminder(selectedTime);

  // Respond to the message
  sendResponse({ received: true });
});

// Handle the alarm
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'reminderAlarm') {
    console.log('Alarm triggered. Creating notification...');

    // Notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "img/CodeNap.png",
      title: "It's time for a break!",
      message: "Stand up, stretch, and drink some water.",
      silent: false, // Notification will not be silent
    });

    // Schedule the next reminder
    scheduleReminder(selectedTime);
  }
});

// Function to schedule the next reminder
function scheduleReminder(selectedTime) {
  console.log('Scheduling next reminder...');

  // Calculate the future time for the next reminder
  const futureTime = new Date(Date.now() + selectedTime * 60 * 1000);

  // Set an alarm for the next reminder
  chrome.alarms.create('reminderAlarm', { when: futureTime.getTime() });

  console.log('Next reminder scheduled for:', futureTime);
}
