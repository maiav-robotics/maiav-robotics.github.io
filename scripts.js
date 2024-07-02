let scene, camera, renderer, stars, starGeo;


function init() {
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set up the camera with perspective view
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Create the renderer and attach it to the document
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    // Create a geometry to hold the star vertices
    starGeo = new THREE.BufferGeometry();
    const starVertices = [];

    // Increase the number of stars to 10000 for higher density
    for (let i = 0; i < 10000; i++) {
        starVertices.push(Math.random() * 2000 - 1000);
        starVertices.push(Math.random() * 2000 - 1000);
        starVertices.push(Math.random() * 2000 - 1000);
    }

    // Add the star vertices to the geometry
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    // Load the star texture
    const sprite = new THREE.TextureLoader().load('star.png');
    const starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 6,
        map: sprite,
        transparent: true
    });

    // Create a Points object to hold the stars and add it to the scene
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Add a window resize event listener
    window.addEventListener('resize', onWindowResize, false);

    // Add smooth scrolling event listeners
    addSmoothScrolling();

    // Start the animation loop
    animate();
}

function onWindowResize() {
    // Adjust the camera aspect ratio and renderer size when the window is resized
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    // Update the star positions to create the animation effect
    const positions = starGeo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        // Move the star along the y-axis
        positions[i + 1] -= 0.3;  // Adjust this value to change the speed

        // If the star goes below the screen, reset its position to the top
        if (positions[i + 1] < -1000) {
            positions[i + 1] = 1000;
        }
    }

    // Indicate that the position attribute needs to be updated
    starGeo.attributes.position.needsUpdate = true;

    // Rotate the star field
    stars.rotation.y += 0.002;

    // Render the scene
    renderer.render(scene, camera);

    // Request the next frame
    requestAnimationFrame(animate);
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('nav ul li a');

    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize the scene
init();
