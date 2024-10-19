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

//lights
    function toggleLights() {
        var lightOn = document.querySelector('.lighton');
        var lightOff = document.querySelector('.lightoff');
        var toggleOn = document.querySelector('#toggleOn');
        var toggleOff = document.querySelector('#toggleOff');
        lightOn.classList.toggle('hidden');
        lightOff.classList.toggle('visible');
    
        if (!lightOn.classList.contains('hidden')) {
            lightOn.style.opacity = 1;
            lightOff.style.opacity = 0;
            toggleOff.style.opacity = 1;
            toggleOn.style.opacity = 0;
        } else {
            lightOn.style.opacity = 0;
            lightOff.style.opacity = .6;
            toggleOn.style.opacity = 1;
            toggleOff.style.opacity = 0;
        }
    }
    document.querySelector('#toggleOn').addEventListener('click', toggleLights);
    document.querySelector('#toggleOff').addEventListener('click', toggleLights);
    
//css light switch
document.querySelectorAll('.light-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
});
