// Modal functionality for viewing evidence images with zoom and pan
let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImage");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];

// Zoom and pan variables
let scale = 1;
let panning = false;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };

// Function to open modal
function openModal(img) {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
    resetZoom(); // Reset zoom when opening modal
    
    // Show modal hint for 4 seconds, but only for the cheque image
    const modalHint = document.getElementById('modalHint');
    if (img.src.includes('fake_cheque.jpg')) {
        modalHint.style.display = 'block';
        modalHint.classList.remove('hidden');
        
        // Hide hint after 4 seconds
        setTimeout(() => {
            modalHint.classList.add('hidden');
        }, 4000);
    } else {
        modalHint.style.display = 'none';
    }
}

// Function to reset zoom and pan
function resetZoom() {
    scale = 1;
    pointX = 0;
    pointY = 0;
    modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// Function to set zoom level
function setZoom(newScale) {
    scale = Math.max(0.1, Math.min(5, newScale)); // Limit zoom between 0.1x and 5x
    modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// Zoom in function
function zoomIn() {
    hideModalHint(); // Hide hint on zoom
    setZoom(scale * 1.2);
}

// Zoom out function
function zoomOut() {
    hideModalHint(); // Hide hint on zoom
    setZoom(scale / 1.2);
}

// Reset to 100% zoom
function resetTo100() {
    hideModalHint(); // Hide hint on zoom
    scale = 1;
    pointX = 0;
    pointY = 0;
    modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// Function to hide modal hint on interaction
function hideModalHint() {
    const modalHint = document.getElementById('modalHint');
    if (modalHint && !modalHint.classList.contains('hidden')) {
        modalHint.classList.add('hidden');
    }
}

// Mouse wheel zoom
modalImg.addEventListener('wheel', function(e) {
    e.preventDefault();
    hideModalHint(); // Hide hint on zoom
    
    const rect = modalImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = scale * delta;
    
    if (newScale >= 0.1 && newScale <= 5) {
        const scaleChange = newScale / scale;
        
        pointX = offsetX - (offsetX - pointX) * scaleChange;
        pointY = offsetY - (offsetY - pointY) * scaleChange;
        
        scale = newScale;
        modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }
});

// Mouse pan functionality
modalImg.addEventListener('mousedown', function(e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    modalImg.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
    e.preventDefault();
    if (!panning) {
        return;
    }
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
});

document.addEventListener('mouseup', function(e) {
    panning = false;
    modalImg.style.cursor = scale > 1 ? 'grab' : 'default';
});

// Touch support for mobile devices
let lastTouchDistance = 0;
let initialScale = 1;

modalImg.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
        lastTouchDistance = getTouchDistance(e.touches[0], e.touches[1]);
        initialScale = scale;
    } else if (e.touches.length === 1) {
        start = { x: e.touches[0].clientX - pointX, y: e.touches[0].clientY - pointY };
        panning = true;
    }
});

modalImg.addEventListener('touchmove', function(e) {
    e.preventDefault();
    hideModalHint(); // Hide hint on touch interaction
    
    if (e.touches.length === 2) {
        // Pinch to zoom
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const scaleChange = currentDistance / lastTouchDistance;
        const newScale = initialScale * scaleChange;
        
        if (newScale >= 0.1 && newScale <= 5) {
            scale = newScale;
            modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
        }
    } else if (e.touches.length === 1 && panning) {
        // Pan
        pointX = e.touches[0].clientX - start.x;
        pointY = e.touches[0].clientY - start.y;
        modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }
});

modalImg.addEventListener('touchend', function(e) {
    panning = false;
    modalImg.style.cursor = scale > 1 ? 'grab' : 'default';
});

// Helper function to get distance between two touch points
function getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Update cursor based on zoom level
function updateCursor() {
    modalImg.style.cursor = scale > 1 ? 'grab' : 'default';
}

// Close modal when clicking the X
span.onclick = function() {
    modal.style.display = "none";
    resetZoom(); // Reset zoom when closing
}

// Close modal when clicking outside the image
modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetZoom(); // Reset zoom when closing
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modal.style.display = "none";
        resetZoom(); // Reset zoom when closing
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
            const pashKeywords = ['pash investment', 'pash', 'sanket', 'himanshu', 'rustagi'];
            
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
                warningDiv.innerHTML = '🚨 WARNING: You mentioned PASH Investment or Rustagi! If you\'re dealing with them, STOP immediately and seek legal help!';
                
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
