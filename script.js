// Modal Logic
const modal = document.getElementById('leadModal');
const phoneInput = document.getElementById('phone');
const leadForm = document.getElementById('leadForm');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Phone Mask
phoneInput.addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Form Submission (Simulated Webhook / WhatsApp redirect for now)
leadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    
    // UI Feedback
    btnText.textContent = 'Enviando...';
    spinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    const formData = new FormData(leadForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate API Call / Webhook
    setTimeout(() => {
        // Success State
        btnText.textContent = 'Sucesso! Redirecionando...';
        spinner.style.display = 'none';
        
        // Redirect to WhatsApp logic
        const waText = `Olá! Meu nome é ${data.name}, faturamos ${data.revenue} e gostaria de uma avaliação para escalar minha loja de Moda Festa.`;
        const waNumber = "5511999999999"; // Substituir pelo número real
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
        
        setTimeout(() => {
            window.open(waLink, '_blank'); // Open in new tab
            closeModal();
            // Reset form
            leadForm.reset();
            submitBtn.disabled = false;
            btnText.textContent = 'Agendar Agora';
        }, 1500);
        
    }, 1500);
});
