import './main.scss';
import './components/student.scss';
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

    window.svcs = {
        authTokenService,
        courseService,
    };

    var pages = {
        home: (new Home($('#content'))),
        coursePage: (new CoursePage($('#content'))),
        friendPage: (new FriendPage($('#content')))
    };

    Router
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
        // .add(/products\/(.*)\/edit\/(.*)/, function () {
        //     console.log('products', arguments);
        // })
        .add(function () {
            console.log('default');
            Router.navigate('/home');
        })
        .check(window.location.pathname)
        .config({ mode: 'history' })
        .listen();

    new Header($('#header'));
    new Footer($('#footer'));
    new Home($('#content'));
} ());
