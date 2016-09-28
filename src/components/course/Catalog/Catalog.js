import html from './Catalog.html';

import modulehtml from './Module.html';
import learningunithtml from './LearningUnit.html';
import _ from 'lodash';
import './Catalog.scss';

import toReadable from '../../../services/readableInterval.js';


function Catalog(dom) {
    this.dom = $(html);
    dom.append(this.dom);
}

//这个方法不允许参数为空
Catalog.prototype.update = function (courseid, userid) {
    var course = svcs.courseService.getCourse(courseid);

    var catalog = course.catalog;
    var record = course.record;

    var allMembers = _.sortBy(_.union(course.members, course.students), [{ role: -1 }, { id: 1 }]);

    $('.module-ul').html('');
    $('.user-fast-info').html('');

    var user = _.find(allMembers, mb => mb.id === userid);
    if (user) {
        $('.user-fast-info').html(`${user.name}(${user.id})在此课堂的总学习时长:${toReadable(record.Total)}`);
    }

    _.sortBy(_.filter(catalog, md => !md.hide), ['topicType', 'order']).forEach(function (md) {
        var html = modulehtml;
        html = html.replace('__NAME', md.title);

        var mddom = $(html);

        $('.module-ul').append(mddom);

        _.filter(md.moduleList, lu => !lu.hide).forEach(function (lu) {
            var html = learningunithtml;
            html = html.replace('__NAME', lu.title);

            var total = record.LearningUnits[lu.id];
            if (total) {
                html = html.replace('__DURATION', toReadable(total));
            } else {
                html = html.replace('__DURATION', '');
            }
            var dom = $(html);
            if (total) dom.find('div').attr({ visited: true });
            mddom.find('.learning-unit-ul').append(dom);
        });
    });
};

export default Catalog;