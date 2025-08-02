# Information Architecture Document

## Site Map Structure

### Primary Navigation Pages

1. **`/index.html`** - Landing Page
   - Purpose: Summary + prominent CTAs
   - Content: Welcome message, key highlights, call-to-action buttons
   - Priority: Highest (entry point)

2. **`/my-story/`** - Personal Story
   - Purpose: Personal narrative and experience
   - Content: Detailed account of the fraud experience
   - Priority: High

3. **`/evidence/`** - Evidence Documentation
   - Purpose: Supporting documentation and proof
   - Content: Screenshots, documents, correspondence
   - Priority: High

4. **`/warning-signs/`** - Warning Signs
   - Purpose: Educational content about fraud indicators
   - Content: List of red flags and warning signs
   - Priority: High

5. **`/timeline/`** - Timeline of Events
   - Purpose: Chronological sequence of events
   - Content: Dates, events, milestones
   - Priority: Medium

6. **`/faq/`** - Frequently Asked Questions
   - Purpose: Common questions and answers
   - Content: Q&A format addressing common concerns
   - Priority: Medium

7. **`/resources/`** - Resources and Links
   - Purpose: Additional helpful resources
   - Content: External links, tools, support organizations
   - Priority: Medium

8. **`/contact/`** - Contact Information
   - Purpose: Ways to get in touch
   - Content: Contact forms, email, social media links
   - Priority: Medium

## Breadcrumb Navigation Scheme

### Breadcrumb Structure
```
Home > [Current Page]
Home > [Parent Section] > [Current Page]
```

### Breadcrumb Examples by Page:

- **Home**: No breadcrumb (root level)
- **My Story**: `Home > My Story`
- **Evidence**: `Home > Evidence`
- **Warning Signs**: `Home > Warning Signs`
- **Timeline**: `Home > Timeline`
- **FAQ**: `Home > FAQ`
- **Resources**: `Home > Resources`
- **Contact**: `Home > Contact`

### Breadcrumb Implementation:
- Always clickable links except for current page
- Current page shown in plain text or different styling
- Separated by ">" or arrow symbols
- Consistent placement below main navigation

## Header Navigation

### Primary Navigation Bar
```html
<nav class="main-navigation">
    <a href="/index.html">Home</a>
    <a href="/my-story/">My Story</a>
    <a href="/evidence/">Evidence</a>
    <a href="/warning-signs/">Warning Signs</a>
    <a href="/timeline/">Timeline</a>
    <a href="/faq/">FAQ</a>
    <a href="/resources/">Resources</a>
    <a href="/contact/">Contact</a>
</nav>
```

### Navigation Characteristics:
- Horizontal layout on desktop
- Responsive collapse to hamburger menu on mobile
- Current page highlighted with different color/style
- Consistent across all pages
- Fixed position or sticky header (recommended)

## Footer Navigation

### Footer Structure
```html
<footer>
    <div class="footer-links">
        <h4>Quick Links</h4>
        <ul>
            <li><a href="/my-story/">My Story</a></li>
            <li><a href="/evidence/">Evidence</a></li>
            <li><a href="/warning-signs/">Warning Signs</a></li>
            <li><a href="/timeline/">Timeline</a></li>
        </ul>
    </div>
    <div class="footer-resources">
        <h4>Resources</h4>
        <ul>
            <li><a href="/faq/">FAQ</a></li>
            <li><a href="/resources/">Resources</a></li>
            <li><a href="/contact/">Contact</a></li>
        </ul>
    </div>
    <div class="footer-legal">
        <p>&copy; 2023 [Site Name]. All rights reserved.</p>
        <p><a href="/privacy/">Privacy Policy</a> | <a href="/terms/">Terms of Use</a></p>
    </div>
</footer>
```

### Footer Characteristics:
- Organized into logical sections
- Duplicate key navigation links
- Legal/copyright information
- Consistent across all pages
- Additional utility links (Privacy, Terms, etc.)

## User Experience Flow

### Primary User Journeys:

1. **New Visitor Learning Path**:
   `Home → My Story → Evidence → Warning Signs`

2. **Information Seeker Path**:
   `Home → FAQ → Resources → Contact`

3. **Research/Investigation Path**:
   `Home → Timeline → Evidence → Resources`

## Mobile Considerations

### Responsive Design Requirements:
- Collapsible hamburger menu for main navigation
- Touch-friendly button sizes (minimum 44px)
- Single-column layout for mobile
- Simplified breadcrumbs (may show only parent > current)
- Sticky header with site title and menu toggle

## SEO and Accessibility

### URL Structure:
- Clean, descriptive URLs
- Consistent trailing slash usage
- Logical hierarchy
- Search engine friendly

### Accessibility Features:
- Skip navigation links
- ARIA labels for navigation
- Keyboard navigation support
- Screen reader friendly breadcrumbs
- Alt text for all images

## Content Strategy

### Page Priority Levels:
- **Level 1** (Critical): Home, My Story, Evidence
- **Level 2** (Important): Warning Signs, Timeline
- **Level 3** (Supporting): FAQ, Resources, Contact

### Cross-Page Linking Strategy:
- Related content suggestions at page bottom
- Contextual in-line links within content
- Clear call-to-action buttons directing to next logical page
- "Next/Previous" navigation where chronological order matters
