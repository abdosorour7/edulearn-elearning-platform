// counter js will run once the entire HTML document is loaded.
document.addEventListener("DOMContentLoaded", () => {
    
    // The function that animates the numbers
    const animateCountUp = (element) => {
        const goal = parseInt(element.dataset.goal);
        const duration = 2000; 
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * goal);
            
            
            element.textContent = currentValue.toLocaleString();
            
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                
                element.textContent = goal.toLocaleString() + '+';
            }
        };
        
        
        window.requestAnimationFrame(step);
    };

    
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
               
                    animateCountUp(counter);
                });
                
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.8 
    });

    
    observer.observe(statsSection);
});


// interactive map js


const map = L.map('student-map').setView([20, 0], 2); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


const studentLocations = [
    { lat: 51.5072, lon: -0.1276, city: "London, UK" },
    { lat: 40.7128, lon: -74.0060, city: "New York, USA" },
    { lat: 35.6895, lon: 139.6917, city: "Tokyo, Japan" },
    { lat: -33.8688, lon: 151.2093, city: "Sydney, Australia" },
    { lat: 30.0444, lon: 31.2357, city: "Cairo, Egypt" },
    { lat: 19.0760, lon: 72.8777, city: "Mumbai, India" },
    { lat: -23.5505, lon: -46.6333, city: "São Paulo, Brazil" },
    { lat: 55.7558, lon: 37.6173, city: "Moscow, Russia" }
];


studentLocations.forEach(location => {
    const marker = L.marker([location.lat, location.lon]).addTo(map);
    marker.bindPopup(`<b>A passionate learner from ${location.city}!</b>`);
});



const navToggle = document.querySelector('.nav-toggle');
const body = document.body;

navToggle.addEventListener('click', () => {
    body.classList.toggle('nav-open');
});