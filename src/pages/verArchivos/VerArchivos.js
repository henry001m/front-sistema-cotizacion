
import React from "react"
import './VerArchivos.css'


export default function VerArchivos(){

    return(
        <>
        <div className="title-files">
            <div className="title">
                <h2>Archivos</h2>
            </div>
            <div className="icon">
                <button><i class="fas fa-times"></i></button>
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
