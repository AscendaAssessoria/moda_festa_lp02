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

// Form Submission to Webhook
leadForm.addEventListener('submit', async function(e) {
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
    
    const webhookUrl = 'https://api.datacrazy.io/v1/crm/api/crm/flows/webhooks/5e740a07-2e3b-4af4-81a4-37dd6c6048d3/ade37e28-e0e1-4652-b252-7dc98892ce25';
    
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        // Success State
        btnText.textContent = 'Sucesso! Redirecionando...';
        spinner.style.display = 'none';
        
        // Redirect to WhatsApp logic
        const waText = `Olá! Meu nome é ${data.name}, o faturamento da minha loja é ${data.revenue} e gostaria de uma avaliação para escalar meus resultados.`;
        const waNumber = "5511999999999"; // Substituir pelo número real
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
        
        setTimeout(() => {
            window.open(waLink, '_blank'); // Open in new tab
            closeModal();
            // Reset form
            leadForm.reset();
            submitBtn.disabled = false;
            btnText.textContent = 'Agendar Agora';
        }, 1000);
        
    } catch (error) {
        console.error("Erro ao enviar webhook:", error);
        btnText.textContent = 'Erro ao enviar. Tente novamente.';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Parse UTM parameters
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
    utms.forEach(utm => {
        if(urlParams.has(utm)) {
            const input = document.getElementById(utm);
            if(input) input.value = urlParams.get(utm);
        }
    });
});
