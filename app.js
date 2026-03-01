/**
 * ChemBasics - Core Application Logic
 * Modular and reusable functions for theme, navigation, and utilities.
 */

// Module: Theme Management
const ThemeManager = {
    themeToggleBtn: null,

    init() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        if (!this.themeToggleBtn) return;

        const savedTheme = localStorage.getItem('chembasics-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateIcon('dark');
        }

        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    },

    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('chembasics-theme', newTheme);
        this.updateIcon(newTheme);
    },

    updateIcon(theme) {
        if (this.themeToggleBtn) {
            this.themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    }
};

// Module: Navigation Management
const NavigationManager = {
    init() {
        this.setupMobileMenu();
        this.highlightActiveLink();
    },

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
                const isExpanded = navLinks.classList.contains('show');
                menuBtn.setAttribute('aria-expanded', isExpanded);
            });
        }
    },

    highlightActiveLink() {
        const pathParts = window.location.pathname.split('/');
        let currentFileName = pathParts[pathParts.length - 1];

        if (!currentFileName || currentFileName === '') {
            currentFileName = 'index.html';
        }

        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const hrefParts = link.getAttribute('href').split('/');
            const hrefFileName = hrefParts[hrefParts.length - 1];

            if (currentFileName === hrefFileName) {
                link.classList.add('active');
            }
        });
    }
};

// Module: Fundamentals Page (Hierarchical)
const FundamentalsPage = {
    container: null,
    currentCategoryData: null,
    currentTopicData: null,

    init() {
        this.container = document.getElementById('fundamentals-container');
        if (!this.container || !window.ChemData || !window.ChemData.fundamentals) return;

        // Start by showing all categories on initialization
        this.renderCategories();
    },

    /**
     * Level 1: Render All Top-Level Categories
     */
    renderCategories() {
        this.currentCategoryData = null;
        this.currentTopicData = null;

        // Switch container to CSS grid layout for cards
        this.container.className = 'features-grid';

        let html = '';
        window.ChemData.fundamentals.forEach((catObj, index) => {
            // Use standard card class, hook click via ID
            html += `
        <div class="card animate-fade-in" style="animation-delay: ${index * 0.1}s; cursor: pointer;" onclick="FundamentalsPage.openCategory('${catObj.id}')">
          <div class="icon" aria-hidden="true">⚛️</div>
          <h2 style="color: var(--primary-color);">${catObj.category}</h2>
          <p>${catObj.topics.length} Subtopics</p>
          <div style="margin-top: auto;">
             <span style="color: var(--secondary-color); font-weight: 500;">Explore →</span>
          </div>
        </div>
      `;
        });
        this.container.innerHTML = html;
    },

    /**
     * Action: Open a specific category by ID
     */
    openCategory(categoryId) {
        const categoryData = window.ChemData.fundamentals.find(cat => cat.id === categoryId);
        if (categoryData) {
            this.currentCategoryData = categoryData;
            this.renderSubtopics();
        }
    },

    /**
     * Level 2: Render Subtopics for currently selected Category
     */
    renderSubtopics() {
        if (!this.currentCategoryData) return this.renderCategories();

        // Switch container to list/stack layout
        this.container.className = 'animate-fade-in';

        let html = `
      <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
         <button class="btn btn-outline" onclick="FundamentalsPage.renderCategories()">← Back to Categories</button>
         <h2 style="margin: 0;">${this.currentCategoryData.category}</h2>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 800px;">
    `;

        this.currentCategoryData.topics.forEach((topic, index) => {
            html += `
        <div class="card" style="flex-direction: row; align-items: center; justify-content: space-between; padding: 1.5rem; cursor: pointer;" onclick="FundamentalsPage.openTopic('${topic.id}')">
           <h3 style="margin: 0; color: var(--primary-color);">${topic.title}</h3>
           <span style="color: var(--secondary-color); font-weight: 500;">Read →</span>
        </div>
      `;
        });

        html += '</div>';
        this.container.innerHTML = html;
    },

    /**
     * Action: Open a specific topic by ID (looks within current category)
     */
    openTopic(topicId) {
        if (!this.currentCategoryData) return;
        const topicData = this.currentCategoryData.topics.find(t => t.id === topicId);
        if (topicData) {
            this.currentTopicData = topicData;
            this.renderTopicDetails();
        }
    },

    /**
     * Level 3: Render Detailed Explanation View
     */
    renderTopicDetails() {
        if (!this.currentTopicData || !this.currentCategoryData) return this.renderSubtopics();

        const t = this.currentTopicData;
        this.container.className = 'animate-fade-in';

        this.container.innerHTML = `
      <div style="margin-bottom: 2rem;">
         <button class="btn btn-outline" onclick="FundamentalsPage.renderSubtopics()">← Back to ${this.currentCategoryData.category}</button>
      </div>
      
      <div class="card" style="text-align: left; padding: 3rem;">
         <h1 style="color: var(--primary-color); border-bottom: 2px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 2rem;">
            ${t.title}
         </h1>
         
         <div style="margin-bottom: 2rem;">
            <p style="font-size: 1.1rem; line-height: 1.8;">${t.explanation}</p>
         </div>

         ${t.formula ? `
         <div style="background: var(--bg-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary-color);">
            <h3 style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--secondary-color); text-transform: uppercase;">Key Formula</h3>
            <p style="font-family: monospace; font-size: 1.2rem; margin: 0; font-weight: bold;">${t.formula}</p>
         </div>
         ` : ''}

         ${t.example ? `
         <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-color);">Relevance & Example</h3>
            <p>${t.example}</p>
         </div>
         ` : ''}
         
         ${t.notes ? `
         <div style="background: rgba(14, 165, 233, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--primary-color);">Important Notes</h3>
            <p style="margin: 0; color: var(--secondary-color);">${t.notes}</p>
         </div>
         ` : ''}
      </div>
    `;
    }
};

// Module: Calculators Page
const CalculatorsPage = {
    init() {
        this.initMolarity();
        this.initNormality();
        this.initDilution();
    },

    initMolarity() {
        const btn = document.getElementById('calc-molarity-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const moles = parseFloat(document.getElementById('molarity-moles').value);
            const volume = parseFloat(document.getElementById('molarity-vol').value);
            const resultEl = document.getElementById('molarity-result');

            if (isNaN(moles) || isNaN(volume) || volume <= 0) {
                resultEl.innerHTML = '<span style="color: #ef4444;">Please enter valid positive numbers.</span>';
                return;
            }
            const molarity = (moles / volume).toFixed(4);
            resultEl.innerHTML = `<strong style="color: var(--primary-color);">Result: ${molarity} M</strong>`;
        });
    },

    initNormality() {
        const btn = document.getElementById('calc-normality-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const equivalents = parseFloat(document.getElementById('normality-eq').value);
            const volume = parseFloat(document.getElementById('normality-vol').value);
            const resultEl = document.getElementById('normality-result');

            if (isNaN(equivalents) || isNaN(volume) || volume <= 0) {
                resultEl.innerHTML = '<span style="color: #ef4444;">Please enter valid positive numbers.</span>';
                return;
            }
            const normality = (equivalents / volume).toFixed(4);
            resultEl.innerHTML = `<strong style="color: var(--primary-color);">Result: ${normality} N</strong>`;
        });
    },

    initDilution() {
        const btn = document.getElementById('calc-dilution-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const v1 = document.getElementById('dilution-v1').value;
            const c1 = document.getElementById('dilution-c1').value;
            const v2 = document.getElementById('dilution-v2').value;
            const c2 = document.getElementById('dilution-c2').value;

            const parsed = [parseFloat(v1), parseFloat(c1), parseFloat(v2), parseFloat(c2)];
            const numEmpty = parsed.filter(isNaN).length;
            const resultEl = document.getElementById('dilution-result');

            if (numEmpty !== 1) {
                resultEl.innerHTML = '<span style="color: #ef4444;">Please leave exactly ONE field empty.</span>';
                return;
            }

            let resultText = '';
            if (isNaN(parsed[0])) { // V1
                resultText = `V₁ = ${(parsed[2] * parsed[3] / parsed[1]).toFixed(4)}`;
            } else if (isNaN(parsed[1])) { // C1
                resultText = `C₁ = ${(parsed[2] * parsed[3] / parsed[0]).toFixed(4)}`;
            } else if (isNaN(parsed[2])) { // V2
                resultText = `V₂ = ${(parsed[0] * parsed[1] / parsed[3]).toFixed(4)}`;
            } else if (isNaN(parsed[3])) { // C2
                resultText = `C₂ = ${(parsed[0] * parsed[1] / parsed[2]).toFixed(4)}`;
            }

            resultEl.innerHTML = `<strong style="color: var(--primary-color);">Result: ${resultText}</strong>`;
        });
    }
};

// Module: Revision Page (Flashcards)
const RevisionPage = {
    currentIndex: 0,

    init() {
        const container = document.getElementById('flashcard-container');
        if (!container || !window.ChemData || !window.ChemData.flashcards) return;

        this.renderCard();

        document.getElementById('prev-card-btn')?.addEventListener('click', () => this.prevCard());
        document.getElementById('next-card-btn')?.addEventListener('click', () => this.nextCard());
        document.getElementById('flip-card-btn')?.addEventListener('click', () => this.flipCard());
    },

    renderCard() {
        const cardContent = document.getElementById('flashcard-content');
        const counter = document.getElementById('flashcard-counter');
        if (!cardContent || !counter) return;

        const cards = window.ChemData.flashcards;
        const card = cards[this.currentIndex];

        // reset flip state
        cardContent.parentElement.classList.remove('flipped');

        cardContent.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <h3 style="color: var(--primary-color);">Question</h3>
          <p style="font-size: 1.25rem; font-weight: 500; margin-top: 1rem;">${card.q}</p>
        </div>
        <div class="flashcard-back">
          <h3 style="color: var(--primary-color);">Answer</h3>
          <p style="font-size: 1.1rem; margin-top: 1rem;">${card.a}</p>
        </div>
      </div>
    `;

        counter.textContent = `${this.currentIndex + 1} / ${cards.length}`;
    },

    nextCard() {
        const cards = window.ChemData.flashcards;
        if (this.currentIndex < cards.length - 1) {
            this.currentIndex++;
            this.renderCard();
        }
    },

    prevCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderCard();
        }
    },

    flipCard() {
        const cardContent = document.getElementById('flashcard-content');
        if (cardContent) {
            cardContent.parentElement.classList.toggle('flipped');
        }
    }
};

// Module: Lab Basics Page
const LabBasicsPage = {
    init() {
        const container = document.getElementById('lab-equipment-container');
        if (!container || !window.ChemData) return;

        let html = '';
        window.ChemData.labEquipment.forEach((item, index) => {
            html += `
        <div class="card animate-fade-in" style="animation-delay: ${index * 0.1}s; flex-direction: row; align-items: center; text-align: left;">
          <div style="font-size: 4rem; margin-right: 1.5rem; color: var(--primary-color);" aria-hidden="true">${item.icon}</div>
          <div>
            <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${item.name}</h3>
            <p>${item.desc}</p>
          </div>
        </div>
      `;
        });
        container.innerHTML = html;
    }
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    NavigationManager.init();

    // Conditionally init modules if elements exist
    FundamentalsPage.init();
    CalculatorsPage.init();
    RevisionPage.init();
    LabBasicsPage.init();
});
