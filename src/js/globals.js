import checkDevice from '../js/checkDevice'
import smoothScroll from "../js/smoothscroll"
import scrollMarkers from "../js/scrollMarkers"
// import menuScrollStatus from '../js/menuScrollStatus'
import smartMenu from "../js/smartMenu"
// import menuMobile from '../js/menuMobile'

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////////////////// GET BASIC /////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

function getBasic() {

	const html = document.querySelector('html');
	const body = document.querySelector('body');
	const header = document.querySelector('header');
	let winW = document.documentElement.clientWidth;
	let winH = document.documentElement.clientHeight;
	let docH = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	let headerH = header.offsetHeight;
	const device = checkDevice();

	/* Set Device on HTML tag */
	html.dataset.device = device;

	let basic = {
		html: html,
		body: body,
		winW: winW,
		winH: winH,
		docH: docH,
		device: device,
		header: header,
		headerH: headerH
	}

	return basic;

}

/* Storage Constant Device Values */
const basic = getBasic();
const html = basic.html;
const body = basic.body;
const device = basic.device;
let winH = basic.winH;
let winW = basic.winW;
let docH = basic.docH;
let header = basic.header;
let headerH = basic.headerH;

/*/////////////////////////////////////////////////////////////////////*/
/*///////////////// EJECUTAR FUNCIONES EN EVENTOS /////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

/* Ejecutar el getBasic si cambia el tamaño del navegador o rota el dispositivo */
window.addEventListener("resize", getBasic);
window.addEventListener("orientationchange", getBasic);

document.addEventListener('scroll', function () {
	scrollMarkers();
	setActiveMenuItem(menu_items, sections_scroll);
	smartMenu();
});


// document.addEventListener('DOMContentLoaded', function () {
// 	menuScrollStatus();
// });

// document.addEventListener('astro:after-swap', function () {
// 	menuScrollStatus();
// });


/*/////////////////////////////////////////////////////////////////////*/
/*//////////////////// ALERT GIRAR DISPOSITIVO ////////////////////////*/
/*/////////////////////////////////////////////////////////////////////*/

if ( device != 'desktop' ) {

	function rotateDeviceHorizontal() {
		if (window.orientation === 0 || window.orientation === 180) {
			// Bloquear la orientación vertical
			alert("Por favor, gire su dispositivo para visualizar correctamente nuestro sitio.");
		}
	}

	function rotateDeviceVertical() {
		if (window.orientation === 90 || window.orientation === -90) {
			// Bloquear la orientación horizontal
			alert("Por favor, gire su dispositivo para visualizar correctamente nuestro sitio.");
		}
	}

	if ( device == 'bigTablet' ) {

		rotateDeviceHorizontal();

		window.addEventListener("orientationchange", function () {
			rotateDeviceHorizontal();
		});

	}

	if ( device == 'mobile' && device != 'bigTablet' ) {

		rotateDeviceVertical()

		window.addEventListener("orientationchange", function () {
			rotateDeviceVertical()
		});

	}

}

if ( device == 'desktop' ) {
	smoothScroll();
}