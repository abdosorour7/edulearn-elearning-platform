class CourseManager {
    constructor() {
        this.storageKey = 'edulearn_courses';
        this.defaultImage = 'Images/Photography Fundamentals.jpeg';
        this.courses = this.loadCourses();
    }

    /**
     * Load courses from localStorage
     * @returns {Array} Array of course objects
     */
    loadCourses() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : this.getDefaultCourses();
    }

    /**
     * Save courses to localStorage
     */
    saveCourses() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.courses));
    }

    /**
     * Validate course data before adding
     * @param {Object} courseData - Course information to validate
     * @returns {Object} Validation result with isValid and message
     */
    validateCourseData(courseData) {
        const { name, price, description } = courseData;
        
        // Check for empty fields
        if (!name || !price || !description) {
            return { isValid: false, message: "⚠️ Please fill in all required fields." };
        }

        // Trim and check again
        if (name.trim() === "" || price.toString().trim() === "" || description.trim() === "") {
            return { isValid: false, message: "⚠️ Please fill in all required fields." };
        }

        // Validate name pattern
        const namePattern = /^[A-Za-z0-9 ]+$/;
        if (!namePattern.test(name.trim())) {
            return { isValid: false, message: "⚠️ Course name must contain only letters and numbers." };
        }

        // Validate price
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            return { isValid: false, message: "⚠️ Price must be a valid number greater than 0." };
        }

        return { isValid: true, message: "Valid" };
    }

    /**
     * Add a new course with validation
     * @param {Object} courseData - Course information
     * @returns {Object} The added course with generated ID or validation error
     */
    addCourse(courseData) {
        // Validate data first
        const validation = this.validateCourseData(courseData);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }

        const course = {
            id: this.generateId(),
            name: courseData.name.trim(),
            price: parseFloat(courseData.price),
            description: courseData.description.trim(),
            image: courseData.image || this.defaultImage ,
            dateAdded: new Date().toISOString(),
            isActive: true
        };
        
        this.courses.push(course);
        this.saveCourses();
        return course;
    }

    /**
     * Get all courses
     * @returns {Array} All courses
     */
    getAllCourses() {
        return this.courses.filter(course => course.isActive);
    }

    /**
     * Get course by ID
     * @param {string} id - Course ID
     * @returns {Object|null} Course object or null if not found
     */
    getCourseById(id) {
        return this.courses.find(course => course.id === id) || null;
    }

    /**
     * Update existing course
     * @param {string} id - Course ID
     * @param {Object} updates - Updated course data
     * @returns {Object|null} Updated course or null if not found
     */
    updateCourse(id, updates) {
        const index = this.courses.findIndex(course => course.id === id);
        if (index !== -1) {
            this.courses[index] = { ...this.courses[index], ...updates };
            this.saveCourses();
            return this.courses[index];
        }
        return null;
    }

    /**
     * Delete course (soft delete)
     * @param {string} id - Course ID
     * @returns {boolean} True if deleted successfully
     */
    deleteCourse(id) {
        const index = this.courses.findIndex(course => course.id === id);
        if (index !== -1) {
            this.courses[index].isActive = false;
            this.saveCourses();
            return true;
        }
        return false;
    }

    /**
     * Generate unique ID for courses
     * @returns {string} Unique ID
     */
    generateId() {
        return 'course_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get default courses (initial data)
     * @returns {Array} Default courses
     */
    getDefaultCourses() {
        return [
            {
                id: 'course_1',
                name: 'Photography Fundamentals',
                price: 49.99,
                description: 'Learn the basics of photography including composition, lighting, and camera settings. Perfect for beginners starting their photography journey.',
                image: 'Images/Photography Fundamentals.jpeg',
                dateAdded: '2024-01-15T10:00:00.000Z',
                isActive: true
            },
            {
                id: 'course_2',
                name: 'Portrait Photography',
                price: 79.99,
                description: 'Master the art of capturing stunning portraits. Learn lighting techniques, posing, and post-processing for professional results.',
                image: 'Images/Photography Portrait.jpg',
                dateAdded: '2024-01-15T10:00:00.000Z',
                isActive: true
            },
            {
                id: 'course_3',
                name: 'Landscape Photography',
                price: 69.99,
                description: 'Capture the beauty of nature with landscape photography. Learn composition, filters, and techniques for breathtaking outdoor shots.',
                image: 'Images/Landscape Photography.png',
                dateAdded: '2024-01-15T10:00:00.000Z',
                isActive: true
            },
            {
                id: 'course_4',
                name: 'Street Photography',
                price: 59.99,
                description: 'Document urban life through street photography. Develop your eye for candid moments and urban storytelling.',
                image: 'Images/Street Photography.jpg',
                dateAdded: '2024-01-15T10:00:00.000Z',
                isActive: true
            },
            {
                id: 'course_5',
                name: 'Photo Editing Mastery',
                price: 89.99,
                description: 'Learn professional photo editing techniques using Lightroom and Photoshop. Transform your images from good to extraordinary.',
                image: 'Images/Photo Editing Mastery.jpg',
                dateAdded: '2024-01-15T10:00:00.000Z',
                isActive: true
            },
            {
                id: 'course_6',
                name: 'Videography Basics',
                price: 74.99,
                description: 'Expand your skills into videography. Learn video composition, editing, and storytelling for both personal and professional projects.',
                image: 'Images/Videography.jpg',
                dateAdded: '2024-01-15T10:00:00.000Z',
                isActive: true
            }
        ];
    }

    /**
     * Display courses in the course grid
     * @param {HTMLElement} container - Container element to display courses
     */
    displayCourses(container) {
        if (!container) return;

        const courses = this.getAllCourses();
        container.innerHTML = '';

        if (courses.length === 0) {
            container.innerHTML = '<p class="no-courses">No courses available at the moment.</p>';
            return;
        }

        courses.forEach(course => {
            const courseElement = this.createCourseElement(course);
            container.appendChild(courseElement);
        });
    }

    /**
     * Create HTML element for a course
     * @param {Object} course - Course data
     * @returns {HTMLElement} Course card element
     */
    createCourseElement(course) {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-item';
        courseDiv.innerHTML = `
            <div class="course-card">
                <div class="card-image-container">
                    <img src="${course.image}" alt="${course.name}" class="card-image">
                </div>
                <div class="card-content">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">${course.description}</p>
                    <div class="course-meta">
                        <span class="course-price">$${course.price.toFixed(2)}</span>
                    </div>
                    <button class="course-btn" onclick="courseManager.viewCourse('${course.id}')">Learn More</button>
                </div>
            </div>
        `;
        return courseDiv;
    }

    /**
     * Handle image upload and return image path
     * @param {File} file - Image file
     * @returns {string} Image path or default
     */
    handleImageUpload(file) {
    if (!file || file.size === 0) {
        return this.defaultImage;
    }
    
    const imageUrl = URL.createObjectURL(file);
    return imageUrl;
}

    /**
     * View course details
     * @param {string} courseId - Course ID
     */
    viewCourse(courseId) {
        const course = this.getCourseById(courseId);
        if (course) {
            // You can implement a modal or redirect to course details page
            alert(`Course: ${course.name}\nPrice: $${course.price}\nDescription: ${course.description}`);
        }
    }

    /**
     * Refresh course display on courses page
     */
    refreshCourseDisplay() {
        const container = document.querySelector('.course-grid');
        if (container) {
            this.displayCourses(container);
        }
    }

    /**
     * Clear all courses (for testing purposes)
     */
    clearAllCourses() {
        this.courses = [];
        this.saveCourses();
    }

    /**
     * Get course statistics
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const activeCourses = this.getAllCourses();
        return {
            totalCourses: activeCourses.length,
            totalValue: activeCourses.reduce((sum, course) => sum + course.price, 0),
            averagePrice: activeCourses.length > 0 ? activeCourses.reduce((sum, course) => sum + course.price, 0) / activeCourses.length : 0
        };
    }
}

// Initialize Course Manager
const courseManager = new CourseManager();

// DOM Ready Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Display courses on courses page only
    if (window.location.pathname.includes('courses.html')) {
        const courseGrid = document.querySelector('.course-grid');
        if (courseGrid) {
            courseManager.displayCourses(courseGrid);
        }
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseManager;
}