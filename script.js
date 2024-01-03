
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
var timeout;

window.onload = function() { 
    gsap.fromTo(".animate", 
    {
        opacity: 0, 
        y: 50
    }, 
    {
        opacity: 0.6, 
        y: 0, 
        stagger:0.1,
        duration: 1.5, 
        ease: Expo.easeInOut
    });
    gsap.fromTo(".animate1", 
    {
        opacity: 0, 
        y: -10
    }, 
    {
        opacity: 1, 
        y: 0, 
        stagger:0.2,
        duration: 2, 
        ease: Expo.easeInOut
    });
}
function circleSqueeze() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;
  
    var xprev = 0;
    var yprev = 0;
  
    window.addEventListener("mousemove", function (dets) {
      clearTimeout(timeout);
  
      xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
  
      xprev = dets.clientX;
      yprev = dets.clientY;
  
      circleMouseFollower(xscale, yscale);
  
      timeout = setTimeout(function () {
        document.querySelector(
          "#minicircle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }, 100);
    });
  }
  
  function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }
  
  circleSqueeze();
  circleMouseFollower();

  document.querySelectorAll(".item").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
      gsap.to(elem.querySelector("h1"), {
        opacity:0.6,
        x:0,
        ease: Power3,
      });
    });

    elem.addEventListener("mouseenter", function (dets) {
        gsap.to(elem.querySelector("h1"), {
            opacity:0.4,
            x:30,
            ease: Power3,
        });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
