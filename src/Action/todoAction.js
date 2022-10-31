import axios from "axios";
import {searchPelanggan,
        searchTransaksi,
        ProductApi,
        HitungApi,
        SaveTransaksi,
        searchUser,
        tambahUser
    } from '../Api/index';
import Swal from 'sweetalert2';

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

export const userSearch = (user) =>{
    return (dispatch, getState) =>{
        axios.post(searchUser,user)
        .then((result) =>{
            dispatch({
                type :"SEARCH_USER",
                result
            })
            Swal.fire( 'SUKSES!','Mencari Data User','success');
        })
        .catch(error => console.log(error));
    }
}

export const userTambah = (users)=>{
    return(dispatch,getState) =>{
        axios.post(tambahUser,users)
        .then(result =>{
            dispatch({
                type:"SAVE_USER",
                result
            })
            Swal.fire( 'SUKSES!','Tambah Data User','success');
        })
        .catch(error =>{
            const errors = error.response.data.responseData.error;
            let messages = "";

            for(let i = 0; i< errors.length; i++){
                messages+=  i+1 + ". "+errors[i] + " ; ";
            }
            Swal.fire({
                title: 'Error!',
                text: messages,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }  )
    }
}