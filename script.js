const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.main-nav');

// 手機版選單開關
menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? 'CLOSE' : 'MENU';
});

// 點選選單後，自動收起手機版選單
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'MENU';
  });
});
