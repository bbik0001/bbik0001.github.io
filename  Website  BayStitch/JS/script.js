
// Contact Modal
const modal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modal-close');
const modalSubmit = document.getElementById('modal-submit');
const modalForm = document.getElementById('modal-form');
const modalThankyou = document.getElementById('modal-thankyou');
const contactBtn = document.querySelector('.cs-nav-button');

// Open modal
contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
});

// Close modal
const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset form after closing
    setTimeout(() => {
        modalForm.style.display = 'flex';
        modalForm.style.flexDirection = 'column';
        modalThankyou.classList.remove('active');
    }, 300);
};

modalClose.addEventListener('click', closeModal);

// Close when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Submit form
modalSubmit.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim().replace(/[\s\-]/g, '');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+?61|0)[2-9]\d{8}$/;

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (!email || !emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phone) {
        alert('Please enter your phone number.');
        return;
    }

    if (!phonePattern.test(phone)) {
        alert('Please enter a valid Australian phone number. Example: 0440 121 142');
        return;
    }

    // Extra length check
    if (phone.startsWith('0') && phone.length !== 10) {
        alert('Australian phone numbers must be 10 digits. Example: 0440 121 142');
        return;
    }

    if (phone.startsWith('+61') && phone.length !== 12) {
        alert('Please enter a valid Australian phone number. Example: +61440121142');
        return;
    }

    if (phone.startsWith('61') && phone.length !== 11) {
        alert('Please enter a valid Australian phone number. Example: 61440121142');
        return;
    }

    modalForm.style.display = 'none';
    modalThankyou.classList.add('active');
    
    setTimeout(closeModal, 3000);
});

const dropLinks = document.querySelectorAll('.cs-drop-link');

dropLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetCard = document.querySelector(targetId);
        
        if (!targetCard) return;

        // Smooth scroll to card
        targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Add highlight animation
        targetCard.classList.add('cs-highlight');

        // Remove highlight after animation finishes
        setTimeout(() => {
            targetCard.classList.remove('cs-highlight');
        }, 2000);
    });
});