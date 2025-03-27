document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const moreInfoButton = document.getElementById('moreInfoButton');
  const infoContainer = document.getElementById('infoContainer');
  const infoItems = document.querySelectorAll('.info-item');
  let currentIndex = 0;
  let isInfoVisible = false;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.toggle('hidden', index !== currentIndex);
      item.classList.toggle('block', index === currentIndex);
    });
    if (isInfoVisible) {
      updateInfo();
    }
  }

  function updateInfo() {
    infoItems.forEach((item, index) => {
      item.classList.toggle('hidden', index !== currentIndex);
      item.classList.toggle('block', index === currentIndex);
    });
  }

  prevButton.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    updateCarousel();
  });

  moreInfoButton.addEventListener('click', () => {
    isInfoVisible = !isInfoVisible;
    infoContainer.classList.toggle('hidden', !isInfoVisible);
    infoContainer.classList.toggle('block', isInfoVisible);
    if (isInfoVisible) {
      updateInfo();
    }
  });

  updateCarousel();
});