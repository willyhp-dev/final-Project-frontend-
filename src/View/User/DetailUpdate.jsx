import {Card, Form, Button,Modal} from 'react-bootstrap';
import {useState,useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {Link} from "react-router-dom";
import {updateUser,deleteUser} from '../../Api/index.js';
import Swal from 'sweetalert2';

export default function DetailUpdate() {
    const {id} = useParams();
    const[userId,setuserId] = useState("");
    const[userName, setuserName] = useState("");
    const[userPhone, setuserPhone] = useState("");
    const[keterangan, setketerangan] = useState("");
    const [maxLimit, setmaxLimit] = useState(0);
    const [tanggalMasuk, settanggalMasuk] = useState("");
    const [tanggalbuat,settanggalbuat] = useState("");
    const [updatedDate,setupdatedDate] = useState("");
    const [update,setupdate] = useState(false);
    const [notifikasi,setnotifikasi] = useState(false);
    const[success, setsuccess] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 

    const AxiosDetail = useCallback(async() =>{
        try {
            let response = await axios.get(
                `http://localhost:8082/user/doGetDetailuser/${id}`
            );
            const userId = response.data.responseData.userId;
            const userName = response.data.responseData.userName;
            const userPhone = response.data.responseData.user_phone;
            const keterangan = response.data.responseData.userNotes;
            const maxLimit = response.data.responseData.maxLimit;
            const tanggalMasuk = moment(response.data.responseData.registerDate).format("YYYY-MM-DD");
            const updatedDate = response.data.responseData.updatedDate;
            const tanggalBuat = userId +" - "+ userName + " / "+ tanggalMasuk;

            setuserId(userId);
            setuserName(userName);
            setuserPhone(userPhone);
            setketerangan(keterangan);
            setmaxLimit(maxLimit);
            settanggalMasuk(tanggalMasuk);
            settanggalbuat(tanggalBuat);
            setupdatedDate(updatedDate);

           
        } catch (error) {
            console.log(error);
        }
    },[])
    useEffect(() => {
        AxiosDetail();
    },[AxiosDetail]);
    
    const BooleanUbah = () =>{
        setupdate(true);
    }

    const updateForm = async() =>{
        try {
               let response = await axios.put(updateUser,
                {
                    userId      : userId,
                    userName    : userName,
                    userHp      : userPhone,
                    userDecs    : keterangan,
                    userTxnLimit: maxLimit,
                    userRegDate : tanggalMasuk
                });

                setnotifikasi(true);
                setsuccess(response.data.responseMessage);

        }catch (error) {
            const errors = error.response.data.responseData.error;
            let messages = "";

            for(let i = 0; i< errors.length; i++){
                messages+=  i+1 + ". "+errors[i] + " ; ";
            }
            Swal.fire({
                title: 'Error!',
                text: messages,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
           
        }
    };

    const ModalDelete = () =>{
        const deleteForm = async() =>{
            try {
               let response =  await axios.post(deleteUser,{userId:id});
               setnotifikasi(true);
               setsuccess(response.data.responseMessage);
                
            } catch (error) {
                const errors = error.response.data.responseData.error;
                Swal.fire({
                    title: 'Error!',
                    text: errors,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
        return(
            <>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
                <Modal.Body>
                    Apakah anda yakin ingin menghapus data ini ?
                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" size = "sm" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" size = "sm" onClick = {deleteForm}>Yakin, hapus saja</Button>
            </Modal.Footer>
        </Modal>
            </>
        )
    }
    return (
        <>
        <div className = "row">
            <div className = "col-sm-2"></div>
            <div className = "col-sm-8">
                <Card>
                    <Card.Header>Peraturan User- Detail</Card.Header>
                    <Form>
                    <Card.Body>
                        {
                            notifikasi === true ?
                            <div className = "alert alert-success">
                                {success}
                            </div>
                            :
                            <div></div>
                        }

                        {/*User Id */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>User Id</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text" 
                                onChange={(i) => setuserId(i.target.value)}
                                value = {userId} 
                                disabled />
                            </div>
                        </div>
                     </Form.Group>
                     {
                        update === false ?
                        <>
                         {/*User Name */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>User Name</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text" 
                                onChange={(i) => setuserName(i.target.value)}
                                value = {userName}
                                disabled />
                            </div>
                        </div>
                     </Form.Group>
                      {/*User Phone */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>NomorHp</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control size = "sm" type="text" 
                            onChange={(i) => setuserPhone(i.target.value)}
                            value = {userPhone}
                            disabled />
                        </div>
                    </div>
                    </Form.Group>
                         {/* User Keterangan */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>Keterangan</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                onChange={(i) => setketerangan(i.target.value)}
                                value = {keterangan}
                                disabled />
                        </div>
                    </div>
                    </Form.Group>
                     {/*User Max Limit */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>Max Limit</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control size = "sm" type="number" 
                            onChange={(i) => setmaxLimit(parseFloat(i.target.value))}
                            value = {maxLimit}
                            disabled />
                        </div>
                    </div>
                    </Form.Group>
                    {/*User Tanggal masuk */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>Tanggal Masuk</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control size = "sm" type="date" 
                            onChange={(i) => settanggalMasuk(i.target.value)}
                            value = {tanggalMasuk}
                            disabled />
                        </div>
                    </div>
                    </Form.Group>
                    </>
                     :

                     <>
                         {/*User Name */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>User Name</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text" 
                                onChange={(i) => setuserName(i.target.value)}
                                value = {userName}
                                  />
                            </div>
                        </div>
                     </Form.Group>
                      {/*User Phone */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>NomorHp</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control size = "sm" type="text" 
                            onChange={(i) => setuserPhone(i.target.value)}
                            value = {userPhone}
                            />
                        </div>
                    </div>
                    </Form.Group>
                         {/* User Keterangan */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>Keterangan</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                onChange={(i) => setketerangan(i.target.value)}
                                value = {keterangan}
                                />
                        </div>
                    </div>
                    </Form.Group>
                     {/*User Max Limit */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>Max Limit</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control size = "sm" type="number" 
                            onChange={(i) => setmaxLimit(parseFloat(i.target.value))}
                            value = {maxLimit}
                            />
                        </div>
                    </div>
                    </Form.Group>
                    {/*User Tanggal masuk */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className = "row">
                        <div className = "col-sm-4">
                            <Form.Label>Tanggal Masuk</Form.Label>
                        </div>
                        <div className ="col-sm-8">
                            <Form.Control size = "sm" type="date" 
                            onChange={(i) => settanggalMasuk(i.target.value)}
                            value = {tanggalMasuk}
                            />
                        </div>
                    </div>
                    </Form.Group>
                    </>
                     }
                      {/*User Tanggal buat */}
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>Tanggal Masuk</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text" 
                                onChange={(i) => settanggalbuat(i.target.value)}
                                value = {tanggalbuat}
                                disabled/>
                            </div>
                        </div>
                     </Form.Group>

                      {/*User Tanggal Update Terakhir */}
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>Tanggal Update Terakhir</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="date" 
                                onChange={(i) => setupdatedDate(i.target.value)}
                                value = {updatedDate}
                                 disabled/>
                            </div>
                        </div>
                     </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Link to = "/">
                            <Button variant = "secondary" size = "sm" className = "m-1">Kembali</Button>
                        </Link>

                          <Button variant="danger" size = "sm" onClick={handleShow}>
                            Hapus
                          </Button>
                          <ModalDelete/>
                        {
                            update === false ?
                            <Button variant = "warning" size = "sm" className = "m-1" onClick ={BooleanUbah}>Ubah</Button>
                            :
                            <Button variant = "warning" size = "sm" className = "m-1" onClick ={updateForm}>Update</Button>
                       
                        }
                    </Card.Footer>
                    </Form>
                </Card>
            </div>
            <div className = "col-sm-2"></div>
        </div>
        </>
    )
}