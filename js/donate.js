
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
    const donateInput = document.getElementById(`donate-amount-${cardId}`);
    const donateAmount = parseFloat(donateInput.value); 
    const balanceElement = document.getElementById('account-balance'); 
    const balance = parseFloat(balanceElement.innerText); 

  
    if (isNaN(donateAmount) || donateAmount <= 0) {
      alert('Please enter a valid donation amount.'); 
      return;
    }

    if (donateAmount > balance) {
      alert('Donation amount exceeds your balance.');
      return;
    }

    const newBalance = balance - donateAmount;
    balanceElement.innerText = newBalance.toFixed(2) + ' BDT'; 

    const cardDonationAmountElement = document.getElementById(`current-donation-${cardId}`);
    const currentDonationAmount = parseFloat(cardDonationAmountElement.innerText);
    const updatedDonationAmount = currentDonationAmount + donateAmount;
    cardDonationAmountElement.innerText = updatedDonationAmount.toFixed(2) + ' BDT'; 


    const donationTitle = e.target.closest('.card-body').querySelector('.card-title').innerText; 
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('li');


    const options = { timeZone: 'Asia/Dhaka', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const currentBDTime = new Date().toLocaleString('en-US', options); 
    
    historyItem.innerHTML = `<span style="font-weight: bold;">Donated ${donateAmount.toFixed(2)} BDT to ${donationTitle}</span><br>
    <span style="font-weight: lighter;">${currentBDTime}</span>`;
    historyList.appendChild(historyItem);

    document.getElementById('success-modal').checked = true;

    donateInput.value = '';

    document.getElementById('success-modal').classList.remove('hidden');
  });
});

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('success-modal').classList.add('hidden');
});
