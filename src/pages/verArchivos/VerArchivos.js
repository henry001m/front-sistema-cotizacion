
import React,{useState, useEffect} from "react"
import './VerArchivos.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import {getFiles,getDowloadFile} from '../../services/http/filesService';
import FileViewer from "react-file-viewer";


export default function VerArchivos(){
    const [listNameFile, setListNameFile] = useState([])
    let nameFile = "";
    const verFile = async(e)=>{
       
    }
    const file = 'http://127.0.0.1:8000/api/showFile/1/124456-PedidoMaterial_(4).pdf';
    const type = 'pdf'
    const onError = e => {
        console.log(e, "error in file-viewer");
    };
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getFiles(1);
            console.log(response)
            setListNameFile(response);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [])
    return(
    <>
        <div className="title-files">
            <div className="title">
                <h2>Archivos</h2>
                <button ><i className="bi bi-x" ></i></button>
            </div>
        </div>
        <hr/>
        <div className="form-row" id="list">
            <form className="files">
            <table className="table table-files">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Documento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listNameFile.map((name,index)=>{
                           return(
                            <tr>
                                <td>{index+1}</td>
                                {/* <td><button style={{style:"none"}}></button></td> */}
                                <td style={{cursor:"pointer"}} onClick={()=>{nameFile=name;verFile()}}>{name}</td>
                            </tr>
                            
                           );
                        })
                    }
                </tbody>
            </table>
          </form>
        </div>
        <FileViewer fileType={type} filePath={file} onError={onError} />
    </>);
    
}
