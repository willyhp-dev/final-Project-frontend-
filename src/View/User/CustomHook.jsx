import {Card,Form,FormControl, Button,Table,Modal} from 'react-bootstrap';
import '../Style/index.css';
import {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {userSearch,userTambah} from '../../Action/todoAction.js';
import { FormatRupiah } from "@arismun/format-rupiah";
import {Link} from "react-router-dom";
import moment from 'moment';
export const FormSearch = () =>{
    const [user, setuser] = useState({
        userId:"",
        userName : "",
        userHp : "",
        recStatus : "",
        userDesc : "",
    });

    const dispatch = useDispatch();

    const FormSearch = (e) =>{
    e.preventDefault();
    dispatch(userSearch(user));
    console.log(user);
    }
    
    const Kosongkan = () =>{
        setuser({
             userId: "",
             userName: "",
             userHp :"",
             recStatus: "",
             userDesc: ""
        });
        console.log(user);

    }

    

    return(
        <>
<Card className ="mb-3">
    <Card.Header>Cari Data User</Card.Header>
    <Form onSubmit = {FormSearch}>
    <Card.Body>
        
        <div className  ="row">
            <div className = "col-sm-7">
                <div className = "row mb-3">
                    <div className = "col-sm-3">User Id</div>
                    <div className = "col-sm-9">
                        <FormControl size = "sm"   
                        onChange={(e) => setuser({ ...user, userId: e.target.value })}
                         value = {user.userId} />
                    </div>
                </div>

                <div className = "row mb-3">
                    <div className = "col-sm-3">User Name</div>
                    <div className = "col-sm-9">
                        <FormControl size = "sm" 
                         onChange={(e) => setuser({ ...user, userName: e.target.value })}
                         value = {user.userName} />
                    </div>
                </div>

                <div className = "row mb-3">
                    <div className = "col-sm-3">Keterangan</div>
                    <div className = "col-sm-9">
                        <FormControl size = "sm"
                         onChange={(e) => setuser({ ...user, userDesc: e.target.value })}
                         value = {user.userDesc} 
                        />
                    </div>
                </div>
            </div>
            <div className = "col-sm-5">
            <div className = "row mb-3">
                    <div className = "col-sm-3">Status</div>
                    <div className = "col-sm-9">
                        <Form.Select size = "sm"
                         onChange={(e) => setuser({ ...user, recStatus: e.target.value })}
                         value = {user.recStatus} 
                        >
                            <option value = "">All</option>
                            <option value = "A">Aktif</option>
                            <option value = "N">Tidak Aktif</option>
                           
                        </Form.Select>
                    </div>
            </div>

            <div className = "row mb-3">
                    <div className = "col-sm-3 sizeh">NomorHp</div>
                    <div className = "col-sm-9">
                       <FormControl size = "sm"  onChange={(e) => setuser({ ...user, userHp: e.target.value })}
                         value = {user.userHp} />
                    </div>
            </div>
        </div>
    </div>
      
    </Card.Body>
    <Card.Footer>
        <Button variant ="secondary" size = "sm" className = "m-1" type = "submit">Search</Button>
        <Button variant = "secondary" size = "sm" onClick = {()=>Kosongkan()}>Kosongkan</Button>
        <Link to ="/userbaru">
            <Button variant="primary" size ="sm" className ="m-1">User Baru</Button>
        </Link>
    </Card.Footer>
      </Form>
</Card>
        </>
    )
};

export const DataUser = () =>{
    const TableHead =() =>{
        return(
            <>
            <thead>
                <tr>
                <th width = "10%">User Id</th>
                <th>User Name</th>
                <th>Limit Transaksi</th>
                <th>Status</th>
                <th width = "15%">Action</th>
                </tr>
             </thead>
            </>
        )
    }

    const TableBody = () =>{
        const dataUser = useSelector((state) => state.todos.responseData);
        const [show, setShow] = useState(false);
        console.log(dataUser);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return(
            <>
        <tbody>
            {
                dataUser ? dataUser.map((result, key) =>
                    <tr key = {key}>
                        <td>{result.userId}</td>
                        <td>{result.userName}</td>
                        <td>{result.maxLimit}</td>
                        <td>{result.recStatus}</td>
                        <td>
                            <Link to ={`/detailuser/${result.userId}`}>
                            <Button variant="secondary" size = "sm">
                                Detail
                            </Button>
                            </Link>
                           

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Data User Detail</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                            <Table striped bordered hover size="sm" >
                                                <tbody >
                                                    {/*UserId */}
                                                <tr>
                                                    <td width ="30%"><b>UserId</b></td>
                                                    <td><center>{result.userId}</center></td>
                                                </tr>
                                                {/*UserName */}
                                                <tr>
                                                    <td width ="30%"><b>UserName</b></td>
                                                    <td><center>{result.userName}</center></td>
                                                </tr>
                                                  {/*UserPhone */}
                                                <tr>
                                                    <td width ="30%"><b>Nomor</b></td>
                                                    <td><center>{result.user_phone}</center></td>
                                                </tr>
                                                 {/*Limit Transaksi */}
                                                 <tr>
                                                    <td width ="30%"><b>Limit Transaksi</b></td>
                                                    <td><center><FormatRupiah value ={result.maxLimit} /></center></td>
                                                </tr>
                                                 {/*User Keterangan */}
                                                 <tr>
                                                    <td width ="30%"><b>Keterangan</b></td>
                                                    <td><center>{result.userNotes}</center></td>
                                                </tr>
                                                 {/*UserPhone */}
                                                 <tr>
                                                    <td width ="30%"><b>Status</b></td>
                                                    <td><center>{result.recStatus}</center></td>
                                                </tr>
                                                 {/*Tanggal Masuk */}
                                                 <tr>
                                                    <td width ="30%"><b>Tanggal Masuk</b></td>
                                                    <td><center>{moment(result.registerDate).format("YYYY-MM-DD")}</center></td>
                                                </tr>
                                                {/*UserID-UserName / Tanggal Masuk */}
                                                <tr>
                                                    <td width ="30%"><b>Tanggal dibuat</b></td>
                                                    <td><center>{result.userId} {" - "} {result.userName} {" / "}{moment(result.registerDate).format("YYYY-MM-DD")}</center></td>
                                                </tr>
                                                 {/*UserID-UserName / Tanggal Masuk */}
                                                 <tr>
                                                    <td width ="30%"><b>Tanggal Terakhir Update</b></td>
                                                    <td><center>{result.updatedDate ==null ? <div>Belum Ada</div>
                                                    :moment(result.updatedDate).format("YYYY-MM-DD")}</center></td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" size ="sm" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger" size ="sm" onClick={handleClose}>
                                    Hapus
                                </Button>
                                <Button variant="warning" size ="sm" onClick={handleClose}>
                                    Ubah
                                </Button>
                               
                                </Modal.Footer>
                            </Modal>
                        </td>
                    </tr>
                ) : <div>Tidak ADA</div>
            }
       </tbody>
            </>
        )
    }
    return (
        <>
      <Card>
        <Card.Header>Hasil Pencarian</Card.Header>
        <Card.Body>
        <Table striped bordered hover size="sm">
            <TableHead/>
            <TableBody/>
        </Table>
        </Card.Body>
      </Card>
        </>
    )
}