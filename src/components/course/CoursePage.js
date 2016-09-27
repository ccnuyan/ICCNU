import html from './CoursePage.html';
import StudentList from './StudentList/StudentList.js';
import Catalog from './Catalog/Catalog.js';


function CoursePage(dom) {
    var courseDom = $(html);
    this.dom = courseDom;
    this.dom.css('display', 'none');

    dom.append(this.dom);
    this.catalog = new Catalog($('#catalog'));
    this.studentList = new StudentList($('#student_list'));
}


CoursePage.prototype.update = function (args) {
    if (args.length === 1) {
        args.user = svcs.authTokenService.getUser().username;
        this.getCourseInfo(args[0], args.user);
    }
    if (args.length === 2) {
        this.getCourseInfo(args[0], args[1]);
    }
};

CoursePage.prototype.getCourseInfo = function (courseid, userid) {
    
    var token = svcs.authTokenService.getToken();
    if (!token)
        return;
    var options = {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${token}`,
        }
    };

    var course = svcs.courseService.getCourse(courseid);

    var promises = [];
    promises.push(fetch(hosts.ykt + `/MOOC/Progress/GetOne?courseid=${courseid}&studentid=${userid}&appid=Client.MoocApp&termcode=${TERM_CODE}`, options)
        .then(function (response) {
            return response.json();
        }));

    if (!course || !course.initialized) {
        promises.push(fetch(hosts.ykt + `/MOOC/Course/Detail?courseid=${courseid}`, options)
            .then(function (response) {
                return response.json();
            }));
        promises.push(fetch(hosts.ykt + `/MOOC/CourseMember/GetCourseStudents?courseid=${courseid}`, options)
            .then(function (response) {
                return response.json();
            }));
        promises.push(fetch(hosts.ykt + `/MOOC/CourseMember/GetAll?courseid=${courseid}`, options)
            .then(function (response) {
                return response.json();
            }));
        promises.push(fetch(hosts.ykt + `/MOOC/Course/Catalog?courseid=${courseid}`, options)
            .then(function (response) {
                return response.json();
            }));
    }

    Promise.all(promises)
        .then(function (arr) {
            if (!course || !course.initialized) {
                svcs.courseService.setCourse({
                    id: arr[1].id,
                    detail: arr[1],
                    students: arr[2],
                    members: arr[3],
                    catalog: arr[4],
                    initialized: true
                });
            }

            svcs.courseService.setCourse({
                record: arr[0]
            });

            $('#course_detail_title').html(svcs.courseService.getCourse(courseid).detail.title);

            this.studentList.update(courseid);
            this.catalog.update(courseid);
        }.bind(this));
};

export default CoursePage;