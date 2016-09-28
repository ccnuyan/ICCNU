import _ from 'lodash';

var courseService = {
    updateCourse: function (course) {
        if (!this.courses[course.id]) {
            this.courses[course.id] = {};
        }
        _.assign(this.courses[course.id], course);
    },
    getCourse: function (id) {
        return this.courses[id];
    },
};

courseService.courses = {};

export default courseService;