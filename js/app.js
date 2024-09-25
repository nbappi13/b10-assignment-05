// Toggle between Donation and History sections
document.getElementById('btn-donation').addEventListener('click', () => {
  document.getElementById('donation-section').classList.remove('hidden');
  document.getElementById('history-section').classList.add('hidden');
});

document.getElementById('btn-history').addEventListener('click', () => {
  document.getElementById('history-section').classList.remove('hidden');
  document.getElementById('donation-section').classList.add('hidden');
});

// Handle donations
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', (e) => {
    const cardId = e.target.dataset.card;  // Get the card ID
    const donateInput = document.getElementById(`donate-amount-${cardId}`);
    const donateAmount = parseFloat(donateInput.value);  // Donation amount from input
    const balanceElement = document.getElementById('account-balance');  // Main balance in navbar
    const balance = parseFloat(balanceElement.innerText);  // Convert balance to a number

    // Validation: Check for invalid amounts (NaN, negative, zero, exceeding balance)
    if (isNaN(donateAmount) || donateAmount <= 0) {
      alert('Please enter a valid donation amount.');  // Invalid donation (non-number or negative)
      return;
    }

    if (donateAmount > balance) {
      alert('Donation amount exceeds your balance.');  // Donation amount greater than balance
      return;
    }

    // Update the main balance in the navbar
    const newBalance = balance - donateAmount;
    balanceElement.innerText = newBalance.toFixed(2) + ' BDT';  // Update displayed balance

    // Update the donation amount for the specific card
    const cardDonationAmountElement = document.getElementById(`current-donation-${cardId}`);
    const currentDonationAmount = parseFloat(cardDonationAmountElement.innerText);
    const updatedDonationAmount = currentDonationAmount + donateAmount;
    cardDonationAmountElement.innerText = updatedDonationAmount.toFixed(2) + ' BDT';  // Update card donation

    // Add donation entry to history
    const donationTitle = e.target.closest('.card-body').querySelector('.card-title').innerText;  // Get card title
    const historyList = document.getElementById('history-list');  // Get history list element
    const historyItem = document.createElement('li');
    historyItem.innerText = `${new Date().toLocaleString()} - Donated ${donateAmount} BDT to ${donationTitle}`;  // Create history item
    historyList.appendChild(historyItem);  // Append to history list

    // Show success modal
    document.getElementById('success-modal').classList.remove('hidden');
  });
});

// Modal close button functionality
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('success-modal').classList.add('hidden');
});
