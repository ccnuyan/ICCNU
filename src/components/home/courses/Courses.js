import html from './Courses.html';
import coursehtml from './Course.html';
import './Style.scss';

function Courses(dom) {
    dom.html('');
    dom.html(html);

    this.getCourses();

    
}

Courses.prototype.getCourses = function () {
    var token = svcs.authTokenService.getToken();

    fetch(hosts.ykt + `/MOOC/CourseCenter/MyCourses?termcode=${TERM_CODE}`, {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${token}`,
        }
    })
        .then(function (response) {
            return response.json();
        }.bind(this))
        .then(function (json) {
            this.fill(json);
        }.bind(this));
};

Courses.prototype.fill = function(courses){
    $('#my-courses').html('');

    courses.forEach(function(course){
        var html = coursehtml;
        html = html.replace('__NAME',course.title);
        html = html.replace('__TEACHER',course.chiefTeacherName);
        
        var courseDom = $(html);

        $(courseDom).click(function(){
            if(!svcs.courseService.getCourse(course.id)){
                svcs.courseService.setCourse(course);
            };
            Router.navigate(`/course/${course.id}`,course);
        });

        $('#my-courses').append(courseDom);

    });
};

export default Courses;