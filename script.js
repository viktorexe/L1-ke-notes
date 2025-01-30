document.addEventListener('DOMContentLoaded', function() {
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');

    // PDF file mappings
    const pdfFiles = {
        'CAM': 'cam.pdf',
        'EES': 'ees.pdf',
        'ES': 'ec.pdf',
        'PSUC': 'psuc.pdf'
    };

    // Login Handling
    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === '2007') {
            loginScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            errorMessage.textContent = '';
        } else {
            errorMessage.textContent = 'Password toh sahi daal bhai 😭';
            passwordInput.value = '';
        }
    });

    // Enter key for login
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });

    // View Notes Function
    window.viewSubjectNotes = function(subject) {
        if (pdfFiles[subject]) {
            showCustomPrompt('Ruk notes khul rahe hian...', 'view', () => {
                window.open(pdfFiles[subject], '_blank');
            });
        }
    };

    // Download Notes Function
    window.downloadSubjectNotes = function(subject) {
        if (pdfFiles[subject]) {
            showCustomPrompt('Starting download...', 'download', () => {
                const link = document.createElement('a');
                link.href = pdfFiles[subject];
                link.download = pdfFiles[subject];
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    };

    // Show Custom Prompt
    function showCustomPrompt(message, action, callback) {
        // Remove any existing prompts
        const existingPrompt = document.querySelector('.custom-prompt');
        const existingOverlay = document.querySelector('.overlay');
        if (existingPrompt) existingPrompt.remove();
        if (existingOverlay) existingOverlay.remove();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        
        // Create prompt
        const prompt = document.createElement('div');
        prompt.className = 'custom-prompt';
        
        // Set icon based on action
        const icon = action === 'view' ? 'fa-eye' : 'fa-download';
        
        prompt.innerHTML = `
            <div class="prompt-content">
                <i class="fas ${icon} prompt-icon"></i>
                <p>${message}</p>
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(prompt);

        // Execute callback after brief delay
        setTimeout(() => {
            callback();
            setTimeout(() => {
                closeCustomPrompt();
            }, 1000);
        }, 1000);
    }

    // Close Custom Prompt
    function closeCustomPrompt() {
        const overlay = document.querySelector('.overlay');
        const prompt = document.querySelector('.custom-prompt');
        
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
        
        if (prompt) {
            prompt.style.opacity = '0';
            prompt.style.transform = 'translate(-50%, -60%)';
            setTimeout(() => prompt.remove(), 300);
        }
    }

    // Show unavailable prompt
    window.showUnavailablePrompt = function() {
        const existingPrompt = document.querySelector('.unavailable-prompt');
        if (existingPrompt) return;

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        
        const prompt = document.createElement('div');
        prompt.className = 'unavailable-prompt';
        prompt.innerHTML = `
            <p>Dekh iske notes abhi nahi hai bhai sorry.</p>
            <button onclick="closeUnavailablePrompt()">
                <i class="fas fa-times"></i> Close
            </button>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(prompt);
    };

    // Close unavailable prompt
    window.closeUnavailablePrompt = function() {
        const overlay = document.querySelector('.overlay');
        const prompt = document.querySelector('.unavailable-prompt');
        
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
        
        if (prompt) {
            prompt.style.opacity = '0';
            prompt.style.transform = 'translate(-50%, -60%)';
            setTimeout(() => prompt.remove(), 300);
        }
    };

    // Close prompts on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCustomPrompt();
            closeUnavailablePrompt();
        }
    });

    // Close prompts on overlay click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay')) {
            closeCustomPrompt();
            closeUnavailablePrompt();
        }
    });
});
