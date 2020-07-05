import React, { useState, useCallback, useEffect } from 'react';

import { setContentCurrentFolderRequest } from '../../store/modules/folder/actions';

import { useDispatch, useSelector } from 'react-redux';

import {useDropzone} from 'react-dropzone'
import { 
  MdDelete, 
  MdViewHeadline, 
  MdGetApp, 
  MdFolder,
  MdArrowBack,
  MdCreateNewFolder
} from 'react-icons/md';

import { Container, Header, Files, ContextMenuStyle, Scroll, ContainerDrag } from './styles';

export default function FileArea({ showModal }) {
  /* FLOW CONTROL */
  const dispatch = useDispatch();

  /* FOLDERS */
  const currentFolderContent = useSelector((state) => state.folder.folderContent);
  const rootFolder = useSelector((state) => state.folder.rootFolder);

  const father = useSelector((state) => state.folder.father);

  const [currentFolderId, setCurrentFolderId] = useState();
  const [nextFolder, setNextFolder] = useState();
  const [prevFolder, setPrevFolder] = useState(0);
  const [itemActive, setItemActive] = useState(0);

  /*For Context */
  const [contextMenu, setContextMenu] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  /* ROOT FOLDER */
  useEffect(()=>{
    dispatch(setContentCurrentFolderRequest(rootFolder));
    setCurrentFolderId(rootFolder);
    setPrevFolder(0);
    setItemActive(0);
  }, []);
  
  /* NEXT FOLDER */  
  useEffect(()=>{
    if(itemActive !== 0) {
      dispatch(setContentCurrentFolderRequest(nextFolder));
      setCurrentFolderId(nextFolder);
      setPrevFolder(currentFolderId);
      setItemActive(0);
    }
  },[nextFolder])

  /* BACK FOLDER */
  function handleBackFolder(){
    if(prevFolder !== rootFolder && prevFolder !== 0) {
      dispatch(setContentCurrentFolderRequest(prevFolder));
      setNextFolder(0);
      setCurrentFolderId(prevFolder);
      setPrevFolder(father);
      setItemActive(0);
    }
  }

  function handleClickContext(e) {
    e.preventDefault();
    setX(e.clientX);
    setY(e.clientY);

    setContextMenu(!contextMenu);
  }

  function handleClickOutContext(){
    setContextMenu(false);
  }

  function handleDoubleClick(id) {
    if(itemActive === id) {
      setNextFolder(id);
    }else {
      setItemActive(id);
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log(file);
    })
    

  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <Container>
      <Header>
        <button onClick={handleBackFolder}>
          <MdArrowBack size={24}/>
        </button>
        <h1>Armazenamento</h1>
        <ul>
          <li>
            <button>
              <MdDelete size={24} />
            </button>
          </li>
          <li>
            <button>
              <MdViewHeadline size={24} />
            </button>
          </li>
        </ul>
      </Header>
      <div className="dropzone">
      <ContainerDrag {...getRootProps()}>
        {isDragActive ?
          <div className="drop-area">
            <input {...getInputProps()} />
            <MdGetApp id="arrow-down" size={40} />
          </div>
          :
          <Files onContextMenu={handleClickContext} onClick={handleClickOutContext} display="grade">
            <div className="header">
              <p id="name">
                Nome
              </p>
              <p id="owner">Proprietário</p>
              <p id="createdAt">Criação</p>
              <p id="size">Tamanho</p>
            </div>
            <Scroll >
              {currentFolderContent 
              && 
              currentFolderContent.map(folder => folder && (
                <div 
                  key={folder.id} 
                  className="row"
                  onClick={()=>handleDoubleClick(folder.id)}
                  id={itemActive === folder.id ? 'active' : 'normal'}
                >
                  <div id="name">
                    <MdFolder size={24} />
                    {folder.name}
                  </div>
                  <div id="owner">Eu</div>
                  <div id="createdAt">{folder.createdAt}</div>
                  <div id="size">1mb</div>
                </div>
              ))
            }
          </Scroll>
        </Files>
        }
      </ContainerDrag>  
      </div>
      <ContextMenu show={contextMenu} x={x} y={y} />
    </Container>
  );
}

function ContextMenu({ show, x, y }) {
  return (
    <div className="menu">
      {show && 
        <ContextMenuStyle x={x} y={y} >
          <ul>
            <li>
              <button>
                <MdCreateNewFolder size={24} />
                Criar pasta
              </button>
            </li>
            <li>
              item2
            </li>
            <li>
              item3
            </li>
          </ul>
        </ContextMenuStyle>
      }
    </div> 
  );
}
