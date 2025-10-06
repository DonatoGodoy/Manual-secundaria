document.addEventListener('DOMContentLoaded', function() {
    const parallaxWrapper = document.querySelector('.parallax-wrapper');
    const parallaxBg = document.querySelector('.parallax-bg');
    const sideImages = document.querySelectorAll('.side-image');
    
    let scrollTimeout;
    let isScrolling = false;
    
    const growthMethod = 'combined';
    
    function adjustBackgroundHeight() {
        const content = document.querySelector('.content');
        const extraContents = document.querySelectorAll('.extra-content');
        const contentBackground = document.querySelector('.content-background');
        
        let totalContentHeight = content.offsetHeight;
        
        extraContents.forEach(extra => {
            totalContentHeight += extra.offsetHeight + 50;
        });
        
        totalContentHeight += contentBackground.offsetHeight + 50;
        
        const viewportHeight = window.innerHeight;
        const totalHeight = totalContentHeight + viewportHeight;
        
        parallaxBg.style.height = totalHeight + 'px';
        parallaxWrapper.style.height = totalHeight + 'px';
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
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        isScrolling = true;
        
        sideImages.forEach(img => {
            img.classList.remove('growing', 'scale', 'width', 'move', 'blur');
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1500);
    }
    
    adjustBackgroundHeight();
    activateSideImages();
    
    window.addEventListener('resize', adjustBackgroundHeight);
    window.addEventListener('scroll', handleScroll);
});