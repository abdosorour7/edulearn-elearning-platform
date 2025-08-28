document.addEventListener("DOMContentLoaded", function() {
    // Ensure CourseManager is available
    if (typeof CourseManager === 'undefined') {
        console.error('CourseManager not loaded');
        alert('Error: Course management system not available');
        return;
    }

    // Initialize CourseManager if not already done
    if (typeof courseManager === 'undefined') {
        window.courseManager = new CourseManager();
    }

    const form = document.getElementById("courseForm");
    
    if (!form) {
        console.error('Course form not found');
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("courseName").value;
        const price = document.getElementById("coursePrice").value;
        const description = document.getElementById("courseDescription").value;
        const imageFile = document.getElementById("courseImage").files[0];

        

        const addCourseWithData = (courseData) => {
            try {
                const newCourse = courseManager.addCourse(courseData);
                alert(`✅ Course "${newCourse.name}" added successfully!`);
                form.reset();
                setTimeout(() => {
                    window.location.href = 'courses.html';
                }, 1000);
            } catch (error) {
                alert(error.message);
            }
        };

        // If the user selected an image file, process it
        if (imageFile) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const courseData = {
                    name: name,
                    price: price,
                    description: description,
                    image: e.target.result 
                };
                addCourseWithData(courseData);
            };
            
            reader.onerror = function(error) {
                alert('Error reading image file. The default image will be used.');
                const courseData = {
                    name: name,
                    price: price,
                    description: description
                    // Let CourseManager handle the default image
                };
                addCourseWithData(courseData);
            };
            
            reader.readAsDataURL(imageFile);

        } else {
            
            const courseData = {
                name: name,
                price: price,
                description: description
                
            };
            addCourseWithData(courseData);
        }
    });
});