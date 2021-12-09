import axios from "axios";
import { toast } from "react-toastify";
import { URL } from '../config'

export const getKeys = async (uid) => {

  try {
    const res = await axios.post(URL.GET_KEYS, {
      uid: uid,
    });
  
    console.log(res);
    toast.success(res.data, {position: 'bottom-left'});

  } catch(error) {
      console.log(error);
      toast.error('Error occured. Please try again later', {position: 'bottom-left'})
    };
}