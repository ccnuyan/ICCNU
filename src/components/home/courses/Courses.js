import html from './Courses.html';
import coursehtml from './Course.html';
import './Courses.scss';

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

Courses.prototype.fill = function (courses) {
    $('#my-courses').html('');

    courses.forEach(function (course) {
        var html = coursehtml;
        html = html.replace('__NAME', course.title);
        html = html.replace('__TEACHER', course.chiefTeacherName);

        var dom = $(html);

        if (course.iconUrl) {
            dom.find('img').attr('src', hosts.file + course.iconUrl.replace('/v1/AUTH_system/dev_test/', ''))
        } else {
            dom.find('.img-container').html('<div class="icon-image dead-center"></div>');
            dom.find('img').css('display', 'none');
        }

        var courseDom = dom;

        $(courseDom).click(function () {
            if (!svcs.courseService.getCourse(course.id)) {
                svcs.courseService.updateCourse({
                    id: course.id,
                    snapshot: course
                });
            };
            Router.navigate(`/course/${course.id}`, course);

            var userid = svcs.authTokenService.getUser().UserName;
            var options = {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    Source: userid,
                    Target: userid,
                    CourseId: courseid
                })
            };
            fetch(hosts.hit + `/hit`, options);
        });

        $('#my-courses').append(courseDom);

    });
};

export default Courses;