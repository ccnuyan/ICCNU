import html from './Catalog.html';

function Catalog(dom) {
    this.dom = $(html);
    dom.append(this.dom);
}

Catalog.prototype.update = function (courseid) {
    var course = svcs.courseService.getCourse(courseid);
    var catalog = course.catalog;

    $('#catalog_ul').html('');

    // students.forEach(function (stu) {
    //     var shtml = studenthtml;
    //     shtml = shtml.replace('__USERNAME',stu.name);
    //     shtml = shtml.replace('__REALNAME',stu.id);

    //     var dom = $(shtml);

    //     $('#student_ul').append(dom);
    // });
};

export default Catalog;