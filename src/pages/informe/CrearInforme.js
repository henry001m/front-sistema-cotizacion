
import React, { useState } from 'react'
import {Modal, ModalHeader, ModalBody } from 'reactstrap'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './CrearInforme.css'

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

function CrearInforme (props) {

    const [html, setHtml] = useState(null)
    const[ date, setDate] = useState(new Date())
    const[ editorState, setEditorState ] = useState(EditorState.createEmpty())
    const[json, setJson] = useState(null)

    const closeModal = () => {
        props.cerrarModal()
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        console.log(editorState.getCurrentContent())
    };

    const onContentStateChange = (contentState) => {
        setJson(contentState)
        console.log("contenido",JSON.stringify(contentState))
    }

    const convertFromJSONToHTML = (editorState) => {
        console.log("entro",convertToRaw(editorState.getCurrentContent()))
        try{
            return { __html: html}
        } catch(exp) {
            console.log(exp)
            return { __html: 'Error' }
        }
    }

    const onSubmit = () => {
        setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        setJson(editorState.getCurrentContent())
    }

    return(
        <div>
            <Modal isOpen={props.abierto} >
                <ModalHeader toggle={closeModal}>
                    <h4>Agregar Informe</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="form-row">
                                <h5>Encargado: </h5>
                                <label>nameEncargado</label>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="form-row">
                                <h5>Fecha: </h5>
                                <label>{ date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDay()}</label>
                            </div>
                        </div>
                    </div>
                    <Editor
                        editorState={editorState}
                        wrapperClassName = "wrapper-class" 
                        editorClassName = "editor-class" 
                        toolbarClassName = "toolbar-class"
                        onEditorStateChange={onEditorStateChange}
                        onContentStateChange={onContentStateChange}
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                        }}
                    />
                    { (html!=null) &&
                        <div dangerouslySetInnerHTML={convertFromJSONToHTML(editorState)} ></div >
                    }
                    <textarea
                        style={{width:"100%", height:"100px"}}
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                    <button onClick={onSubmit}> enviar </button>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CrearInforme;
