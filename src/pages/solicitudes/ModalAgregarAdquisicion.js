import React from 'react'

function ModalAgregarAdquisicion(){
    return(
        <div class="modal fade" id="modalAgregarAdquisicion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Cantidad:</label>
                                <input type="integer" className="form-control"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Cantidad:</label>
                                <input type="integer" className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Descripcion:</label>
                                <textarea className="form-control"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAgregarAdquisicion;