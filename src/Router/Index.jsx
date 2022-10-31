import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Navbar,Container, Nav} from 'react-bootstrap';
import '../View/Style/index.css';
import Transaksi from '../View/Transaksi';
import InfohPelanggan from '../View/SearchPelanggan';
import InfohTransaksi from '../View/SearchTrx';
import SearchUser from '../View/User/Index';
import UserBaru from '../View/User/UserBaru';
import DetailUpdate from '../View/User/DetailUpdate';

const DetailTrx = ()=>{
    return <Transaksi/>
}

const RouterPelanggan = () =>{
    return <InfohPelanggan/>
}

const RouterTransaksi = () =>{
    return <InfohTransaksi/>
}

const RouterUser = () =>{
    return <SearchUser/>
}

const BaruUser = () =>{
    return <UserBaru/>
}

const UpdateDetail = () =>{
    return <DetailUpdate/>
}

const LinkRouter = () =>{
    return(
        <>
           <Routes>
                <Route path = "/" element ={<SearchUser/>} />
                <Route path = "/userbaru" element = {<BaruUser/>}/>
                <Route path = "/detailuser/:id" element = {<UpdateDetail/>}/>
                <Route path = "/searchPelanggan" element = {<InfohPelanggan/>}/>
                <Route path = "/searchTransaksi" element = {<InfohTransaksi/>}/>
            </Routes>    
        </>
    )
}

const Navbars = () =>{
    return (
        <>
        <Navbar bg="success" variant="dark" expand="lg">
        <Container>
            <Link to = "/" className = "links">
                <div className = "navbar-brand">Transaksi Gadai</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <Link className="nav-item active links" to ="/searchTransaksi">
                    <div className="nav-link active">Search Transaksi</div>
                </Link>
                <Link className="nav-item links" to ="/searchPelanggan">
                    <div className="nav-link active">Search Pelanggan</div>
                </Link>
                </ul>
            </div>

      </Container>
    </Navbar>
        </>
    )
}

export default function Routers(){
    return(
        <>
        <Router>
            <Navbars/>
            <LinkRouter/>
        </Router>
        </>
    )
}
