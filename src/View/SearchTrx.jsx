import React,{useState} from 'react';
import {Card, Button, Form,Table,Modal} from 'react-bootstrap';
import './Style/index.css';

import { useDispatch, useSelector } from "react-redux";
import {srcTransaksi} from "../Action/todoAction.js";
import {CicilanApi,TransaksiBarangApi} from "../Api/index.js";
import { FormatRupiah } from "@arismun/format-rupiah";
import moment from 'moment';
import axios from 'axios';

export default function SearchTrx(){
    const dispatch = useDispatch();
    const [cicilan,setcicilan] = useState([]);
    const [transaksiBarang, setTransaksiBarang] = useState([]);
    const dataTransaksi = useSelector((state => state.todos.responseData));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


const CardTransaksi = () =>{
    const [transaksi,setTransaksi] = useState({
        noTransaksi : "",
        custId : "",
        productId : ""
    });
    const FormTransaksi = (e)=>{
        e.preventDefault();
        dispatch(srcTransaksi(transaksi));
        setTransaksi({
            noTransaksi : "",
            custId : "",
            productId : ""
        });
            //Cicilan Api
         axios.post(CicilanApi,{noTransaksi : transaksi.noTransaksi})
         .then((result) => {
            setcicilan(result.data.responseData);
         }).catch(error =>{
            console.log("Cicilan Error :" + error)
         });
        //Transaksi Barang
         axios.post(TransaksiBarangApi, {noTransaksi: transaksi.noTransaksi})
         .then((result) => {
            setTransaksiBarang(result.data.responseData);
         }).catch(error =>{
            console.log(error);
         })
        
       }
    return (
        <>
         {/* Form Mencari Data Transaksi */}
         <Form onSubmit = {FormTransaksi}>
                <Card.Body>
                    <div className  ="row">
                        {/*Colum pertama */ }
                        <div className = "col-sm-6">
                            {/* Kode Product */}
                        <div className ="sizeh">Nomor Transaksi</div>
                        <Form.Control type="text"
                         className = "mb-1" 
                         size="sm" placeholder = "Nomor Transaksi"
                         onChange={(e) => setTransaksi({ ...transaksi, noTransaksi: e.target.value })}
                         value = {transaksi.noTransaksi}
                         />

                         {/*  Nama Product */}
                        <div className ="sizeh">Kode Pelanggan</div>
                        <Form.Control type="text"
                         className ="mb-1"
                        size="sm" placeholder = "Kode Pelanggan" 
                        onChange={(e) => setTransaksi({ ...transaksi, custId: e.target.value })}
                         value = {transaksi.custId}
                        />

                        {/*  Nama Product */}
                        <div className ="sizeh">Kode Product</div>
                        <Form.Control type="text"
                         className ="mb-1"
                        size="sm" placeholder = "Kode Product" 
                        onChange={(e) => setTransaksi({ ...transaksi, productId: e.target.value })}
                         value = {transaksi.productId}
                        />
                        </div>

                        {/*Colum Kedua */}
                        <div className  = "col-sm-6"></div>
                    </div>
                  
                </Card.Body>
                <Card.Footer>
                    {/* Send Request Data Input Transaksi  */}
                    <Button type = "submit" variant="primary" size ="sm">Search</Button>
                </Card.Footer>
                  </Form>
        </>
    );
}

const TableHead = () =>{
    return(
        <>
         <thead>
        <tr>
          <th>No Transaksi</th>
          <th>Tgl Transaksi</th>
          <th>Id Pelanggan</th>
          <th>Kode Produk</th>
          <th>Tgl Jatuh Tempo</th>
          <th>Status Transaksi</th>
          <th>Action</th>
        </tr>
      </thead>
        </>
    )
}

const TableBody = () =>{
    return(
        <>
      <tbody>
      <tr>
        {
            dataTransaksi ? dataTransaksi.map((result) =>
            <>
            <td>{result.noTransaksi}</td>
            <td>{moment(result.tanggal_tx).format('YYYY-MM-DD')}</td>
            <td>{result.customerId}</td>
            <td>{result.productId}</td>
            <td>{moment(result.tanggalJatuhTempo).format('YYYY-MM-DD')}</td>
            <td>{result.statusTx}</td>
            <td>
            <Button variant="secondary" onClick={handleShow}>
                Detail
            </Button>
            </td>

        <Modal
            show={show}
            onHide={handleClose}
            size = "xl"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Transaksi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Informasi Transaksi */}
                <Card>
                    <Card.Header>Informasi Transaksi</Card.Header>
                    <Card.Body>
                        <div className= "row">
                            <div className = "col-sm-4">
                                {/*ID Pelanggan */}
                                <div className = "sideh">
                                    <b>ID Pelanggan</b>
                                </div>
                                <div>{result.customerName} {" ("} {result.customerId} {")"}</div>
                                 {/*Tanggal Transaksi */}
                                <div className = "sideh">
                                    <b>Tanggal Transaksi</b>
                                </div>
                                <div>{moment(result.tanggal_tx).format('YYYY-MM-DD')}</div>

                                  {/*Nomor Transaksi */}
                                  <div className = "sideh">
                                    <b>Nomor Transaksi</b>
                                </div>
                                <div>{result.noTransaksi}</div>

                            </div>
                            <div className = "col-sm-4">
                                {/*Produk Transaksi */}
                                <div className = "sideh">
                                    <b>Produk Transaksi</b>
                                </div>
                                <div>{result.productType}</div>
                                 {/* Nama Produk */}
                                 <div className = "sideh">
                                    <b>Nama Produk</b>
                                </div>
                                <div>{result.productName}</div>
                                  {/* Nama Description */}
                                  <div className = "sideh">
                                    <b>Produk Description</b>
                                </div>
                                <div>{result.productDesc}</div>
                            </div>
                            <div className = "col-sm-4"></div>
                        </div>
                    </Card.Body>
                </Card>
                <div className ="mb-3"></div>
                {/*Daftar Barang Gadai */}
                <Card>
                    <Card.Header>Daftar Barang Gadai</Card.Header>
                    <Card.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Barang</th>
                                <th>Kondisi</th>
                                <th>Jumlah Barang</th>
                                <th>Harga Per satuan</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transaksiBarang.map((result,key) =>
                            <tr>
                                <td>{key+=1}</td>
                                <td>{result.namaBarang}</td>
                                <td>{result.kondisi}</td>
                                <td>{result.jumlah}</td>
                                <td><FormatRupiah value ={result.hargaPerSatuan} /></td>
                                <td><FormatRupiah value ={(result.jumlah * result.hargaPerSatuan)} /> </td>
                            </tr>
                                )
                            }
                    </tbody>
                </Table>
                    </Card.Body>
                </Card>
                <div className ="mb-3"></div>
                {/*Data Kontrak */}
                <Card>
                    <Card.Header>Data Kontrak</Card.Header>
                    <Card.Body>
                    <div className = "row container">
                    <div className = "col-sm-4">
                        {/*Tanggal Transaksi */}
                            <div className = "sideh">
                                <b>Tanggal Transaksi</b>
                            </div>
                            <div>{moment(result.tanggal_tx).format('YYYY-MM-DD')}</div>
                        {/*Tanggal Jatuh Tempo Transaksi */}
                        <div className = "sideh">
                                <b>Tanggal Jatuh Tempo</b>
                            </div>
                            <div>{moment(result.tanggalJatuhTempo).format('YYYY-MM-DD')}</div>
                        {/*Biaya Admin Buka */}
                            <div className = "sideh">
                                <b>Biaya Admin Buka</b>
                            </div>
                            <div> <FormatRupiah value ={result.biayaAdmBuka}/></div>
                     
                       {/* Biaya Admin Buka Akhir */}
                            <div className = "sideh">
                                <b>Biaya Admin Buka Akhir</b>
                            </div>
                            <div><FormatRupiah value = {result.biayaAdmBukaAk}/></div>
                        {/*Diskon Admin Buka */}
                            <div className = "sideh">
                                <b>Diskon Admin Buka</b>
                            </div>
                            <div>{result.diskonAdmBuka} {" % "}</div>
                       
                        
                    </div>
                    
                    <div className = "col-sm-4">
                         {/*Maksimal Nilai Pinjaman */}
                        <div className = "sideh">
                            <b>Maksimal Nilai Pinjaman</b>
                        </div>
                        <div><FormatRupiah value ={result.maxNilaiPinj}/></div>
                         {/*Nilai Pencairan Pelanggan */}
                         <div className = "sideh">
                            <b>Nilai Pencairan Pelanggan</b>
                        </div>
                        <div><FormatRupiah value = {result.nilaiPencairanPel}/>  </div>

                          {/*Total Biaya Jasa Penyimpanan */}
                          <div className = "sideh">
                            <b>Total Biaya Jasa Penyimpanan</b>
                        </div>
                        <div><FormatRupiah value = {result.totalBiayaJasaPeny} /></div>
                          {/*Total Nilai Pinjaman */}
                          <div className = "sideh">
                            <b>Total Nilai Pinjaman</b>
                        </div>
                        <div><FormatRupiah value ={result.totalNilaiPinj}/></div>
                        {/*Total Nilai Pinjaman */}
                        <div className = "sideh">
                            <b>Total Nilai Taksiran</b>
                        </div>
                        <div><FormatRupiah value ={result.totalNilaiTak} /> </div>
                    </div>

                    <div className = "col-sm-4">
                        {/*Product LTV */}
                        <div className = "sideh">
                            <b>LTV</b>
                    </div>
                        <div>{result.txLtv} {" % "}</div>
                        {/*Jasa Penyimpana Periode */}
                    <div className = "sideh">
                        <b>Jasa Penyimpanan Periode</b>
                    </div>
                        <div><FormatRupiah value = {result.txBiayaJasaPenyPer}/></div>

                    {/*Jasa Penyimpana Periode */}
                    <div className = "sideh">
                        <b>Jasa Penyimpanan</b>
                    </div>
                        <div>{result.txBiayaJasaPeny}</div>
                    {/*Jasa Penyimpana Periode */}
                    <div className = "sideh">
                        <b>Biaya Admin Tutup</b>
                    </div>
                        <div><FormatRupiah value ={result.txBiayaAdmTutup}/></div>
                     {/*Jasa Penyimpana Periode */}
                     <div className = "sideh">
                        <b>Total Pengembangan</b>
                    </div>
                        <div><FormatRupiah value ={result.totalPengem} /></div>
                    
                    </div>
                    
                </div>
               </Card.Body>
                </Card>
                {/*Cicilan Transaksi */}
                <Card>
                    <Card.Header>Cicilan Transaksi</Card.Header>
                    <Card.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>No Transaksi</th>
                            <th>Cicilan Ke</th>
                            <th>Pokok</th>
                            <th>Bunga</th>
                            <th>Total Tagihan</th>
                            <th>Status Cicilan</th>
                            <th>Tanggal Aktif Cicilan</th>
                            <th>Tanggal Bayar</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            cicilan.map(result =>
                                <tr>
                                    <td>{result.noTransaksi}</td>
                                    <td>{result.cicilanKe}</td>
                                    <td><FormatRupiah value ={result.txPokok}/></td>
                                    <td><FormatRupiah value = {result.txBunga}/>  </td>
                                    <td> <FormatRupiah value = {(result.txPokok + result.txBunga)}/></td>
                                    <td>{result.txStatus}</td>
                                    <td>{moment(result.tanggalAktif).format('YYYY-MM-DD')}</td>
                                    <td>{moment(result.tanggalJatuhTempo).format('YYYY-MM-DD')}</td>
                                </tr>
                                )
                           }
                        </tbody>
                     </Table>
                    </Card.Body>
                </Card>
               
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
            </>
            ):
            <td colspan = "8">
                <div className = "alert alert-danger">
                    <center>Data Not Response</center>
                </div>
            </td>

        }
         </tr>
      </tbody>
        </>
    )
}
const ResultTransaksi = () =>{
    return (
        <>
    <Table striped bordered hover size="sm">
        <TableHead/>
        <TableBody/>
    </Table>
        </>
    )
}

    return (
        <>
        <div className = "row">
            <div className ="col-sm-2"></div>
            <div className ="col-sm-8">
            <Card>
                <Card.Header>Search Data Transaksi</Card.Header>
                <CardTransaksi/>
                </Card>
            <ResultTransaksi/>
            
            </div>
            <div className ="col-sm-2"></div>
        </div>
       
    </>
    );
}