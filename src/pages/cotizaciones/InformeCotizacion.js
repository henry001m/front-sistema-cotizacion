
import React, { useState } from 'react'
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
import { EditorState, convertToRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import swal from 'sweetalert';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { createReportQuotitation } from '../../services/http/ReportQuotitationService';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

function InformeCotizacion (props) {

    const user = JSON.parse(window.localStorage.getItem("userDetails"));
    const userName= user.user.name+" "+user.user.lastName

    const[ date, setDate] = useState(new Date())
    const[ editorState, setEditorState ] = useState(EditorState.createEmpty())
    const [message, setMessage] = useState("");
    const [msg, setMsg] = useState("");

    const closeModal = () => {
        setDate(new Date())
        setMessage("");
        setMsg("");
        setEditorState(EditorState.createEmpty())
        props.cerrarModal()
    }

    const onEditorStateChange = (editorStat) => {
        setEditorState(editorStat);
    };

    const InformeState = () => {
        if(props.report!=null){

            const blocksFromHtml = htmlToDraft(props.report.description);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const state = EditorState.createWithContent(contentState);

            return(
                <Editor
                    editorState={state}
                    wrapperClassName = "wrapper-class" 
                    editorClassName = "editor-class" 
                    toolbarClassName = "toolbar-class"
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                    }}
                    readOnly
                />
            )
        }else{
            return(
                <Editor
                    editorState={editorState}
                    wrapperClassName = "wrapper-class" 
                    editorClassName = "editor-class" 
                    toolbarClassName = "toolbar-class"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                    }}
                />
            )
        }
    }

    const onSubmit = async ( ) => {
        const htm = {
            dateReport:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            aplicantName: userName, 
            description:draftToHtml(convertToRaw(editorState.getCurrentContent())),
            request_quotitations_id:props.id
        }
        const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text
        if(text.length>0){
            try {
                if(props.rejectRequest){
                    props.rejectRequest()
                }
                setMsg("Se adjunto el cuadro comparativo...");
                const result = await createReportQuotitation(htm);
                swal({
                    text: result.message,
                    button: "Aceptar",
                });
                props.setinformeEnviado(true);
                setEditorState(EditorState.createEmpty())
                closeModal()
            } catch (error) {
                console.log(error);
            }
        }else{
            setMessage("El campo es requerido");
        }    
    }

    return(
        <div>
            <Modal isOpen={props.abierto} >
                <ModalHeader toggle={closeModal}>
                    <h4>Informe de Cotización</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-7">
                            <div className="form-row">
                               <label><strong>Encargado:</strong></label> 
                                {(props.report!=null)?
                                    (<label>{props.report.aplicantName}</label>):
                                    (<label>{" "+userName}</label>)
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-5">
                            <div className="form-row">
                                <label><strong>Fecha : </strong></label> 
                                {(props.report!=null)?
                                    (<label>{props.report.dateReport}</label>):
                                    (<label>{" "+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()}</label>)
                                }
                            </div>
                        </div>
                    </div>
                    {
                        InformeState()
                    }
                    <span style={{color:'red'}}>{message}</span>
                    <br></br>
                    <label style={{color:'green'}}>{msg}</label>
                    <div className="form-col" style={{textAlign:"right"}}>
                        <button className="btn btn-secondary" style={{marginRight:"5px"}} onClick={closeModal}>Cancelar</button>
                        {(props.report!=null)?
                            (<button className="btn btn-primary" disabled> Enviar </button>):
                            (<button className="btn btn-primary" onClick={onSubmit}> Enviar </button>)
                        }
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default InformeCotizacion;
