import html from './Home.html';
import LoginPanel from './login/LoginPanel.js';
import Courses from './courses/Courses.js';


function Home(dom){
    $(window).on('user-login',function(user){
        new Courses($('#home-body'));
    });
    $(window).on('user-logout',function(user){
        $('#home-body').html('');
    });

    this.dom = $(html);

    dom.append(this.dom);
    this.dom.css('display','none');

    new LoginPanel($('#login-panel'));
}

export default Home;