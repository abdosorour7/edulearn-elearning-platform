// Slider Functionality
        let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let slides = document.getElementsByClassName("slide");
            let dots = document.getElementsByClassName("slider-controls")[0].getElementsByTagName("button");

            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            // Move slider
            document.querySelector('.slider').style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;

            // Update active dot
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            dots[slideIndex - 1].classList.add("active");
        }

        // Auto slide every 6 seconds
        setInterval(() => plusSlides(1), 6000);

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Category filtering
        function filterCourses(category) {
            const categories = document.querySelectorAll('.category');
            const courses = document.querySelectorAll('.course-card');

            // Update active category
            categories.forEach(cat => cat.classList.remove('active'));
            event.target.classList.add('active');

            // Filter courses
            courses.forEach(course => {
                if (category === 'all' || course.dataset.category === category) {
                    course.style.display = 'block';
                    course.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    course.style.display = 'none';
                }
            });
        }

        // Newsletter form submission
        document.getElementById('newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Simple email validation
            if (email && email.includes('@')) {
                alert('Thank you for subscribing to our newsletter! We\'ll keep you updated with the latest courses and offers.');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });

        // Back to Top Button
        window.addEventListener('scroll', function() {
            const button = document.querySelector('.back-to-top');
            if (window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Simple course card animations on scroll
        const courseObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.course-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            courseObserver.observe(card);
        });

        // Feature cards animation on scroll
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        console.log('🎓 EduLearn loaded successfully! Welcome to your learning journey!');
