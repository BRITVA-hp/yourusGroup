document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger'),
          menu = document.querySelector('.header__menu')

    burger.addEventListener('click', () => {
        burger.classList.toggle('header__burger--active')
        if (burger.classList.contains('header__burger--active')) {
            menu.style.maxHeight = menu.scrollHeight + 'px'
        } else {
            menu.style.maxHeight = 0
        }
    })
})