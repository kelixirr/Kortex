const steps: NodeListOf<HTMLLIElement> =
  document.querySelectorAll(".steps-menu-li");

const stepsDetails: NodeListOf<HTMLElement> =
  document.querySelectorAll(".steps-details");

const nextBtn: HTMLElement | null = document.querySelector(".next");
const slide: HTMLElement | null = document.querySelector(".slider-slide-ul");

const featureGrid: HTMLElement | null =
  document.querySelector(".features-grid");

const openMenu: HTMLElement | null = document.querySelector(".m-icon");
const closeMenu: HTMLElement | null = document.querySelector(".m-close-icon");
const mobileMenu: HTMLElement | null = document.querySelector(".m-header");

const hero: HTMLElement | null = document.querySelector(".hero");
const rocket: HTMLElement | null = document.querySelector(".rocket");

// Steps   

const handleClick = (e: Event) => {
  const clickedStep = e.target as HTMLLIElement;
  const index = Array.from(steps).indexOf(clickedStep);
  steps.forEach((el) => el.classList.remove("active"));
  stepsDetails.forEach((el) => el.classList.add("hidden"));

  clickedStep.classList.add("active");
  stepsDetails[index].classList.remove("hidden");
};

steps.forEach((step) => {
  step.addEventListener("click", handleClick);
});


// Slider 

let slideLen = parseInt(getComputedStyle(slide!).width, 10);
let direction = 1;
let counter = 0;

nextBtn?.addEventListener("click", () => {
  if (slide) {
    if(counter === 0 && direction === -1){
       direction = 1;
    }
     counter += direction;
    if(counter >= 2) {
      direction = -1;
    }
    slide.style.transform = `translateX(-${counter * slideLen}px)`;
  }
});



// Feature Div background

const handleMouseMove = (e: MouseEvent) => {
  if(!(e.target instanceof HTMLElement)) return;
  const target = e.target.closest(".feature-grid-detail") as HTMLElement;
  if(!target) return;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;
  target.style.background = `radial-gradient(circle at ${x}px ${y}px, #B38728, #000 100%)`;
};

const handleMouseLeave = (e: MouseEvent) => {
  if (!(e.target instanceof HTMLElement)) return;
  const target = e.target.closest(".feature-grid-detail") as HTMLElement;
  if (!target) return;
  
  if (
    e.relatedTarget instanceof HTMLElement &&
    target.contains(e.relatedTarget)
  )
    return;

  target.style.background = "none";
};

featureGrid?.addEventListener("mousemove", handleMouseMove);
featureGrid?.addEventListener("mouseout", handleMouseLeave);



// handling Mobile menu

openMenu?.addEventListener("click", () => {
  mobileMenu?.classList.add("show");
})

closeMenu?.addEventListener("click", () => {
   mobileMenu?.classList.remove("show");
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if(!mobileMenu?.contains(target) && target !== openMenu){
    mobileMenu?.classList.remove("show");
  }
})

// Hero rocket
rocket?.addEventListener("click", () => {
  hero?.scrollIntoView({behavior: "smooth"})
})