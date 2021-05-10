
import React from "react"
import './VerArchivos.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css';



export default function VerArchivos(){

    return(
    <>
        <div className="title-files">
            <div className="title">
                <h2>Archivos</h2>
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
            </table>
          </form>
        </div>
    </>);
    
}
