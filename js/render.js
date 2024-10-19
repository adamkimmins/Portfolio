// render content pair of lacks
const header = document.querySelector('.header');
const subheader = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.style.transform = `translateY(${scrollY * 0.02}px)`;
    subheader.style.transform = `translateY(${scrollY * 0.2}px)`;
});

// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = 'threejs-background';
document.body.appendChild(renderer.domElement);

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Stars Background
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    blending: THREE.AdditiveBlending
});

// Generating star positions
const starVertices = [];
for (let i = 0; i < 700; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    starVertices.push(x, y, z);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);




const sunLight = new THREE.PointLight(0xffffff, 3.5, 1200); // Increased intensity for more dramatic effect
sunLight.position.set(0, 7, 0);
scene.add(sunLight);

// Sun mesh with texture
const sunTextureLoader = new THREE.TextureLoader();
const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial();

sunTextureLoader.load('/images/sun.jpg', function(texture) {
    sunMaterial.map = texture;
    sunMaterial.needsUpdate = true;
});

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.copy(sunLight.position);
scene.add(sunMesh);

// Earth mesh with texture
const textureLoader = new THREE.TextureLoader();
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
// initial  callback
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x333333, 
    shininess: 10, 
    map: null 
});


textureLoader.load('/images/bluemarble.jpg', function (texture) {
    sphereMaterial.map = texture;
    sphereMaterial.color.multiply(new THREE.Color(5, 5, 5, ));
    sphereMaterial.needsUpdate = true;
});




const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(0, 7, 0); // Position offset for layout
sphere.rotation.x = Math.PI / 4;
sphere.rotation.y = Math.PI + 16 / 5.25;

// Mouse-controlled rotation for the Earth
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', () => { isDragging = true; });
document.addEventListener('mouseup', () => { isDragging = false; });

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        sphere.rotation.y += deltaMove.x * 0.006;
        sphere.rotation.x += deltaMove.y * 0.006;
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

// Texture Selector
const textureOptions = document.querySelectorAll('.texture-option');





// heaters
const earthHeader = document.querySelector('.earth .header');
const plutoHeader = document.querySelector('.pluto .header');
const unknownHeader = document.querySelector('.unknown .header');

function updateHeaderVisibility(textureName) {
    switch(textureName) {
        case '/images/bluemarble.jpg':
            earthHeader.style.display = 'block';
            plutoHeader.style.display = 'none';
            unknownHeader.style.display = 'none';
            break;
        case '/images/pluto.jpg':
            earthHeader.style.display = 'none';
            plutoHeader.style.display = 'block';
            unknownHeader.style.display = 'none';
            break;
        case '/images/unknown.jpg':
            earthHeader.style.display = 'none';
            plutoHeader.style.display = 'none';
            unknownHeader.style.display = 'block';
            break;
        default:
            earthHeader.style.display = 'block';
            plutoHeader.style.display = 'none';
            unknownHeader.style.display = 'none';
    }
}

textureOptions[0].classList.add('selected');

updateHeaderVisibility('/images/bluemarble.jpg');


textureOptions.forEach(option => {
    option.addEventListener('click', function () {
        textureOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        const texturePath = option.getAttribute('data-texture');
        textureLoader.load(texturePath, function (texture) {
            sphere.material.map = texture;
            sphere.material.needsUpdate = true;

            updateHeaderVisibility(texturePath);
        });
    });
});

let time = 0;
const animate = function () {
    time += 0.002;
    sunLight.rotation.y += 0.001;
    sunMesh.position.copy(sunLight.position);
    if (isDragging){
        sphere.rotation.y += 0;
        time -= 0.002;
    }
    else{sphere.rotation.y += 0.01;
        sphere.rotation.x === Math.sin(time) * 1000;
        sphere.position.x = Math.sin(time) * 1000;
        sphere.position.z = Math.cos(time) * 1000;}
    
    camera.position.set(sphere.position.x, sphere.position.y, sphere.position.z + 10);
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();