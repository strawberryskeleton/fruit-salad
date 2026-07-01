const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav'); 
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu li a')

hamburger.addEventListener('click', function () {
    this.classList.toggle('close');
    nav.classList.toggle('reveal-nav')
    menu.classList.toggle('reveal-items')
})

menuItems.forEach(link => {
    let letters = link.textContent.split("")
    link.textContent = ""

    letters.forEach((letter, i) => {
        i += 1
        let span = document.createElement('span')
        let delay = i/15

        let letterOut = document.createElement('span')
        letterOut.textContent = letter
        letterOut.style.transitionDelay = `${delay}s`
        letterOut.classList.add('letter-out')
        span.append(letterOut)

        let letterIn = document.createElement('span')
        letterIn.textContent = letter
        letterIn.style.transitionDelay = `${delay}s`
        letterIn.classList.add('letter-in')
        span.append(letterIn)

        link.append(span)
    })

})



function initCarousel( options ) {
    function CustomCarousel( options ) {
        this.init( options );
        this.addListeners();
        return this;
    }

    CustomCarousel.prototype.init = function ( options ) {
        this.node        = options.node;
        this.node.slider = this;
        this.fruits      = this.node.querySelector( '.fruits' );
        this.pagTransf   = 'translate( -50%, -50% ) '; // Note the space at the end
        
        // FIX 1: Map slides and dots correctly based on your HTML structure
        this.slides      = this.fruits.children; // The '.item' elements
        this.dots        = this.fruits.querySelectorAll('.dot'); // The actual inner dots
        this.slidesN     = this.slides.length;
        this.dotsN       = this.dots.length;
        
        this.step        = -360 / this.dotsN;
        this.angle       = 0;
        this.next        = this.node.querySelector( '.next' );
        this.prev        = this.node.querySelector( '.prev' );
        this.activeN     = options.activeN || 0;
        this.prevN       = this.activeN;
        this.speed       = options.speed || 300;
        this.autoplay    = options.autoplay || false;
        this.autoplayId  = null;

        this.setSlide( this.activeN );
        this.arrangeDots();
        this.fruits.style.transitionDuration = this.speed +'ms';
        if ( this.autoplay ) this.startAutoplay();
    }

    CustomCarousel.prototype.addListeners = function () {
        var slider = this;

        if ( this.next ) {
            this.next.addEventListener( 'click', function() {
                slider.setSlide( slider.activeN + 1 );
            });
        }

        if ( this.prev ) {
            this.prev.addEventListener( 'click', function() {
                slider.setSlide( slider.activeN - 1 );
            });
        }

        for ( var i = 0; i < this.dots.length; i++ ) {      
            this.dots[i].addEventListener( 'click', function( i ) {
                return function() { slider.setSlide( i ); }
            }( i ));
        }

        if ( this.autoplay ) {
            this.node.addEventListener( 'mouseenter', function() {
                slider.stopAutoplay();
            });

            this.node.addEventListener( 'mouseleave', function() {
                slider.startAutoplay();
            });
        }
    };

    CustomCarousel.prototype.setSlide = function ( slideN ) {
        // FIX 2: Added safety checks to prevent 'undefined' crashes
        if ( this.slides[ this.activeN ] ) this.slides[ this.activeN ].classList.remove( 'active' );
        if ( this.dots[ this.activeN ] ) this.dots[ this.activeN ].classList.remove( 'active' );

        this.prevN = this.activeN;
        this.activeN = slideN;
        if ( this.activeN < 0 ) this.activeN = this.slidesN - 1;
        else if ( this.activeN >= this.slidesN ) this.activeN = 0;

        if ( this.slides[ this.activeN ] ) this.slides[ this.activeN ].classList.add( 'active' );    
        if ( this.dots[ this.activeN ] ) this.dots[ this.activeN ].classList.add( 'active' );

        this.rotate();
    };

    CustomCarousel.prototype.rotate = function () {
        if ( this.activeN < this.dotsN ) {
            this.angle += function ( dots, next, prev, step ) {
                var inc, half = dots/2;
                if( prev > dots ) prev = dots - 1;
                if( Math.abs( inc = next - prev ) <= half ) return step * inc;
                if( Math.abs( inc = next - prev + dots ) <= half ) return step * inc;
                if( Math.abs( inc = next - prev - dots ) <= half ) return step * inc;
            }( this.dotsN, this.activeN, this.prevN, this.step )

            // FIX 3: Changed 'this.pagination' to 'this.fruits' since that's what should rotate
            this.fruits.style.transform = this.pagTransf +'rotate('+ this.angle +'deg)';
        }
    };

    CustomCarousel.prototype.startAutoplay = function () {
        var slider = this;

        this.autoplayId = setInterval( function(){
            slider.setSlide( slider.activeN + 1 );
        }, this.autoplay );
    };

    CustomCarousel.prototype.stopAutoplay = function () {
        clearInterval( this.autoplayId );
    };

    CustomCarousel.prototype.arrangeDots = function () {
        // FIX 4: Rotate the parent item wrapper blocks cleanly so the numbers stand upright on layout
        for ( var i = 0; i < this.slidesN; i++ ) {
            this.slides[i].style.transform = 'rotate('+ 360/this.slidesN * i +'deg)';
        }
    };
    
    return new CustomCarousel( options );
}

const carouselEl = document.querySelector('.circle-carousel');

initCarousel({
    node: carouselEl,
    speed: parseInt(carouselEl.getAttribute('data-speed')),
    autoplay: parseInt(carouselEl.getAttribute('data-autoplay'))
});