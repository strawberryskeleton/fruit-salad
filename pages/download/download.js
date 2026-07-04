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


document.querySelectorAll('.btn').forEach(button => {
  const span = button.querySelector('span');

  const updateCoordinates = (e) => {
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
  };

  button.addEventListener('mousemove', updateCoordinates);
});