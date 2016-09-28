import html from './StudentList.html';
import studenthtml from './Student.html';
import './Student.scss';

import toReadable from '../../../services/readableInterval.js';


function StudentList(dom) {
    this.dom = $(html);
    dom.append(this.dom);
}

StudentList.prototype.update = function (courseid) {
    var course = svcs.courseService.getCourse(courseid);
    var students = course.students;

    $('#student_ul').html('');

    var allMembers = _.sortBy(_.union(course.members, course.students), [{ role: -1 }, { classcode: 1 }, { id: 1 }]);

    allMembers.forEach(function (stu) {
        var shtml = studenthtml;
        shtml = shtml.replace('__USERNAME', stu.name);
        shtml = shtml.replace('__REALNAME', stu.id);
        shtml = shtml.replace('__CLASS', (stu.classcode ? ('[' + stu.classcode + ']') : ''));
        shtml = shtml.replace('__TOTAL', (course.overview.Users[stu.id]?toReadable(course.overview.Users[stu.id]) : ''));

        var dom = $(shtml);

        dom.click(function () {
            Router.navigate(`/course/${courseid}/${stu.id}`);
            $('#user-detail').get(0).scrollIntoView();
        });

        $('#student_ul').append(dom);
    });
};

export default StudentList;