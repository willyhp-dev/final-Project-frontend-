import React,{useState} from 'react';
import {Card, Form,Table,Button} from 'react-bootstrap';
import './Style/index.css';
import {useDispatch, useSelector} from "react-redux";
import {hitungTransaksi,transaksiSave } from "../Action/todoAction.js";
import { FormatRupiah } from "@arismun/format-rupiah";
{/* Informasi Transaksi */}
export default function Transaksi(){
    const dispatch = useDispatch();
    const dataTransaksi = useSelector((state => state.todos.responseData));
    const [save, setsave] = useState(false);
    
    const data = JSON.parse(localStorage.getItem('transaksi'));
    const InfohTransaksi = ()=>{
        const [transaksi, setTransaksi] = useState({
            productId : "",
            nilaipencairanPelanggan : 0,
            diskonAdmBuka : 0,
            custId :"",
            actorId: "1",
            statusTx: "LUNAS",
            daftarBarangGadai: []
    
        })
     
    
       
    {/* Form Barang Gadai */}
    const BarangGadai = ()=>{
  
    const[namaBarang,setnamaBarang] = useState("");
    const [kondisi, setkondisi] = useState("");
    const [jumlah,setjumlah] = useState("");
    const [hargaPersatuan, sethargaPersatuan] = useState(0);
   
    const TableHead = () =>{
        return (
            <>
             <thead>
                    <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Kondisi</th>
                    <th>Jlh Barang</th>
                    <th>Harga Per satuan</th>
                    <th>Total</th>
                    </tr>
              </thead>
            </>
        )
    }

    const TableBody = () =>{
        return (
            <>
            <tbody>
                    {
                        save == true ? 
                        data.daftarBarangGadai.map((result, key) =>
                        <tr>
                            <td>{key+=1}</td>
                            <td>{result.namaBarang}</td>
                            <td>{result.kondisi}</td>
                            <td>{result.jumlah}</td>
                            <td><FormatRupiah value = {result.hargaPersatuan}/></td>
                            <td><FormatRupiah value ={(result.hargaPersatuan * result.jumlah)} /></td>
                    </tr>
                        )
                        :
                        transaksi.daftarBarangGadai.map((result,key) =>
                        <tr>
                            <td>{key+=1}</td>
                            <td>{result.namaBarang}</td>
                            <td>{result.kondisi}</td>
                            <td>{result.jumlah}</td>
                            <td><FormatRupiah  value = {result.hargaPersatuan} /></td>
                            <td><FormatRupiah value ={(result.hargaPersatuan * result.jumlah)} /></td>
                        </tr>
                        )
                    }
            </tbody>
            </>
        )
    }
    const FormBarangGadai = (e) =>{
        e.preventDefault();
        const group = {namaBarang,kondisi,jumlah,hargaPersatuan}
        setTransaksi((ls)=>({...ls,daftarBarangGadai:[...ls.daftarBarangGadai,group]}));
    }
    
    
    return (
        <>
        <Card>
            <Card.Header>Daftar Barang Gadai</Card.Header>
            <Form onSubmit = {FormBarangGadai}>
            <Card.Body>
                
                    
                    <div className = "row">
                    <div className = "col-sm-3">
                        {/* Nama Barang */}
                        <div className = "sizeh">Nama Barang</div>
                        <Form.Control size = "sm" placeholder="Nama Barang"
                         onChange={(e) => setnamaBarang(e.target.value )}
                         value = {namaBarang}
                        />
                    </div>
                    <div className = "col-sm-3">
                        {/*Deskripsi */}
                        <div className = "sizeh">Deskripsi</div>
                        <textarea className = "form-control w-100" placeholder="Deskripsi Barang"
                         onChange={(e) => setkondisi(e.target.value )}
                         value = {kondisi}
                        />
                    </div>
                    <div className = "col-sm-3">
                         {/*Jumlah */}
                    <div className = "sizeh">Jumlah</div>
                        <Form.Control type = "number" size = "sm" placeholder="Jumlah"
                        onChange={(e) => setjumlah(e.target.value)}
                        value = {jumlah}
                        />
                    </div>
                    <div className = "col-sm-3">
                         {/*Harga Per satuan */}
                    <div className = "sizeh">Harga Per Satuan</div>
                        <Form.Control type = "number" size = "sm" placeholder="Harga Per satuan"
                      onChange={(e) => sethargaPersatuan(e.target.value )}
                      value = {hargaPersatuan}
                        />
                    </div>
                    <div className="mb-3"></div>
                     {/* Table Barang Gadai */}
                     <Table striped bordered hover size="sm">
                    <TableHead/>
                    <TableBody/>
                        </Table>
                </div>

            </Card.Body>
            <Card.Footer>
                <Button type = "submit"  size = "sm">Input Barang Gadai</Button>
            </Card.Footer>
            </Form>
        </Card>
        </>
    )
}
        const FormSaveTransaksi = () =>{
            dispatch(transaksiSave(data));
            console.log(data);
            alert("Sukses Simpan Data");
        }

        const HitungTest = ()=>{
            const data = localStorage.setItem('transaksi', JSON.stringify(transaksi));
            dispatch(hitungTransaksi(transaksi));
            if(data){
                setsave(true);
             
            }
           
           
        }
        const cancelTransaksi = () =>{
            setsave(false);
        }
        return (
            <>
              <div className = "row">
                <div className = "col-sm-2"></div>
                <div className = "col-sm-8">
                   
                <Card>
                    <Card.Header>CUSTOMER</Card.Header>
                    {/* <Form onSubmit ={FormTest}> */}
                    <Card.Body>
                    {
                        save== true ?
                        <div className = "row">
                            <div className = "col-sm-6">
                                {/* Kode Product */}
                               <div className = "row">
                                    <div className = "col-sm-6 sizeh">
                                        <b>Kode Product</b>
                                    </div>
                                    <div className = "col-sm-6 sizeh">
                                        {data.productId}
                                    </div>
                               </div>
                               {/*Nilai Pencairan Customer */}
                               <div className = "row">
                                    <div className = "col-sm-6 sizeh">
                                        <b>Nilai Pencairan Customer</b>
                                    </div>
                                    <div className = "col-sm-6 sizeh">
                                        <FormatRupiah value ={data.nilaipencairanPelanggan} />
                                    </div>
                               </div>
                                {/*Diskon Admin Buka */}
                               <div className = "row">
                                    <div className = "col-sm-6 sizeh">
                                        <b>Diskon Admin Buka</b>
                                    </div>
                                    <div className = "col-sm-6 sizeh">
                                        {data.diskonAdmBuka} {" % "}
                                    </div>
                               </div>
                                {/* */}
                               <div className = "row">
                                    <div className = "col-sm-6 sizeh">
                                        <b>ID Pelanggan</b>
                                    </div>
                                    <div className = "col-sm-6 sizeh">
                                        {data.custId}
                                    </div>
                               </div>
                            </div>
                            <div className = "col-sm-6">
                              
                            </div>
                        </div>
                        
                        :
                        <div className = "row">
                            <div className = "col-sm-6">
                             {/*Kode Product */}
                             <div className = "sizeh">
                                <b>Kode Product</b>
                             </div>
                            <Form.Control size = "sm" className = "mb-2" 
                             placeholder = "Kode Product"
                             onChange={(e) => setTransaksi({ ...transaksi, productId: e.target.value })}
                             value = {transaksi.kodeProduct}
                             />
                            {/*Nilai Pencairan Pelanggan */}
                            <div className = "sizeh">
                                <b>Nilai Pencairan Pelanggan</b>
                             </div>
                            <Form.Control size = "sm" className = "mb-2" 
                             placeholder = "Nilai Pencairan Pelanggan" type ="number"
                             onChange={(e) => setTransaksi({ ...transaksi, nilaipencairanPelanggan: parseFloat(e.target.value) })}
                             value = {transaksi.NilaiPencairan}
                             />
                            {/* Diskon Admin Buka */}
                            <div className = "sizeh">
                                <b>Diskon Admin Buka</b>
                             </div>
                            <Form.Control size = "sm" type = "number" className = "mb-2"
                              placeholder = "Diskon Admin Buka"
                              onChange ={(e) => setTransaksi({...transaksi, diskonAdmBuka : parseFloat(e.target.value)})}
                              value = {transaksi.DiskonAdmBuka}
                              />
                            {/*ID Pelanggan */}
                            <div className = "sizeh">
                                <b>ID Pelanggan</b>
                             </div>
                            <Form.Control size = "sm" className = "mb-2" 
                             placeholder = "ID Pelanggan"
                             onChange ={(e) => setTransaksi({...transaksi, custId : e.target.value})}
                             value = {transaksi.idPelanggan}
                             />
                            </div>
                            <div className = "col-sm-6"></div>
                        </div>
                    }
                        
                    </Card.Body>
                    <Card.Footer>
                        <Button size = "sm" className = "m-1" onClick = {()=> HitungTest()}>Hitung</Button>
                        <Button size = "sm" type="submit" onClick = {()=> FormSaveTransaksi()}  >Simpan</Button>
                        <Button size = "sm" variant ="danger"  onClick={cancelTransaksi} className ="m-1">Cancel</Button>
                    </Card.Footer>
                    {/* </Form> */}
                </Card>
                </div>
                <div className = "col-sm-2"></div>
            </div>
            <div className = "row mt-3">
                <div className = "col-sm-2"></div>
                <div className = "col-sm-8">
                    <BarangGadai/>
                </div>
                <div className = "col-sm-2"></div>
            </div>
            </>
        )
    };

    const FormDataKontrak = ()=>{
        return(
            <>
            <div className = "row">
                <div className ="col-sm-2"></div>
                <div className ="col-sm-8">
                    <Card>
                        <Card.Header>Data Kontrak</Card.Header>
                       
                        <Card.Body>
                            {
                                dataTransaksi &&
                                <div className = "row sizeh">
                                <div className = "col-sm-6">
                                    <div className = "row">
                                        {/*Total Nilai Taksiran */}
                                        <div className = "col-sm-5">
                                            <p><b>Total Nilai Taksiran</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            <FormatRupiah value ={dataTransaksi.totalNilaiTak} />
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                        {/*LTV % */}
                                        <div className = "col-sm-5">
                                            <p><b>LTV %</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            {dataTransaksi.txLtv} %
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Maksimal Nilai Pinjaman */}
                                        <div className = "col-sm-5">
                                            <p className ="sideh"><b>Maksimal Nilai Pinjaman</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            <FormatRupiah value ={dataTransaksi.maxNilaiPinj} />
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Nilai Pencairan Pelanggan */}
                                        <div className = "col-sm-5">
                                            <p className ="sideh"><b>Nilai Pencairan Pelanggan</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6"><FormatRupiah value ={dataTransaksi.nilaiPencairanPel} /></div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Biaya Admin Buka */}
                                        <div className = "col-sm-5">
                                            <p className ="sideh"><b>Biaya Admin Buka</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6"><FormatRupiah value ={dataTransaksi.biayaAdmBuka}/></div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Diskon Admin Buka */}
                                        <div className = "col-sm-5">
                                            <p className ="sideh"><b>Diskon Admin Buka</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            {dataTransaksi.diskonAdmBuka}
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Biaya Admin Buka Akhir */}
                                        <div className = "col-sm-5">
                                            <p className ="sideh"><b>Biaya Admin Buka Akhir</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                           <FormatRupiah value ={dataTransaksi.biayaAdmBukaAk} /> 
                                        </div>
                                    </div>
                                </div>
                                <div className = "col-sm-6">
                                    <div className = "row">
                                        {/* Tanggal Transaksi */}
                                        <div className = "col-sm-5">
                                            <p><b>Tanggal Transaksi</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            {dataTransaksi.tanggal_tx}
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Tgl Jatuh Tempo */}
                                        <div className = "col-sm-5">
                                            <p><b>Tgl Jatuh Tempo</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            {dataTransaksi.tanggalJatuhTempo}
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                        {/*Biaya Jasa Penyimpanan Per bulan */}
                                        <div className = "col-sm-5">
                                            <p><b>Biaya Jasa Penyimpanan</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-3"></div>
                                        <div className = "col-sm-3">
                                        <b>Per {dataTransaksi.txBiayaJasaPeny}{" "}  bulan</b>
                                        </div>
                                       
                                    </div>
    
                                    <div className = "row">
                                         {/* Biaya Jasa Penyimpanan / Periode */}
                                         <div className = "col-sm-5">
                                            <p><b>Biaya Jasa Penyimpanan / Periode</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            {dataTransaksi.txBiayaJasaPenyPer}
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                         {/* Total Biaya Jasa Penyimpanan */}
                                         <div className = "col-sm-5">
                                            <p><b>Total Biaya Jasa Penyimpanan</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            <FormatRupiah value ={dataTransaksi.totalBiayaJasaPeny} />
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                         {/* Biaya Admin Tutup */}
                                         <div className = "col-sm-5">
                                            <p><b>Biaya Admin Tutup</b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6">
                                            <FormatRupiah value ={dataTransaksi.txBiayaAdmTutup} />
                                        </div>
                                    </div>
    
                                    <div className = "row">
                                         {/* Total Pengembalian */}
                                         <div className = "col-sm-5">
                                            <p><b>Total Pengembalian </b></p>
                                        </div>
                                        <div className = "col-sm-1">:</div>
                                        <div className = "col-sm-6"></div>
                                    </div>
                                       
                                    </div>
                            </div>

                            }
                           
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </div>
                <div className ="col-sm-2"></div>
            </div>
            </>
        );
    }

   
   
    return(
        <>
          {/* Informasi Transaksi dan Barang Gadai dan Transaksi */}
        <InfohTransaksi/>
        <div className = "mb-3"></div>
        {/*Data Kontrak */}
        <FormDataKontrak/>
        </>
    )
}