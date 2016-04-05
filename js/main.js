var btnToggle = document.querySelector('.main-nav__toggle');
var mobileNav = document.querySelector('.main-nav');
btnToggle.addEventListener('click', function(event) {
  event.preventDefault();
  btnToggle.classList.toggle('main-nav__toggle--closed');
  btnToggle.classList.toggle('main-nav__toggle--opened');
  mobileNav.classList.toggle('main-nav--opened');
  mobileNav.classList.toggle('main-nav--closed');
});
