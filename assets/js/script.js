// Element toggle function
const elementToggleFunc = function (elem) {
	elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
	elementToggleFunc(sidebar);
});

// References variables
const referencesItem = document.querySelectorAll("[data-references-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const referencesModalFunc = function () {
	modalContainer.classList.toggle("active");
	overlay.classList.toggle("active");
};

// Add click event to all modal items
for (let i = 0; i < referencesItem.length; i++) {
	referencesItem[i].addEventListener("click", function () {
		modalImg.src = this.querySelector("[data-references-avatar]").src;
		modalImg.alt = this.querySelector("[data-references-avatar]").alt;
		modalTitle.innerHTML = this.querySelector("[data-references-title]").innerHTML;
		modalText.innerHTML = this.querySelector("[data-references-text]").innerHTML;

		referencesModalFunc();
	});
}

// Add click event to modal close button
// ModalCloseBtn.addEventListener("click", referencesModalFunc);
// Overlay.addEventListener("click", referencesModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
	elementToggleFunc(this);
});

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener("click", function () {
		let selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);
	});
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
	for (let i = 0; i < filterItems.length; i++) {
		if (selectedValue === "All") {
			filterItems[i].classList.add("active");
		} else if (selectedValue === filterItems[i].dataset.category) {
			filterItems[i].classList.add("active");
		} else {
			filterItems[i].classList.remove("active");
		}
	}
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener("click", function () {
		let selectedValue = this.innerText;
		selectValue.innerText = this.innerText;
		filterFunc(selectedValue);

		lastClickedBtn.classList.remove("active");
		this.classList.add("active");
		lastClickedBtn = this;
	});
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", function () {
		// Check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}
	});
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	// Console.log(i);
	// Console.log(navigationLinks);
	// Console.log(pages.length);
	navigationLinks[i].addEventListener("click", function () {
		for (let i = 0; i < pages.length; i++) {
			// Console.log(pages);
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}
	});
}
