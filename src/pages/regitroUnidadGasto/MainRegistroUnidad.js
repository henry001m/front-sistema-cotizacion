import React from 'react'

const MainRegistroUnidad = () => {
    return (
        <div className="container" align="left">
        <br></br>
        <h1>Unidades de Gasto</h1>
        <br></br>
    <div className="row">
        <div className="col-6">
            <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>
        </div>
        <div className="col-6" align="right">
           {/*  Aqui debe venir el boton modal agragar unidad de gasto*/}
           <button>Agragar Unidad de Gasto</button>
        </div>
    </div>
    <br></br>
    <div className="form-register">             
        <div className="form-row">
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Facultad</th>
                    <th scope="col">Unidad Administrativa</th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
        </div>
    </div>
</div>
    )
}

export default MainRegistroUnidad
