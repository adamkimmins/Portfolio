//headers section
function toggleSection(toggleHeaderId, hiddenSectionId) {
    var hiddenSection = document.getElementById(hiddenSectionId);
    var toggleHeader = document.getElementById(toggleHeaderId);
    hiddenSection.classList.toggle('show');
    toggleHeader.classList.toggle('locked');
}

document.getElementById('toggleHeader').addEventListener('click', function() {
    toggleSection('toggleHeader', 'projSec');
});

document.getElementById('toggleHeaderTwo').addEventListener('click', function() {
    toggleSection('toggleHeaderTwo', 'projSecTwo');
});

document.getElementById('code').addEventListener('click', function() {
    toggleSection('code', 'extendedCode');
});

//scroll trigger

gsap.registerPlugin(ScrollTrigger);

gsap.to("h1", {
    y: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".item",
        start: "top 40%",
        end: "top 20%",
        scrub: true,
    }
});
gsap.to("h5", {
    y: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".item",
        start: "top 40%",
        end: "top 20%",
        scrub: true,
    }
});

gsap.from(".threedwrapper h2", {
    x: 200,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".threedwrapper h2",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
        
    }
});
gsap.from(".threedwrapper p", {
    x: 200,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".threedwrapper h2",
        start: "top 70%",
        end: "top 20%",
        scrub: true,
        
    }  
});
gsap.from(".hiddenwrapper h3", {
    x: -300,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".threedwrapper h2",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
    }
});  
