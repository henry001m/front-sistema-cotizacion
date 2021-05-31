import React,{useState,useEffect} from 'react'
import {Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import {PlusCircle} from 'bootstrap-icons-react';
import ModalRegistroEmpresa from './ModalRegistroEmpresa';
import { getEmpresas } from '../../services/http/BussinessService';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {getRubro} from '../../services/http/BussinessService'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';


function ListaEmpresa(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredBusniss, setFilteredBusniss] = useState([]);
    const [abierto, setAbierto] = useState(false);
    const [flag, setFlag] = useState(false);
    

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const updateEmpresas = ()=>{
        setFlag(!flag);
    };
    

    //cargar datos de API
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await getEmpresas();
                setEmpresas(response.business);
            } catch (error) {
                console.log(error);
            }
            };
            fetchData();
    }, [empresas]);

    /* let x = empresas.filter((a)=> {if (a.rubro=="Venta de libros"){return empresas}});
    console.log(x)
     */
    useEffect(() => {
        setFilteredBusniss(
            empresas.filter((empresa) =>empresa.rubro.toLowerCase().includes(search.toLowerCase())) 
        );
    }, [search,empresas]);
      
    return (
            <div className="container" align="left">
                <br></br>
                <h1>Empresas</h1>
                <br></br>
                <div className="row">
                    <div className="col-6">                                
                        <input {...register("rubro", { required: true })}
                            className="form-control"
                            placeholder="Search" 
                            aria-label="Search"
                            type="search"
                            id = "search"
                            onChange = {(e) => setSearch(e.target.value)}                                    
                            />
                                  
                        {filteredBusniss.map((busine, idx) => (
                                <TableBusiness key={idx} {...busine} />
                        ))}
                
                    </div>
                    <div className="col-6" align="right">
                    {/*  Boton para abrir el modal*/}
                    <Button color="success" onClick={abrirModal}><PlusCircle className="mr-1"/> Agregar Empresa</Button>
                    </div>
                </div>
                {/* Modal de registro de empresa */}
                <ModalRegistroEmpresa abierto={ abierto } cerrarModal={ cerrarModal } updateEmpresas={ updateEmpresas }/>
                <br></br>
                </div>
                );
                }
        
    const TableBusiness = (props) => {
        const [count, setCount] = useState(0);
            return(
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped" >
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Empresa</th>
                                    <th scope="col">NIT</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Rubro</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                
                               {/*  {props.empresas.map((empresa,index) => {
                                        return(
                                            <tr key={empresa.id}>
                                                <td scope="row">{index+1}</td>
                                                <td>{empresa.nameEmpresa}</td>
                                                <td>{empresa.nit}</td>
                                                <td>{empresa.direction}</td>
                                                <td>{empresa.phone}</td>
                                                <td>{empresa.email}</td>
                                                <td>{empresa.rubro}</td>
                                            </tr>
                                        );
                                })} */}
                                <tr key={props.id}>
                                        <td scope="row">{count+1}</td>
                                        <td>{props.nameEmpresa}</td>
                                        <td>{props.nit}</td>
                                        <td>{props.direction}</td>
                                        <td>{props.phone}</td>
                                        <td>{props.email}</td>
                                        <td>{props.rubro}</td>
                                  </tr> 
                            </tbody>
                        </table>
                    </div>
                </div>
                )
        }


export default ListaEmpresa
