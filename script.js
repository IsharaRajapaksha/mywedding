// Set target wedding date (October 18, 2026, 09:15 AM)
const weddingDate = new Date(2026, 9, 18, 9, 15, 0).getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<p style='font-weight:600; color:var(--accent-gold);'>The Wedding Day is Here!</p>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

// RSVP form submission handling
//document.getElementById("rsvpForm").addEventListener("submit", function(event) {
    //event.preventDefault();
    //alert("Thank you for your RSVP!");
   // this.reset();
///});

// Paste your Google Apps Script Web App URL below
const scriptURL = 'https://script.google.com/macros/s/AKfycbxivFvfQEuHX8D9owxMNzu2oGSoyzs2eob3on2IJudZKSM53DSqIp8hUjMqCvWXUSLxPw/exec';

document.getElementById("rsvpForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const submitBtn = this.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerText;
    
    // Show sending status on button
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    // Collect form inputs
    const formData = {
        fullName: document.getElementById("fullName").value,
        attendance: document.getElementById("attendance").value,
        specialNeeds: document.getElementById("specialNeeds").value
    };

    // Send payload to Google Sheets via fetch API
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Bypasses browser CORS restrictions for Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert("Thank you! Your RSVP has been submitted successfully.");
        this.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Something went wrong. Please try submitting again.");
    })
    .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    });
});