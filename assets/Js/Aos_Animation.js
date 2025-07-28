AOS.init();
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    // Temporarily remove the hash scroll behavior
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
        AOS.refresh(); // Re-initialize AOS after scroll
      }, 500); // Delay to let AOS animations register
    }
  }
});
