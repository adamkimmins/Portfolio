//Project Overviews

const projects = document.querySelectorAll('.grid a');

projects.forEach(project => {
  project.addEventListener('mouseover', function() {
    const title = project.querySelector('.project-title');
    const overview = project.querySelector('.overview');

    if (title) title.classList.add('active');
    if (overview) overview.classList.add('active');
  });

  project.addEventListener('mouseout', function() {
    const title = project.querySelector('.project-title');
    const overview = project.querySelector('.overview');

    if (title) title.classList.remove('active');
    if (overview) overview.classList.remove('active');
  });
});


//scroll trigger
gsap.registerPlugin(ScrollTrigger);

// h2 from left
gsap.fromTo("h2", 
    { x: "-300%", opacity: 0 }, 
    { x: "0%", 
      opacity: 1,
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        end: "center center",
        scrub: true, 
    }
});
// intro
gsap.fromTo("#me", 
    { x: "300%", opacity: 0 },  
    { x: "0%", 
      opacity: 1,
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        end: "center center",
        scrub: true,
    }
});
gsap.fromTo(".intro1", 
    { y: 200 },  
    { y: 0, 
      
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        end: "center center",
        scrub: true
    }
});
gsap.fromTo(".intro p", 
    { y: 200 }, 
    { y: 0, 
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        end: "center center",
        scrub: true
    }
});
// recent projects h3
gsap.to(".grid h3", {
    y: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
        trigger: ".grid",
        start: "top center",
        end: "center center",
        scrub: true,
    }
});
// Staggered projects
gsap.utils.toArray(".project").forEach((project, i, projects) => {
    gsap.to(project, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".grid",
            start: () => `top+=${(i + 1) * 50} center`,
            end: () => `top+=${(i + 1) * 150} center`,
            scrub: true,
        }
    });
});
// Contact 
gsap.to(".contact p", {
    y: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
        trigger: ".contact",
        start: "top center",
        end: "center center",
        scrub: true,
    }
});
gsap.to(".contact h3", {
    y: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
        trigger: ".contact",
        start: "top center",
        end: "center center",
        scrub: true,
    }
});

//email

document.getElementById('emailLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('emailForm').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
  document.getElementById('emailForm').style.display = 'none';
});




  document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value
    if (email.includes("@") && name.length > 0 && message.length > 0) {
      document.getElementById('emailForm').style.display = 'none';
      sendMail();
    }
    else if (name.length === 0 ||email.length === 0|| message.length === 0) {
      alert("Form is missing input");
    }
    else {
      alert("Please enter a valid email address");
    }
  });
  
  
  //send




function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };
const serviceID = "service_4ba36g4";
const templateID = "template_gqf4at1";

emailjs.send(serviceID, templateID, params) 
.then (
    res => {
        document.getElementById("name").value= "";
        document.getElementById("email").value= "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Message Sent!")
})
.catch (err =>console.log(err));
}



