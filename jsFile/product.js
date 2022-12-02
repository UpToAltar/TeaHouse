

const menuItems = document.querySelectorAll(".body__menu-nav-link");
const menuLists = document.querySelectorAll(".body__menu-list");

menuItems.forEach((menuItem, index) => {
    const menuList = menuLists[index];
    menuItem.onclick = () => {
        document.querySelector(".body__menu-nav-link.active").classList.remove("active");
        document.querySelector(".body__menu-list.active").classList.remove("active");
        menuItem.classList.add("active");
        menuList.classList.add("active");
    };
});


