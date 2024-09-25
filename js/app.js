document.getElementById('btn-donation').addEventListener('click', () => {
    document.getElementById('donation-section').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
  });
  
  document.getElementById('btn-history').addEventListener('click', () => {
    document.getElementById('history-section').classList.remove('hidden');
    document.getElementById('donation-section').classList.add('hidden');
  });
  
  document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
      const cardId = e.target.dataset.card;
      const donateAmount = parseFloat(document.getElementById(`donate-amount-${cardId}`).value);
      const balance = parseFloat(document.getElementById('account-balance').innerText);
  
      if (isNaN(donateAmount) || donateAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
      }
  
      if (donateAmount > balance) {
        alert('Donation amount exceeds your balance.');
        return;
      }
  
      // Update balance
      const newBalance = balance - donateAmount;
      document.getElementById('account-balance').innerText = newBalance.toFixed(2) + ' BDT';
  
      // Add donation to history
      const donationTitle = e.target.closest('.card-body').querySelector('.card-title').innerText;
      const historyList = document.getElementById('history-list');
      const historyItem = document.createElement('li');
      historyItem.innerText = `${new Date().toLocaleString()} - Donated ${donateAmount} BDT to ${donationTitle}`;
      historyList.appendChild(historyItem);
  
      // Show success modal
      document.getElementById('success-modal').classList.remove('hidden');
    });
  });
  
  // Modal close button
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('success-modal').classList.add('hidden');
  });
  