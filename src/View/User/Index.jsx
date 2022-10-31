
import {Card,Form,FormControl} from 'react-bootstrap';
import '../Style/index.css';
import {FormSearch,DataUser} from './CustomHook';


export default function SearchUser(){
    return (
        <>
           <div className = "row">
                <div className = "col-sm-2"></div>
                <div className = "col-sm-8">
                   <FormSearch/>
                   <DataUser/>
                </div>
                <div className = "col-ms-2"></div>
            </div> 
        </>
    )
}