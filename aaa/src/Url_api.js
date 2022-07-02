const api = (props) => {

    let path = "http://127.0.0.1:9000/";
    switch(props){
       case 'login' : return path+"auth/login";
        default : return "";
    }
}


export default api;

