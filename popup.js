// Add save button to menubar
// Hide sidebar on sub page
// Fix styles for comments pages
// Hide username?
// Make toggle button
// If in multisubs -> highlight sub links

$(document).ready(function() {
	applySidebarStylesIfNecessary();

	hideUnusedMenuItems();
	addSaveButtonToMenuBar();
    addToggleButton();
});

let sidebarHiddenToggled = false;

function applySidebarStylesIfNecessary() {
	chrome.storage.local.get('hideSidebar', function(data) {
		if (data.hideSidebar === true) {
			$('body').toggleClass('hide-sidebar');
			sidebarHiddenToggled = true;
		}
	});
}

function hideUnusedMenuItems() {
	const LIST_OF_ITEMS_TO_HIDE = ['rising', 'controversial', 'gilded', 'wiki', 'promoted', ''];
	const parentContainer = $('ul.tabmenu')[0];
	const menuItemList = $('ul.tabmenu li');
	
	for (let i = 0; i < menuItemList.length; i++) {
		const curItem = menuItemList[i];
		if (LIST_OF_ITEMS_TO_HIDE.indexOf(curItem.textContent.trim()) !== -1) {
			parentContainer.removeChild(curItem);
		}
	}
}

function addSaveButtonToMenuBar() {
	const parentContainer = $('ul.tabmenu')[0];
	const saveButton = document.createElement('li');
	const saveButtonLink = document.createElement('a');
	saveButtonLink.classList.add('choice');
	saveButtonLink.textContent = 'saved';
	saveButtonLink.setAttribute('href', '/user/' + $('span.user a').get(0).textContent + '/saved');
	saveButton.appendChild(saveButtonLink);

	const newMenuItemList = $('ul.tabmenu li');
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
	const toggleButton = document.createElement('a');
	toggleButton.textContent = 'toggle sidebar';
	toggleButton.id = 'toggle-hide-show-button';
	const buttonContainer = $('#header-bottom-right');
	buttonContainer.prepend(toggleButton);

    $('#toggle-hide-show-button').click(function() {
    	chrome.storage.local.set({hideSidebar: !sidebarHiddenToggled}, function(data) {
    		$('body').toggleClass('hide-sidebar');
    	});
    });
}


