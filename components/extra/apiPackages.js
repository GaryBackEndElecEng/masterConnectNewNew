
import {useState,useEffect} from 'react';
import api from '../axios/api';



const apiPackage = () => {
const packageUrl='https://newmasterconnect.herokuapp.com/api/account/getPackages/';
const packageUrl2="/account/getPackages/"
const [packages,setPackages]=useState({loaded:false,data:[]});

useEffect(()=>{
  const getPackages=async()=>{
    try {
      const res= await api.get(packageUrl2);
      const body=res.data;
      setPackages({loaded:true,data:body});
    } catch (error) {
      console.error(error.message)
    }
  }
  getPackages();
},[]);
if(packages.loaded){
  return packages.data;
}else{
  return "did not work";
}

  
}
export default apiPackage;