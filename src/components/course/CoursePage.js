import html from './CoursePage.html';
import StudentList from './StudentList/StudentList.js';
import WeekChart from './WeekChart/WeekChart.js';
import Catalog from './Catalog/Catalog.js';
import './CoursePage.scss';

function CoursePage(dom) {
    var courseDom = $(html);
    this.dom = courseDom;
    this.dom.css('display', 'none');

    dom.append(this.dom);
    this.weekChart = new WeekChart($('#week_chart'));
    this.catalog = new Catalog($('#catalog'));
    this.studentList = new StudentList($('#student_list'));
    
}

//args可能有一个或者两个参数
CoursePage.prototype.update = function (args) {
    if (args.length === 1) {
        var userid = svcs.authTokenService.getUser().UserName;
        this.getCourseInfo(args[0], userid);
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
    promises.push(fetch(hosts.stats + `/user?courseid=${courseid}&userid=${userid}&appid=Client.MoocApp`, options)
        .then(function (response) {
            return response.json();
        }));
    promises.push(fetch(hosts.stats + `/week?courseid=${courseid}&userid=${userid}&appid=Client.MoocApp`, options)
        .then(function (response) {
            return response.json();
        }));
    promises.push(fetch(hosts.stats + `/course?courseid=${courseid}&appid=Client.MoocApp`, options)
        .then(function (response) {
            return response.json();
        }));

    if (!course || !course.initialized) {
        promises.push(fetch(hosts.ykt + `/MOOC/Course/Detail?courseid=${courseid}`, options)
            .then(function (response) {
                return response.json();
            }));
        promises.push(fetch(hosts.ykt + `/MOOC/CourseMember/GetAll?courseid=${courseid}`, options)
            .then(function (response) {
                return response.json();
            }));
        promises.push(fetch(hosts.ykt + `/MOOC/CourseMember/GetCourseStudents?courseid=${courseid}`, options)
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
                svcs.courseService.updateCourse({
                    id: arr[3].id,
                    detail: arr[3],
                    members: arr[4],
                    students: arr[5],
                    catalog: arr[6],
                    initialized: true
                });
            }

            svcs.courseService.updateCourse({
                id: courseid,
                record: arr[0],
                trend: arr[1],
                overview: arr[2]
            });

            $('#course_detail_title').html(svcs.courseService.getCourse(courseid).detail.title);

            this.studentList.update(courseid, userid);
            this.catalog.update(courseid, userid);
            this.weekChart.update(courseid);
        }.bind(this));
};

export default CoursePage;