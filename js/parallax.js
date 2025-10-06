document.addEventListener('DOMContentLoaded', function() {
    const parallaxWrapper = document.querySelector('.parallax-wrapper');
    const parallaxBg = document.querySelector('.parallax-bg');
    const sideImages = document.querySelectorAll('.side-image');
    
    let scrollTimeout;
    let isScrolling = false;
    
    const growthMethod = 'combined';
    
    function adjustBackgroundHeight() {
        // Calcular la altura del CONTENIDO VISIBLE solamente
        const contentElements = document.querySelectorAll('.content, .extra-content, .content-background');
        let totalContentHeight = 0;
        
        contentElements.forEach(element => {
            totalContentHeight += element.offsetHeight;
        });
        
        // ⭐ SOLUCIÓN: Usar solo la altura del contenido, sin viewport extra
        // parallaxBg.style.height = totalContentHeight + 'px';
        // parallaxWrapper.style.height = totalContentHeight + 'px';
    }
    
    function activateSideImages() {
        setTimeout(() => {
            sideImages.forEach(img => {
                img.classList.add('active');
            });
            
            setTimeout(startGrowingAnimation, 1000);
        }, 500);
    }
    
    function startGrowingAnimation() {
        sideImages.forEach(img => {
            setInterval(() => {
                if (!isScrolling) {
                    img.classList.add('growing', growthMethod);
                } else {
                    img.classList.remove('growing', 'scale', 'width', 'move', 'blur');
                }
            }, 3000);
        });
    }
    
    function handleScroll() {
        const scrolled = window.pageYOffset;
        totalContentHeight = `translateY(${scrolled * 0.5}px)`;
        
        isScrolling = true;
        
        sideImages.forEach(img => {
            img.classList.remove('growing', 'scale', 'width', 'move', 'blur');
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1500);
    }
    
    // ⭐ ESPERAR a que todas las imágenes carguen
    window.addEventListener('load', function() {
        adjustBackgroundHeight();
        activateSideImages();
        
        window.addEventListener('resize', adjustBackgroundHeight);
        window.addEventListener('scroll', handleScroll);
    });
    
    // También ajustar después de un tiempo por si hay carga diferida
    setTimeout(adjustBackgroundHeight, 1000);
});
