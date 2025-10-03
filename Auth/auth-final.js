// Complete authentication system with admin account and dynamic button switching
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    // Initialize users array in localStorage with admin account
    if (!localStorage.getItem('users')) {
        const adminUser = {
            firstname: 'Admin',
            email: 'admin@123',
            password: 'admin@123',
            id: 1,
            role: 'admin'
        };
        localStorage.setItem('users', JSON.stringify([adminUser]));
    }

    // Signup form handling
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstname = document.getElementById('firstname-input').value;
            const email = document.getElementById('email-input').value;
            const password = document.getElementById('password-input').value;
            const repeatPassword = document.getElementById('repeat-password-input').value;
            const errorMessage = document.getElementById('error-message');
            
            let errors = [];
            
            if (!firstname) errors.push('First name is required');
            if (!email) errors.push('Email is required');
            if (!password) errors.push('Password is required');
            if (password.length < 8) errors.push('Password must have at least 8 characters');
            if (password !== repeatPassword) errors.push('Passwords do not match');
            
            if (errors.length > 0) {
                errorMessage.innerText = errors.join('. ');
                return;
            }
            
            // Save user data to localStorage
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Check if email already exists
            if (users.find(user => user.email === email)) {
                errorMessage.innerText = "Email already exists!";
                return;
            }
            
            // Add new user
            const newUser = {
                firstname: firstname,
                email: email,
                password: password,
                id: Date.now(),
                role: 'user'
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Login form handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email-input').value;
            const password = document.getElementById('login-password-input').value;
            const errorMessage = document.getElementById('login-error-message');
            
            // Check for admin login
            if (email === 'admin@123' && password === 'admin@123') {
                const adminUser = {
                    firstname: 'Admin',
                    email: 'admin@123',
                    password: 'admin@123',
                    id: 1,
                    role: 'admin'
                };
                localStorage.setItem('currentUser', JSON.stringify(adminUser));
                window.location.href = '../index.html';
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Save logged in user
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Redirect to home page
                window.location.href = '../index.html';
            } else {
                errorMessage.innerText = "Invalid email or password!";
            }
        });
    }

    // Check if user is logged in
    function checkAuth() {
        return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
    }

    // Logout function
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    }

    // Update navigation buttons based on login status
    function updateNavigationButtons() {
        const user = checkAuth();
        const buttons = document.querySelectorAll('a[href="#login"], .nav-cta');
        const addCourseBtn = document.getElementById('add-course-btn');
        
        buttons.forEach(button => {
            if (user) {
                // Change to logout button
                button.textContent = 'Logout';
                button.href = '#';
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    logout();
                });
                
                // Show Add course button for admin
                if (user.role === 'admin' && addCourseBtn) {
                    addCourseBtn.style.display = 'inline';
                }
            } else {
                // Change to signup button
                button.textContent = 'Get Started';
                button.href = 'Auth/sign up.html';
                
                // Hide Add course button when logged out
                if (addCourseBtn) {
                    addCourseBtn.style.display = 'none';
                }
            }
        });
    }

    // Run on page load
    updateNavigationButtons();
});
