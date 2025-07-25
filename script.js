// Modal functionality for viewing evidence images
let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImage");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];

// Function to open modal
function openModal(img) {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

// Close modal when clicking the X
span.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking outside the image
modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modal.style.display = "none";
    }
});

// Story submission functionality
document.addEventListener('DOMContentLoaded', function() {
    const storyForm = document.getElementById('storyForm');
    const storiesList = document.getElementById('storiesList');
    
    // Load existing stories from localStorage
    loadStories();
    
    storyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(storyForm);
        const story = {
            id: Date.now(),
            name: formData.get('name') || 'Anonymous',
            company: formData.get('company'),
            location: formData.get('location'),
            amount: formData.get('amount'),
            story: formData.get('story'),
            email: formData.get('email'),
            date: new Date().toLocaleDateString('en-IN')
        };
        
        // Validate required fields
        if (!story.company || !story.story) {
            alert('Please fill in all required fields (Company Name and Your Story)');
            return;
        }
        
        // Save story
        saveStory(story);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        storyForm.reset();
        
        // Reload stories
        loadStories();
    });
    
    function saveStory(story) {
        let stories = JSON.parse(localStorage.getItem('fraudStories') || '[]');
        stories.unshift(story); // Add to beginning of array
        localStorage.setItem('fraudStories', JSON.stringify(stories));
    }
    
    function loadStories() {
        let stories = JSON.parse(localStorage.getItem('fraudStories') || '[]');
        
        if (stories.length === 0) {
            storiesList.innerHTML = '<p>Be the first to share your story and help others avoid fraud.</p>';
            return;
        }
        
        storiesList.innerHTML = stories.map(story => `
            <div class="story-post">
                <div class="story-header">
                    <div class="story-author">${escapeHtml(story.name)}</div>
                    <div class="story-meta">Posted on ${story.date}</div>
                </div>
                <div class="story-content">
                    ${escapeHtml(story.story).replace(/\n/g, '<br>')}
                </div>
                <div class="story-details">
                    <strong>Company:</strong> ${escapeHtml(story.company)} | 
                    ${story.location ? `<strong>Location:</strong> ${escapeHtml(story.location)} | ` : ''}
                    ${story.amount ? `<strong>Amount Lost:</strong> ${escapeHtml(story.amount)}` : ''}
                </div>
            </div>
        `).join('');
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = '✅ Thank you for sharing your story! It will help others avoid similar fraud.';
        
        storyForm.parentNode.insertBefore(successDiv, storyForm);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100; // Account for sticky nav
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Warning system for PASH Investment detection (popup removed)
// The warning is now displayed prominently on the page without interrupting user experience

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareStory() {
    if (navigator.share) {
        navigator.share({
            title: 'PASH Investment Fraud Alert - Protect Yourself',
            text: 'Warning about PASH Investment real estate fraud. Learn about this scam to protect yourself.',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard! Share it to help others avoid this fraud.');
        });
    }
}

// Add warning badges for mobile
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        // Add mobile-specific warnings
        const mobileWarning = document.createElement('div');
        mobileWarning.innerHTML = `
            <div style="background: #dc2626; color: white; padding: 1rem; text-align: center; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000; font-weight: bold;">
                🚨 URGENT: Avoid PASH Investment fraud! Share to warn others.
                <button onclick="this.parentElement.style.display='none'" style="float: right; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">×</button>
            </div>
        `;
        
        // Show mobile warning for 10 seconds
        document.body.appendChild(mobileWarning);
        setTimeout(() => {
            if (mobileWarning.parentElement) {
                mobileWarning.remove();
            }
        }, 10000);
    }
});

// Add search functionality for stories
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search stories by company name or location...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 2px solid #e5e5e5;
        border-radius: 8px;
        font-size: 1rem;
    `;
    
    const storiesSection = document.getElementById('stories');
    const storiesTitle = storiesSection.querySelector('h3');
    storiesTitle.parentNode.insertBefore(searchInput, storiesTitle.nextSibling);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const stories = JSON.parse(localStorage.getItem('fraudStories') || '[]');
        
        if (searchTerm === '') {
            loadStoriesFiltered(stories);
            return;
        }
        
        const filteredStories = stories.filter(story => 
            story.company.toLowerCase().includes(searchTerm) ||
            (story.location && story.location.toLowerCase().includes(searchTerm)) ||
            story.story.toLowerCase().includes(searchTerm)
        );
        
        loadStoriesFiltered(filteredStories);
    });
    
    function loadStoriesFiltered(stories) {
        const storiesList = document.getElementById('storiesList');
        
        if (stories.length === 0) {
            storiesList.innerHTML = '<p>No stories found matching your search.</p>';
            return;
        }
        
        storiesList.innerHTML = stories.map(story => `
            <div class="story-post">
                <div class="story-header">
                    <div class="story-author">${escapeHtml(story.name)}</div>
                    <div class="story-meta">Posted on ${story.date}</div>
                </div>
                <div class="story-content">
                    ${escapeHtml(story.story).replace(/\n/g, '<br>')}
                </div>
                <div class="story-details">
                    <strong>Company:</strong> ${escapeHtml(story.company)} | 
                    ${story.location ? `<strong>Location:</strong> ${escapeHtml(story.location)} | ` : ''}
                    ${story.amount ? `<strong>Amount Lost:</strong> ${escapeHtml(story.amount)}` : ''}
                </div>
            </div>
        `).join('');
    }
    
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});

// Analytics-like tracking (privacy-friendly, local only)
document.addEventListener('DOMContentLoaded', function() {
    const visits = parseInt(localStorage.getItem('siteVisits') || '0') + 1;
    localStorage.setItem('siteVisits', visits.toString());
    
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        localStorage.setItem('lastVisit', today);
        
        // Log unique daily visit (for site owner's info)
        console.log(`Daily visit #${visits} - Helping spread awareness about PASH Investment fraud`);
    }
});

// Detect if user is trying to contact PASH Investment
document.addEventListener('DOMContentLoaded', function() {
    // Monitor form inputs for PASH Investment mentions
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const pashKeywords = ['pash investment', 'pash', 'sanket', 'himanshu', 'rustogi'];
            
            if (pashKeywords.some(keyword => value.includes(keyword))) {
                // Show immediate warning
                const warningDiv = document.createElement('div');
                warningDiv.style.cssText = `
                    background: #dc2626;
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    margin: 0.5rem 0;
                    font-weight: bold;
                    text-align: center;
                `;
                warningDiv.innerHTML = '🚨 WARNING: You mentioned PASH Investment or Rustogi! If you\'re dealing with them, STOP immediately and seek legal help!';
                
                this.parentNode.insertBefore(warningDiv, this.nextSibling);
                
                // Remove warning after 5 seconds
                setTimeout(() => {
                    if (warningDiv.parentElement) {
                        warningDiv.remove();
                    }
                }, 5000);
            }
        });
    });
});
