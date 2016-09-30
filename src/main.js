import './main.scss';
import './icomoon/style.css';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Home from './components/home/Home.js';
import CoursePage from './components/course/CoursePage.js';
import FriendPage from './components/friend/FriendPage.js';
import authTokenService from './services/authTokenService.js';
import courseService from './services/courseService.js';

(function () {
    window.TERM_CODE = '201602';

    window.hosts = {};
    window.hosts.ykt_auth = 'http://moocoauth.starc.com.cn:8080/oauth/token';
    window.hosts.ykt = 'http://moocoauth.starc.com.cn:8080/ykt';
    window.hosts.stats = 'http://moocoauth.starc.com.cn:8080/stats';
    // window.hosts.stats = 'http://localhost:3000';
    window.hosts.hit = 'http://moocoauth.starc.com.cn:8080/network';
    // window.hosts.hit = 'http://localhost:4000';
    window.hosts.file = 'http://202.114.33.120:8066/MoocFileService/DownloadFile/'
    

    window.svcs = {
        authTokenService,
        courseService,
    };

    new Header($('#header'));
    new Footer($('#footer'));

    var pages = {
        home: (new Home($('#content'))),
        coursePage: (new CoursePage($('#content'))),
        friendPage: (new FriendPage($('#content')))
    };

    Router
        .config({ mode: 'history' })
        .add(/home/, function () {
            pages.home.dom.siblings().css('display', 'none');
            pages.home.dom.css('display', 'block');
        })
        .add(/course\/(.*)\/(.*)/, function () {
            pages.coursePage.dom.siblings().css('display', 'none');
            pages.coursePage.dom.css('display', 'block');
            pages.coursePage.update(arguments);
        })
        .add(/course\/(.*)/, function () {
            pages.coursePage.dom.siblings().css('display', 'none');
            pages.coursePage.dom.css('display', 'block');
            pages.coursePage.update(arguments);
        })
        .add(/friend/, function () {
            pages.friendPage.dom.siblings().css('display', 'none');
            pages.friendPage.dom.css('display', 'block');
        })
        .add(function () {
            Router.navigate('/home');
        })
        .check(window.location.pathname)
        .listen();

    Router.navigate('/home');
} ());
