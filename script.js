$(document).ready(function() {
    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    
    // ===== THEME SWITCHER =====
    const themeButtons = $('.theme-btn');
    const body = $('body');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'matrix';
    body.attr('data-theme', savedTheme);
    themeButtons.removeClass('active');
    $(`.theme-btn[data-theme="${savedTheme}"]`).addClass('active');
    
    // ===== MATRIX RAIN EFFECT =====
    function initMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        // Clear any existing interval
        if (window.matrixInterval) {
            clearInterval(window.matrixInterval);
        }
        
        window.matrixInterval = setInterval(draw, 35);
    }
    
    // ===== HORIZONTAL CAROUSEL DUPLICATION - NEW =====
    function initHorizontalCarousel() {
        const carousel = $('#skillsCarousel');
        if (carousel.length) {
            // Duplicate content for seamless infinite scroll
            const items = carousel.html();
            carousel.html(carousel.html() + items); // Clone all items
        }
    }
    
    // Initialize carousel on load
    initHorizontalCarousel();
    
    // ===== THEME-SPECIFIC ANIMATIONS =====
    
    // Anime Theme - Clickable Sakura Petals
    function initAnimeTheme() {
        const bgElements = $('.bg-elements');
        bgElements.empty();
        
        // Create BIGGER clickable sakura petals
        for (let i = 0; i < 20; i++) {
            const petal = $('<div class="sakura-petal"></div>');
            petal.css({
                left: Math.random() * 100 + '%',
                top: Math.random() * -50 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (10 + Math.random() * 10) + 's'
            });
            
            // Click to burst
            petal.on('click', function(e) {
                const x = e.pageX;
                const y = e.pageY;
                
                // Create burst particles
                for (let j = 0; j < 12; j++) {
                    const burst = $('<div class="petal-burst"></div>');
                    burst.css({
                        left: x + 'px',
                        top: y + 'px',
                        transform: `rotate(${j * 30}deg) translate(0, 0)`
                    });
                    $('body').append(burst);
                    
                    setTimeout(() => {
                        burst.css('transform', `rotate(${j * 30}deg) translate(150px, 150px)`);
                        burst.css('opacity', '0');
                    }, 10);
                    
                    setTimeout(() => burst.remove(), 1000);
                }
                
                $(this).addClass('burst-anim');
                const clickedPetal = $(this);
                setTimeout(() => {
                    clickedPetal.remove();
                    // Create new petal to replace
                    const newPetal = $('<div class="sakura-petal"></div>');
                    newPetal.css({
                        left: Math.random() * 100 + '%',
                        top: '-20%',
                        animationDelay: '0s',
                        animationDuration: (10 + Math.random() * 10) + 's'
                    });
                    newPetal.on('click', petal.data('events').click[0].handler);
                    bgElements.append(newPetal);
                }, 500);
            });
            
            bgElements.append(petal);
        }
        
        // Add sparkle trail on mouse move
        let lastSparkle = 0;
        $(document).off('mousemove.anime').on('mousemove.anime', function(e) {
            const now = Date.now();
            if (now - lastSparkle > 50 && Math.random() > 0.7) {
                lastSparkle = now;
                const sparkle = $('<div class="sparkle"></div>');
                sparkle.css({
                    left: e.pageX + 'px',
                    top: e.pageY + 'px'
                });
                $('body').append(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }
        });
        
        console.log('%c🌸 Anime Theme Activated - Click the sakura petals!', 'color: #ff6ec7; font-weight: bold;');
    }
    
    // Gaming Theme - Pixel Character & Coins
    function initGamingTheme() {
        const bgElements = $('.bg-elements');
        bgElements.empty();
        
        // Create pixel character (Mario-style)
        const character = $(`
            <div class="pixel-character">
                <div class="pixel-head"></div>
                <div class="pixel-body"></div>
                <div class="pixel-arm-left"></div>
                <div class="pixel-arm-right"></div>
                <div class="pixel-leg-left"></div>
                <div class="pixel-leg-right"></div>
            </div>
        `);
        bgElements.append(character);
        
        // Auto jump animation
        const jumpInterval = setInterval(() => {
            if ($('body').attr('data-theme') === 'gaming') {
                character.addClass('jumping');
                setTimeout(() => character.removeClass('jumping'), 800);
            } else {
                clearInterval(jumpInterval);
            }
        }, 4000);
        
        // CLICK CHARACTER TO JUMP
        character.on('click', function() {
            if (!$(this).hasClass('jumping')) {
                $(this).addClass('jumping');
                setTimeout(() => {
                    $(this).removeClass('jumping');
                }, 800);
                console.log('🎮 Character jumped!');
            }
        });
        
        // Create floating coins
        for (let i = 0; i < 10; i++) {
            const coin = $('<div class="pixel-coin">₵</div>');
            coin.css({
                left: (5 + i * 10) + '%',
                top: (15 + Math.random() * 50) + '%',
                animationDelay: i * 0.3 + 's'
            });
            
            // CLICK TO COLLECT COIN (FLOATS UP!)
            coin.on('click', function() {
                if (!$(this).hasClass('collected')) {
                    $(this).addClass('collected');
                    
                    const points = $('<div class="points-popup">+100</div>');
                    points.css({
                        left: $(this).offset().left + 'px',
                        top: $(this).offset().top + 'px'
                    });
                    $('body').append(points);
                    
                    console.log('🪙 Coin collected! +100 points');
                    
                    setTimeout(() => {
                        $(this).removeClass('collected');
                    }, 2000);
                    
                    setTimeout(() => points.remove(), 1000);
                }
            });
            
            bgElements.append(coin);
        }
        
        // Create power-up stars
        for (let i = 0; i < 6; i++) {
            const star = $('<div class="power-star">★</div>');
            star.css({
                right: (5 + i * 12) + '%',
                top: (20 + Math.random() * 40) + '%',
                animationDelay: i * 0.6 + 's'
            });
            bgElements.append(star);
        }
        
        // Add health bar
        const healthBar = $(`
            <div class="health-bar-container">
                <div class="health-bar-label">⚡ POWER</div>
                <div class="health-bar">
                    <div class="health-bar-fill"></div>
                </div>
            </div>
        `);
        $('body').append(healthBar);
        
        console.log('%c🎮 Gaming Theme Activated - Click coins & character!', 'color: #00d9ff; font-weight: bold;');
    }
    
    // Matrix Theme - Enhanced effects
    function initMatrixTheme() {
        const bgElements = $('.bg-elements');
        bgElements.empty();
        
        // Add scanline effect
        if (!$('.scanline').length) {
            const scanline = $('<div class="scanline"></div>');
            $('body').append(scanline);
        }
        
        // Add glitch overlay
        const glitchInterval = setInterval(() => {
            if ($('body').attr('data-theme') === 'matrix') {
                $('body').addClass('glitch-effect');
                setTimeout(() => {
                    $('body').removeClass('glitch-effect');
                }, 100);
            } else {
                clearInterval(glitchInterval);
            }
        }, 8000);
        
        // Standard particles for matrix (smaller)
        for (let i = 0; i < 5; i++) {
            const particle = $('<div class="particle"></div>');
            particle.css({
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's'
            });
            bgElements.append(particle);
        }
        
        console.log('%c💚 Matrix Theme Activated', 'color: #00ff41; font-weight: bold;');
    }
    
    // ===== THEME SWITCH HANDLER =====
    themeButtons.on('click', function() {
        const theme = $(this).data('theme');
        
        // Clean up previous theme
        $(document).off('mousemove.anime');
        $('.health-bar-container, .scanline, .sakura-petal, .pixel-character, .pixel-coin, .power-star, .sparkle, .petal-burst').remove();
        
        // Remove active class from all buttons
        themeButtons.removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');
        
        // Apply theme with smooth transition
        body.css('opacity', '0.7');
        
        setTimeout(() => {
            body.attr('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
            body.css('opacity', '1');
            
            // Initialize theme-specific animations
            if (theme === 'matrix') {
                initMatrixRain();
                initMatrixTheme();
            } else if (theme === 'anime') {
                initAnimeTheme();
            } else if (theme === 'gaming') {
                initGamingTheme();
            }
        }, 200);
        
        console.log(`%c✨ Theme switched to: ${theme.toUpperCase()}`, 'color: var(--accent-primary); font-weight: bold;');
    });
    
    // Initialize correct theme on load
    setTimeout(() => {
        if (savedTheme === 'matrix') {
            initMatrixRain();
            initMatrixTheme();
        } else if (savedTheme === 'anime') {
            initAnimeTheme();
        } else if (savedTheme === 'gaming') {
            initGamingTheme();
        }
    }, 500);
    
    // Reinitialize on window resize
    $(window).on('resize', function() {
        if (body.attr('data-theme') === 'matrix') {
            initMatrixRain();
        }
    });
    
    // ===== SMOOTH SCROLL =====
    $('#scrollToProjects').on('click', function() {
        $('html, body').animate({
            scrollTop: $('.projects').offset().top - 80
        }, 1000, 'swing');
    });
    
    // Smooth scroll for all anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = $('#scrollTop');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            scrollTopBtn.addClass('show');
        } else {
            scrollTopBtn.removeClass('show');
        }
    });
    
    scrollTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    
    // ===== TYPING EFFECT =====
    const typingTexts = [
        'React Native Developer',
        'Full-Stack Engineer',
        'Python Enthusiast',
        'Problem Solver',
        'Mobile App Developer',
        'UI/UX Designer'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = $('.typing-effect');
    
    function typeEffect() {
        if (!typingElement.length) return;
        
        const currentText = typingTexts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            typingElement.text(currentText.substring(0, charIndex));
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex >= 0) {
            typingElement.text(currentText.substring(0, charIndex));
            charIndex--;
            setTimeout(typeEffect, 50);
        } else if (charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2000);
        } else if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
        }
    }
    
    setTimeout(typeEffect, 1500);
    
    // ===== SCROLL ANIMATIONS (AOS) =====
    function checkScroll() {
        $('[data-aos]').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < viewportBottom - 100) {
                $(this).addClass('aos-animate');
            }
        });
    }
    
    $(window).on('scroll', checkScroll);
    checkScroll();
    
    // ===== PROGRESS BAR ANIMATION =====
    function animateProgressBars() {
        $('.progress-fill').each(function(index) {
            const width = $(this).data('width');
            const $this = $(this);
            
            setTimeout(() => {
                $this.css('width', width + '%');
            }, index * 200);
        });
    }
    
    $(window).on('scroll', function() {
        const skillsSection = $('.skills-showcase');
        if (skillsSection.length) {
            const skillsTop = skillsSection.offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (skillsTop < viewportBottom - 200 && !skillsSection.hasClass('animated')) {
                skillsSection.addClass('animated');
                animateProgressBars();
            }
        }
    });
    
    // ===== PROJECT CARD 3D TILT EFFECT =====
    $('.project-card').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`);
    });
    
    $('.project-card').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0)');
    });
    
    // ===== TECH STACK ICON GLOW EFFECT =====
    setInterval(() => {
        $('.tech-item').each(function(index) {
            setTimeout(() => {
                $(this).find('svg').css('filter', `drop-shadow(0 0 20px var(--accent-glow))`);
                setTimeout(() => {
                    $(this).find('svg').css('filter', '');
                }, 500);
            }, index * 300);
        });
    }, 8000);
    
    // ===== GLITCH TEXT EFFECT ON HOVER =====
    $('.glitch').on('mouseenter', function() {
        $(this).css('animation', 'glitchText 0.3s infinite');
    });
    
    $('.glitch').on('mouseleave', function() {
        $(this).css('animation', 'glitchText 3s infinite');
    });
    
    // ===== TERMINAL CURSOR ANIMATION =====
    setInterval(() => {
        $('.typing-cursor').fadeToggle(500);
    }, 1000);
    
    // ===== PAGE LOAD ANIMATION =====
    $('body').css('opacity', '0');
    setTimeout(() => {
        $('body').css({
            'opacity': '1',
            'transition': 'opacity 0.8s ease'
        });
    }, 100);
    
    // ===== CONSOLE ART =====
    console.log(`
%c
    ╔═══════════════════════════════════════╗
    ║    🚀 ABHAY SHARMA'S PORTFOLIO 🚀    ║
    ║    React Native Developer             ║
    ║    3 Themes: Matrix | Anime | Gaming  ║
    ╚═══════════════════════════════════════╝
%cTip: Click sakura petals in Anime theme!
%cTip: Collect coins in Gaming theme!
    `,
    'color: #00ff41; font-family: monospace; font-size: 12px; font-weight: bold;',
    'color: #ff6ec7; font-family: monospace; font-size: 10px;',
    'color: #00d9ff; font-family: monospace; font-size: 10px;'
    );
    
    // ===== NAVBAR SCROLL EFFECT =====
    $(window).on('scroll', function() {
        const currentScroll = $(this).scrollTop();
        
        if (currentScroll > 100) {
            $('.navbar').css({
                'background': 'var(--card-bg)',
                'backdrop-filter': 'blur(20px)',
                'box-shadow': '0 4px 30px var(--shadow-color)'
            });
        } else {
            $('.navbar').css({
                'box-shadow': '0 4px 20px var(--shadow-color)'
            });
        }
    });
});

// ===== VANILLA JS FOR CRITICAL PERFORMANCE =====
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.visibility = 'visible';
});

window.addEventListener('load', function() {
    console.log('%c✅ All resources loaded!', 'color: #00ff41; font-weight: bold;');
});
