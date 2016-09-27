import html from './Header.html';

function Header(dom){
    dom.replaceWith(html);

    $('#link-logo').click(function(event){
        Router.navigate('/home');
        event.preventDefault();
    });

    $('#link-home').click(function(event){
        Router.navigate('/home');
        event.preventDefault();
    });

    $('#link-friend').click(function(event){
        Router.navigate('/friend');
        event.preventDefault();
    });

    $('#link-about').click(function(event){
        Router.navigate('/about');
        event.preventDefault();
    });
}

export default Header;