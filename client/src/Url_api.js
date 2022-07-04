const api = (props) => {

    let path = "http://127.0.0.1:9000/";
    switch(props){
       case 'login' : return path+"auth/login";
       case 'register' : return path+"auth/register";
       case 'save' : return path+"manage/save"
       case 'getCashBookByUser' : return path+"manage/getCashBookByUser"
       case 'editCashBookByUser' : return path+"manage/editCashBookByUser/"
       case 'deleteCashBook' : return path+"manage/deleteCashBook/"
        default : return path;
    }
}


export default api;
