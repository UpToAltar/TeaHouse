const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const menuItems = $$('.body__menu-nav-link')
const menuLists = $$('.body__menu-list')

menuItems.forEach(
    (menuItem, index) => {
        const menuList = menuLists[index]
        menuItem.onclick = () =>{
            $('.body__menu-nav-link.active').classList.remove('active')
            $('.body__menu-list.active').classList.remove('active')


            menuItem.classList.add('active')
            menuList.classList.add('active')
            
        }
    }
)