/**
 * Quotes.js
 * Works with public quote endpoints. Falls back to a curated collection 
 * when offline or rate-limited. Handles loader flags and fade transitions.
 */
const QuotesModule = {
  // Pre-configured backup quotes
  backupQuotes: [
    { quote: "The only system to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { quote: "Do not wait; the time will never be 'just right.' Start where you stand.", author: "Napoleon Hill" },
    { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { quote: "You do not find a happy life. You make it.", author: "Thomas S. Monson" },
    { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" }
  ],

  init() {
    const refreshBtn = document.getElementById('btn-refresh-quote');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.fetchQuote());
    }

    // Load initial quote on startup
    this.fetchQuote();
  },

  fetchQuote() {
    this.showLoading(true);

    // Primary quote API has 100% CORS support
    const url = 'https://dummyjson.com/quotes/random';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Quotes API returned bad status");
        return res.json();
      })
      .then(data => {
        if (data.quote && data.author) {
          this.displayQuote(data.quote, data.author);
        } else {
          this.loadFallback();
        }
      })
      .catch(err => {
        console.warn("Using offline fallback quotes due to connection issue:", err.message);
        this.loadFallback();
      });
  },

  loadFallback() {
    const randomIndex = Math.floor(Math.random() * this.backupQuotes.length);
    const item = this.backupQuotes[randomIndex];
    this.displayQuote(item.quote, item.author);
  },

  displayQuote(quoteText, authorName) {
    this.showLoading(false);

    const quoteEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    const card = document.getElementById('quotes-container-card');

    if (!quoteEl || !authorEl) return;

    // Apply fade out transition
    quoteEl.style.opacity = 0;
    authorEl.style.opacity = 0;

    setTimeout(() => {
      quoteEl.textContent = `"${quoteText}"`;
      authorEl.textContent = `— ${authorName || 'Unknown'}`;
      
      // Fade back in
      quoteEl.style.opacity = 1;
      authorEl.style.opacity = 1;
    }, 250);

    // Sync dashboard preview badge
    const badge = document.getElementById('badge-quotes-summary');
    if (badge) {
      badge.textContent = `"${quoteText.substring(0, 18)}..."`;
      badge.style.background = 'rgba(139, 92, 246, 0.15)';
      badge.style.color = '#8B5CF6';
    }

    if (window.showToast) {
      window.showToast('Motivation quote updated', 'info');
    }
  },

  showLoading(isLoading) {
    const skeleton = document.getElementById('quote-skeleton');
    const content = document.getElementById('quote-main-content');
    
    if (skeleton && content) {
      if (isLoading) {
        skeleton.style.display = 'block';
        content.style.display = 'none';
      } else {
        skeleton.style.display = 'none';
        content.style.display = 'block';
      }
    }
  }
};
window.QuotesModule = QuotesModule;
