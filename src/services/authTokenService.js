var storage = window.localStorage;

var authTokenService = {
    setToken:function(token){
        this.catchedToken = token;
        storage.setItem('userToken',token);
    },
    getToken:function(){
        if(!this.catchedToken){
            this.catchedToken = storage.getItem('userToken');
        }

        return this.catchedToken;
    },
    isAuthenticated:function(){
        return !!this.getToken();
    },
    setUser:function(user){
        storage.setItem('user',JSON.stringify(user));
    },
    getUser:function(){
        var userstr = storage.getItem('user');
        if(userstr){
            return JSON.parse(userstr);
        }
    }
};

authTokenService.catchedToken = '';

export default authTokenService;