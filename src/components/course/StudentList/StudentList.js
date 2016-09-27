import html from './StudentList.html';
import studenthtml from './Student.html';

function StudentList(dom) {
    this.dom = $(html);
    dom.append(this.dom);
}

StudentList.prototype.update = function (courseid) {
    var course = svcs.courseService.getCourse(courseid);
    var students = course.students;

    $('#student_ul').html('');

    students.forEach(function (stu) {
        var shtml = studenthtml;
        shtml = shtml.replace('__USERNAME',stu.name);
        shtml = shtml.replace('__REALNAME',stu.id);

        var dom = $(shtml);
        
        dom.click(function () {
            Router.navigate(`/course/${courseid}/${stu.id}`);
        });

        $('#student_ul').append(dom);
    });
};

export default StudentList;