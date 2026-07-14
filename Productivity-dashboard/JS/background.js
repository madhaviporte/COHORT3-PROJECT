/**
 * Background.js
 * Automatically alters gradients depending on local hours and draws an animated star field at night.
 */
const BackgroundModule = {
  canvas: null,
  ctx: null,
  stars: [],
  animationId: null,
  activePeriod: '',

  init() {
    this.canvas = document.getElementById('stars-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  },

  resizeCanvas() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      if (this.activePeriod === 'night') {
        this.initStars();
      }
    }
  },

  initStars() {
    this.stars = [];
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        alpha: Math.random(),
        increment: (Math.random() * 0.02) + 0.005,
        twinkles: Math.random() > 0.3
      });
    }
  },

  transitionBackground(period) {
    this.activePeriod = period;
    const bgOverlay = document.getElementById('bg-overlay');
    if (!bgOverlay) return;

    let gradient = '';
    // Let's create beautiful gradients depending on period of day
    switch(period) {
      case 'morning':
        gradient = 'linear-gradient(135deg, #FFEBD7 0%, #FFD7CF 30%, #E3E9F3 70%, #C4D7E6 100%)';
        this.stopStars();
        break;
      case 'afternoon':
        gradient = 'linear-gradient(135deg, #D4EDFC 0%, #E8F5FF 40%, #DEF0F9 70%, #F5F7FA 100%)';
        this.stopStars();
        break;
      case 'evening':
        gradient = 'linear-gradient(135deg, #1A162B 0%, #311E4B 25%, #6A215C 50%, #B83B5E 75%, #E28743 100%)';
        this.stopStars();
        break;
      case 'night':
      default:
        gradient = 'linear-gradient(135deg, #05060B 0%, #0F1221 35%, #181E36 70%, #202747 100%)';
        this.startStars();
        break;
    }

    // Apply background gradient variables
    bgOverlay.style.background = gradient;
  },

  startStars() {
    this.stopStars();
    if (!this.canvas) return;
    this.initStars();
    
    // Animation loop
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.stars.forEach(star => {
        if (star.twinkles) {
          star.alpha += star.increment;
          if (star.alpha <= 0.1 || star.alpha >= 0.9) {
            star.increment = -star.increment;
          }
        }
        
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(238, 242, 255, ${star.alpha})`;
        this.ctx.fill();
      });

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  },

  stopStars() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
};
window.BackgroundModule = BackgroundModule;
