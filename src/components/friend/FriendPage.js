import html from './FriendPage.html';

function FriendPage(dom) {
    var friendDom = $(html);
    this.dom = friendDom;
    this.dom.css('display','none');

    dom.append(this.dom);
}

FriendPage.prototype.init = function () {

};

FriendPage.prototype.fill = function (presentations) {

};

export default FriendPage;