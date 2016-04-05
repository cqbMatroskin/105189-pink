var btnToggle = document.querySelector('.main-nav__toggle');
var mobileNav = document.querySelector('.main-nav');
btnToggle.addEventListener('click', function(event) {
  event.preventDefault();
  btnToggle.classList.toggle('main-nav__toggle--closed');
  btnToggle.classList.toggle('main-nav__toggle--opened');
  mobileNav.classList.toggle('main-nav--opened');
  mobileNav.classList.toggle('main-nav--closed');
});

function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(59.936278, 30.320935),
    disableDefaultUI: true,
    scrollwheel: false,
  }

  var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
  var image = "img/icon-map-marker.svg";
  var myLatLng = new google.maps.LatLng(59.936278, 30.320935);

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
