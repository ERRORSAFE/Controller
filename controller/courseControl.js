const courseModel = require('../models/courseModel');

const createCourse = async function (req, res) {
    try {
        let course = req.body;
        let { coursecode, name, description, students } = course;

        // Check if the coursecode already exists
        let existingCourse = await courseModel.findOne({ coursecode });
        if (existingCourse) {
            return res.status(400).send({ message: "Course code already exists" });
        }

        // Create the new course
        let courseCreate = await courseModel.create(course);

        // Check if the course was successfully created
        if (courseCreate) {
            return res.status(201).send({ message: "Course created successfully", course: courseCreate });
        } else {
            return res.status(500).send({ message: "Failed to create course" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = createCourse;
