import formhtml from './LoginForm.html';
import userhtml from './LoginUser.html';
import './Style.scss';

function LoginPanel(dom) {
    this.dom = dom;

    var token = svcs.authTokenService.getToken();

    if (!token) {
        this.loadLoginForm();
    } else {
        this.dom.html('');
        this.dom.html('<div class=dead-center><h2>Loading</h2></div>');
        this.request2GetInfo(token);
    }

}

LoginPanel.prototype.login = function (user, token) {
    svcs.authTokenService.setToken(token);
    svcs.authTokenService.setUser(user);
    $(window).trigger('user-login', user);
};

LoginPanel.prototype.logout = function () {
    svcs.authTokenService.setToken('');
    svcs.authTokenService.setUser('');
    $(window).trigger('user-logout');
};

LoginPanel.prototype.loadLoginForm = function () {
    this.dom.html('');
    this.dom.html(formhtml);
    $('#login-submit').click(function () {
        event.preventDefault();
        this.request2Login();
    }.bind(this));
};

LoginPanel.prototype.request2Login = function () {
    var options = {
        method: 'post',
        headers: {
            'content-type': 'text/plain'
        },
        body: `username=${$('#login-username').val()}&password=${$('#login-password').val()}&scope=app&grant_type=password`
    };
    fetch(hosts.ykt_auth, options)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new error('登陆失败');
            }
        })
        .then(function (json) {
            if (!json.access_token) {
                throw new Error('no token found');
            } else {
                this.request2GetInfo(json.access_token);
            }
        }.bind(this)).catch(function (ex) {
            console.log('request2Login error');
            $('#login-password').addClass('input-error');
            $('#login-password').val('');
            $('#login-password').attr('placeholder', '密码错误，请重新输入');
            this.logout();
        }.bind(this));
};

LoginPanel.prototype.request2GetInfo = function (token) {
    fetch(hosts.ykt + '/MOOC/Me/Info', {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${token}`,
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new error('获取用户信息失败');
            }
        }.bind(this))
        .then(function (json) {
            this.login(json, token);
            this.switchToUserInfoPanel();
        }.bind(this))
        .catch(function (ex) {
            console.log(ex);
            this.logout();
            this.loadLoginForm();
        }.bind(this));
};

LoginPanel.prototype.switchToUserInfoPanel = function () {
    this.dom.html('');
    var user = svcs.authTokenService.getUser();
    var tofill = userhtml;
    tofill = tofill.replace('__NAME', user.RealName);
    tofill = tofill.replace('__NUMBER', user.UserName);

    this.dom.html(tofill);

    $('#user-logout').click(function () {
        this.logout();
        this.loadLoginForm();
    }.bind(this));
};

export default LoginPanel;