import { useState } from 'react';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { ReadItem } from './ReadItem';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';
import { Modal } from '../modal/Modal';
import { Arrows } from '../../forms/arrows/Arrows';
import { SearchBar } from '../search/SearchBar';
import { PaginationBar } from '../pagination/PaginationBar';
import { TbHomeSearch, TbHomeEdit, TbHomeX } from "react-icons/tb";
import { HomeIndex } from '../icons/home/HomeIndex';
import { HomeEdit } from '../icons/home/HomeEdit';
import { Success } from '../icons/success/Success';
import { Warning } from '../icons/warning/Warning';
import { Error } from '../icons/error/Error';
import 'bootstrap/dist/js/bootstrap.bundle';

const Row = ({ classType,item,urlApi,state }) => {
  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alert, setAlert] = useState(false); 
  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  return (
        <>
          <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
          {
            Object.values(item[classType]).map((item,index) => { return(
              <td key={'item'+index} className='ps-2 ps-sm-3 text-nowrap'>{ typeof item !== 'object' ? item : Object.values(item)[0] + ' ' + Object.values(item)[1] }</td>
            )})
          }
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setReadOpen(true) }><TbHomeSearch className='text-secondary'/></button></td>
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setUpdateOpen(true) }><TbHomeEdit className='text-secondary'/></button></td>
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setDeleteOpen(true)}><TbHomeX className='text-secondary'/></button></td>
          
          { readOpen && <ReadItem classType={classType} Icon={HomeIndex} item={item} setOpen={setReadOpen} /> }
          { updateOpen && <UpdateItem classType={classType} Icon={HomeEdit} item={item} urlApi={urlApi} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
          { deleteOpen && <DeleteItem classType={classType} Icon={Warning} item={item} urlApi={urlApi} setOpen={setDeleteOpen} setAlert={setAlert} />  }
          { alert === 'successUpdate' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Actualización exitosa'} buttons={1} />  }
          { alert === 'successDelete' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Eliminación exitosa'} buttons={1} />  }
          { alert === 'errorUpdate' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Actualización'} buttons={1} />  }
          { alert === 'errorDelete' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Eliminación'} buttons={1} />  }
        </>
      )
  }; 

export const QueryItems = ({ classType }) => {

  let Classe = '';
  switch (classType) { case 'cita' : Classe = Cita; break;
                       case 'paciente': Classe = Paciente; break;
                       case 'doctor': Classe = Doctor; break;
                       case 'consultorio': Classe = Consultorio; break;
                       case 'tratamiento': Classe = Tratamiento; break;
  }

  const objectClass = new Classe('');                                         // Objeto instanciado con la Class
  const urlApi = objectClass.api;
  const titles = objectClass.titles;
  const state = objectClass.state;

  const { queries,setQueries,arrayFiltered,alertFetch,indexPage,itemPerPage,activePages,indexPages,setAlertFetch,setIndexPage,setActivePages } = objectClass.data;
  const { SortByProperty, setSortBy } = objectClass.sort;
  
  return (
    <div className="App">
      <div id="contenidoConsultorios">
      <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + "s" }</h5>
      <SearchBar icon={<TbHomeSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />

      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr className="">
              {
                titles.map((title,index) => { return( <th key={'title'+title} className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{ title }</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy( 1 + index*2 )}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy( 2 + index*2 )}><Arrows direction={"down"}/></button></th></tr></thead></table></th> )})
              }
              <th className='p-0' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              arrayFiltered.sort(SortByProperty).slice(indexPage[0],indexPage[1]).map((item) => { return (
                <tr id={ 'row'+item.id } key={ item.id }>
                  <Row classType={classType} item={item} urlApi={urlApi} state={state} />
                </tr>
              )})
            }
          </tbody>
        </table>
        </div>
        <PaginationBar array={arrayFiltered} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
        </center>
      </div>
      { alertFetch && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlertFetch} title={'Error en la conexión con el servidor'} buttons={1} /> }
    </div>
  );
};