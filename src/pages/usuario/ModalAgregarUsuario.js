import React from 'react'

function ModalAgregarAdquisicion(){
    return(
        <div class="modal fade" id="modalAgregarAdquisicion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombres:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellidos:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Carnet de Identidad:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Telefono:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Direccion:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Correo Electronico:</label>
                                <input type="text" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Tipo de usuario:</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Rol de Usuario:</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary">Guardar</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAgregarAdquisicion;