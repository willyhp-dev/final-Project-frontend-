import axios from "axios";
import {searchPelanggan, searchTransaksi,ProductApi, HitungApi, SaveTransaksi} from '../Api/index';

export const srcPelanggan = (pelanggan) =>{
    return (dispatch, getState) =>{
        axios.post(searchPelanggan, pelanggan)
        .then((result)=>{
            dispatch({
                type: "SEARCH_PELANGGAN",
                result,
            });
        })
        .catch((error) => alert(error.response.data.responseData.error));
    }
}
export const srcTransaksi = (transaksi)=>{
    return (dispatch, getState) =>{
        axios.post(searchTransaksi, transaksi)
        .then((result) =>{
            dispatch({
                type :"SEARCH_TRANSAKSI",
                result,
            })
            
        })
        .catch((error) => alert(error.response.data.responseData.Error));
    }
}

export const srcProduct = (productid) =>{
    return(dispatch, getState) =>{
        axios.post(ProductApi,productid)
        .then((result) =>{
            dispatch({
                type:"SEARCH_PRODUCT",
                result,
            })
      
        })
        .catch(error => alert(error.response.data.responseData.Error));
    }
}

export const hitungTransaksi = (transaksi) =>{
    return(dispatch, getState) =>{
        axios.post(HitungApi, transaksi)
        .then((result) =>{
            dispatch({
                type:"HITUNG_TRANSAKSI",
                result
            })
            console.log(result);
        }).catch((error) => alert(error.response.data.responseData.Error));
    }
}

export const transaksiSave = (transaksi) =>{
    return (dispatch, getState) =>{
        axios.post(SaveTransaksi, transaksi)
        .then((result) => {
            dispatch({
                type:"SAVE_TRANSAKSI",
                result
            })
        }).catch(error => alert(error.response.data.responseData.Error));
    }
}
