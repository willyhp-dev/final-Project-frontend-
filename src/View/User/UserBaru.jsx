import {Card,Form,Button} from 'react-bootstrap';
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {userTambah} from '../../Action/todoAction.js';
import {Link} from "react-router-dom";

export default function UserBaru(){
    const[users,setusers] = useState({
        userId:"",
        userName :"",
        userHp : "",
        userDecs: "",
        userTxnLimit :0,
        userRegDate :""
   });
   const dispatch = useDispatch();
   const formUserBaru= (i) =>{
        i.preventDefault();
        dispatch(userTambah(users));
        console.log(users);
   }
    return(
        <>
        <div className = "row">
            <div className ="col-sm-2"></div>
            <div className ="col-sm-8">
                <Card>
                    <Card.Header>Peraturan - User Baru</Card.Header>
                    <Form onSubmit = {formUserBaru}>

                    <Card.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>User Id</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text" 
                                onChange={(i) => setusers({ ...users, userId: i.target.value })}
                                value = {users.userId}
                                />
                            </div>
                        </div>
                     </Form.Group>
                       {/* User Name */}
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>User Name</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text"
                                 onChange={(i) => setusers({ ...users, userName: i.target.value })}
                                 value = {users.userName}
                                />
                            </div>
                        </div>
                     </Form.Group>
                       {/* User Phone */}
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>Nomor Hp</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control size = "sm" type="text"
                                 onChange={(i) => setusers({ ...users, userHp: i.target.value })}
                                 value = {users.userHp}
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
                                    onChange={(i) => setusers({ ...users, userDecs: i.target.value })}
                                    value = {users.userDesc}
                                    />
                            </div>
                        </div>
                     </Form.Group>

                     {/* User Limit Transaksi */}
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>Maksimal Limit Transaksi User</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control type ="number" size = "sm" 
                                 onChange={(i) => setusers({ ...users, userTxnLimit:parseFloat (i.target.value) })}
                                 value = {users.userTxnLimit}
                                />
                            </div>
                        </div>
                     </Form.Group>

                      {/* Tanggal Masuk */}
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className = "row">
                            <div className = "col-sm-4">
                                <Form.Label>Tanggal Masuk</Form.Label>
                            </div>
                            <div className ="col-sm-8">
                                <Form.Control type ="date" size = "sm"
                                onChange={(i) => setusers({ ...users, userRegDate: i.target.value })}
                                value = {users.userRegDate}
                                />
                            </div>
                        </div>
                     </Form.Group>

                    </Card.Body>
                    <Card.Footer>
                        <Button type ="submit" className = "m-1" size = "sm">Simpan</Button>
                        <Link to = "/">
                             <Button type ="submit" variant = "secondary" size = "sm">Kembali</Button>
                        </Link>
                   
                    </Card.Footer>
                    </Form>
                </Card>
            </div>
            <div className = "col-sm-2"></div>
        </div>
        </>
    )
}