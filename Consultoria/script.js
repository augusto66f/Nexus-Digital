/* ═══════════════════════════════════════════════
   NEXUS DIGITAL — script.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── CUSTOM CURSOR (desktop only) ──────────── */
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');

    if (cursor && ring && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top  = mouseY + 'px';
        });

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            requestAnimationFrame(animateRing);
        };
        animateRing();
    }

    /* ─── SCROLL REVEAL ──────────────────────────── */
    const reveals  = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObs.observe(el));

    /* ─── GLITCH EFFECT (hero title) ─────────────── */
    const title = document.querySelector('.hero-title');
    if (title) {
        let glitching = false;

        const triggerGlitch = () => {
            if (glitching) return;
            glitching = true;
            let count = 0;

            const interval = setInterval(() => {
                const x = (Math.random() - 0.5) * 6;
                const y = (Math.random() - 0.5) * 3;
                title.style.transform  = `translate(${x}px, ${y}px)`;
                title.style.textShadow = `${x * 2}px 0 #ff0044, ${-x}px 0 #00ffff`;
                count++;
                if (count > 6) {
                    clearInterval(interval);
                    title.style.transform  = '';
                    title.style.textShadow = '';
                    glitching = false;
                }
            }, 60);
        };

        setInterval(triggerGlitch, 4000);
        title.addEventListener('mouseenter', triggerGlitch);
    }

    /* ─── COUNTER ANIMATION (stats) ─────────────── */
    const animateCount = (el, target, suffix = '') => {
        const num      = parseInt(target);
        const duration = 1400;
        const start    = performance.now();

        if (isNaN(num)) { el.textContent = target; return; }

        const step = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * num) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
    };

    const statObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(n => {
                    if (n.textContent === '100%') animateCount(n, 100, '%');
                });
                statObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-bar').forEach(el => statObs.observe(el));

});