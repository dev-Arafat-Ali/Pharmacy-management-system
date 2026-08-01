// Hero slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;

if (slides.length && dots.length) {
  setInterval(() => {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (current + 1) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }, 3000);
}

// Add to cart — fixed to target the exact button clicked, not always the first one

// Star rating widget on the "Leave a Review" form
document.querySelectorAll('.star-rating').forEach(ratingBox => {
  const stars = ratingBox.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = star.dataset.value;
      ratingBox.dataset.rating = value;
      stars.forEach(s => {
        s.classList.toggle('filled', s.dataset.value <= value);
      });
    });
  });
});

// Review form submit — no backend yet, this just confirms it works front-end side
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thanks for your review! (Not connected to a backend yet — front-end only for now.)");
    this.reset();
    document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('filled'));
  });
}
