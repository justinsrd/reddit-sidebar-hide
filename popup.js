// Add save button to menubar
// Hide sidebar on sub page
// Fix styles for comments pages
// Hide username?
// Make toggle button
// If in multisubs -> highlight sub links

$(document).ready(function() {
	hideUnusedMenuItems();
	addSaveButtonToMenuBar();
	addToggleButton();
});


function hideUnusedMenuItems() {
	const LIST_OF_ITEMS_TO_HIDE = ['rising', 'controversial', 'gilded', 'wiki', 'promoted', ''];
	const parentContainer = $('ul.tabmenu')[0];
	let menuItemList = $('ul.tabmenu li');
	
	for (let i = 0; i < menuItemList.length; i++) {
		let curItem = menuItemList[i];
		if (LIST_OF_ITEMS_TO_HIDE.indexOf(curItem.textContent.trim()) !== -1) {
			parentContainer.removeChild(curItem);
		}
	}
}

function addSaveButtonToMenuBar() {
	const parentContainer = $('ul.tabmenu')[0];
	let saveButton = document.createElement('li');
	let saveButtonLink = document.createElement('a');
	saveButtonLink.classList.add('choice');
	saveButtonLink.textContent = 'saved';
	saveButtonLink.setAttribute('href', '/user/' + $('span.user a').get(0).textContent + '/saved');
	saveButton.appendChild(saveButtonLink);

	let newMenuItemList = $('ul.tabmenu li');
	let showImagesButton;
	for (let i = 0; i < newMenuItemList.length; i++) {
		if (newMenuItemList[i].textContent.trim() === 'show images') {
			showImagesButton = newMenuItemList[i];
		}
	}
	parentContainer.insertBefore(saveButton, showImagesButton);
	document.querySelector('.tabmenu').style.visibility = 'visible';
}

function addToggleButton() {
	let toggleButton = document.createElement('div');
	toggleButton.textContent = 'Hide/Show Sidebar';
	toggleButton.setAttribute('id', 'toggle-button');
	document.querySelector('#header').appendChild(toggleButton);

	$('#toggle-button').click(function() {
		$('body').toggleClass('hide-sidebar');
	});
}






