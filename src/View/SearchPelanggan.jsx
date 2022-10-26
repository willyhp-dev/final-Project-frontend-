import React,{useState} from "react";
import {Card,Form, Button} from 'react-bootstrap';
import './Style/index.css';
import {useDispatch, useSelector} from "react-redux";
import {srcPelanggan} from "../Action/todoAction.js";

export default function SearchPelanggan(){
 
    const dispatch = useDispatch();
            
    const ResultPelanggan = () =>{
        const dataPelanggan = useSelector((state => state.todos.responseData));
        
        return(
            <>
            <Card>
                <Card.Header>Hasil Pencarian Pelanggan</Card.Header>
                <Card.Body>
               {
                dataPelanggan && dataPelanggan.map((result,key) =>
                    <>
                    <div className = "row">
                        <div className = "col-sm-3"><b>Id</b></div>
                        <div className = "col-sm-9" key = {key =+1}>{result.custId}</div>
                    </div>
                    <div className = "row">
                        <div className = "col-sm-3"><b>Name</b></div>
                        <div className = "col-sm-9" key = {key=+1}>{result.custName}</div>
                    </div>
                    <div className = "row">
                        <div className = "col-sm-3"><b>Ktp</b></div>
                        <div className = "col-sm-9" key = {key=+1}>{result.custKtp}</div>
                    </div>
                    <div className = "row">
                        <div className = "col-sm-3"><b>NomorHp</b></div>
                        <div className = "col-sm-9" key = {key=+1}>{result.custHp}</div>
                    </div>
                    </>
                    )
               }
                </Card.Body>
            </Card>
            </>
        )
    };

    const FormPelanggan = () =>{
        const SendPelanggan = (e) =>{
            e.preventDefault();
            dispatch(srcPelanggan(pelanggan));
            setpelanggan({
                custId :"",
                custName: "",
                custKtp : "",
                custHp : ""
            });
          }
        const [pelanggan,setpelanggan] = useState({
            custId :"",
            custName: "",
            custKtp : "",
            custHp : ""
        });

        return(
        <>
         <Form onSubmit ={SendPelanggan}>
             <Card.Body>
                <div className = "row">
                    <div className = "col-sm-6">

                        {/* ID PELANGGAN*/}
                    <div className = "sizeh">ID Pelanggan</div>
                    <Form.Control size = "sm" className ="mb-1" 
                    placeholder="ID Pelanggan" 
                    onChange={(e) => setpelanggan({ ...pelanggan, custId: e.target.value })}
                    value = {pelanggan.custId}
                    />

                       {/* Nama PELANGGAN*/}
                    <div className = "sizeh">Nama Pelanggan</div>
                    <Form.Control size = "sm" className ="mb-1" placeholder="Nama Pelanggan"
                      onChange={(e) => setpelanggan({ ...pelanggan, custName: e.target.value })}
                      value = {pelanggan.custName}
                    />

                        {/* Nomor KTP*/}
                    <div className = "sizeh">Nomor KTP</div>
                    <Form.Control size = "sm" className ="mb-1" placeholder="Nomor KTP"
                    onChange={(e) => setpelanggan({ ...pelanggan, custKtp: e.target.value })}
                    value = {pelanggan.custKtp}
                    />

                        {/* Nomor HP*/}
                    <div className = "sizeh">Nomor HP</div>
                    <Form.Control size = "sm" className ="mb-1" placeholder="Nomor HP"
                    onChange={(e) => setpelanggan({ ...pelanggan, custHp: e.target.value })}
                    value = {pelanggan.custHp}
                    />

                    </div>
                    <div className = "col-sm-6">
                        <ResultPelanggan/>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer>
            <Button type ="submit" size ="sm">Search</Button>
            </Card.Footer>
            </Form>
        </>)
    }
    return (
    <>
        <div className = "row">
            <div className = "col-sm-2"></div>
            <div className = "col-sm-8">
                <Card>
                    <Card.Header>Cari Data Pelanggan</Card.Header>
                   <FormPelanggan/>
                </Card>
            </div>
            <div className = "col-sm-2"></div>
        </div>
    </>)
}