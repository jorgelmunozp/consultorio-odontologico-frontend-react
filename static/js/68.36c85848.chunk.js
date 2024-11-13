"use strict";(self.webpackChunkconsultorio_odontologico_frontend_react=self.webpackChunkconsultorio_odontologico_frontend_react||[]).push([[68],{5186:(e,t,s)=>{s.d(t,{O:()=>l});var o=s(5043),a=s(4446),n=s(5356);class l{constructor(e){let{classType:t=""}=e;this.getData=()=>{let e=[],t="";switch(this.classType){case"paciente":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/pacientes.json";break;case"doctor":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/doctores.json";break;case"consultorio":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/consultorios.json";break;case"tratamiento":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/tratamientos.json";break;case"eps":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/epss.json";break;case"genero":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/generos.json";break;case"especialidad":t="https://jorgelmunozp.github.io/consultorio-odontologico-backend-node/especialidades.json"}const s=(0,n.s)(t);(0,o.useEffect)((()=>{s.status>=400&&(0,a.F)({type:"error",title:"Error en la conexi\xf3n con la base de datos"}).launch()}),[s]),void 0!==s.data.length&&(e=s.data);const[l,r]=(0,o.useState)(5),[c,i]=(0,o.useState)([0,l]),d=Math.floor(e.length/l),p=e.length%l;let u=[],g=[!0];if(0!==p)for(let o=0;o<=d;o++)u.push(o),o<0&&g.push(!1);else if(0===p)for(let o=0;o<d;o++)u.push(o),o<0&&g.push(!1);const[h,m]=(0,o.useState)(g);return{array:e,pagination:{itemsPerPage:l,indexPage:c,activePages:h,indexPages:u,setIndexPage:i,setActivePages:m}}},this.classType={classType:t}.classType}get data(){return this.getData()}}},8509:(e,t,s)=>{s.d(t,{i:()=>x});var o=s(5043),a=s(4446),n=s(5186),l=s(7333),r=s(4021),c=s(3959),i=s(9727),d=s(5938),p=s(7466),u=s(7283),g=s(7822),h=s(579);const m=e=>{let{endIcon:t,title:s,urlApi:o,dataApi:n,setResponseStatus:l,className:r}=e;console.log("dataApi BotonFetch: ",n);return(0,h.jsxs)("button",{onClick:()=>{0===n.length?(0,a.F)({type:"warning",title:"Debes ingresar todos los datos"}).launch():(0,g.V)(o,n,l)},className:r,children:[" ",s," ",t," "]})};s(1279),s(4420);const x=e=>{let{classType:t,Icon:s,isMenuOpen:g}=e;const[x,b]=(0,o.useState)(!1),[y,j]=(0,o.useState)(0),w={cita:{Classe:l.W},paciente:{Classe:r.QY},doctor:{Classe:r.AY},consultorio:{Classe:i.S},tratamiento:{Classe:d.T},especialidad:{Classe:c.N}},f=new w[t].Classe(""),k=f.state,C=f.api;let v="";return console.log("state: ",k),0===k.filter((e=>""===e.value)).length&&(k.forEach((e=>f[e.key]=e.value)),v=`JSON.stringify({                           \n      ${w[t].Classe.name.toLowerCase()}: ${JSON.stringify(f)}\n    })`,console.log("item: ",v)),200<=y&&y<=299?(console.log("state CreateItem: ",k),console.log("objectClass CreateItem: ",f),k.forEach((e=>e.setState(""))),k.forEach((e=>f[e.key]="")),(0,a.F)({type:"success",title:"Registro exitoso"}).launch(),j(0)):(400<=y&&y<=499||500<=y&&y<=599)&&((0,a.F)({type:"error",title:"Error en el registro"}).launch(),j(0)),(0,h.jsx)("div",{className:"App",children:(0,h.jsxs)("div",{className:"mt-4 mt-sm-5",children:[(0,h.jsx)("center",{children:(0,h.jsxs)("h5",{className:"century-gothic main-color fs-sm-2",children:["Registrar ",t.charAt(0).toUpperCase()+t.slice(1)]})}),(0,h.jsxs)("div",{className:"container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 px-0 me-0 smooth "+(g?" w-responsive":" px-sm-5 w-100"),children:[k.map((e=>{const t=new n.O({classType:e.key}),{array:s,pagination:o}=t.getData();return(0,h.jsx)("div",{className:"row",children:"dropdown"===e.type?(0,h.jsx)("div",{className:"col",children:(0,h.jsx)(p.m,{classType:e.key,array:s,handleChange:e.handleChange,placeholder:e.key.charAt(0).toUpperCase()+e.key.slice(1),pagination:o,className:"input form-control rounded border-muted border-1 text-muted shadow-sm"})}):(0,h.jsx)("div",{className:"col",children:(0,h.jsx)(u.p,{type:e.type,handleChange:e.handleChange,placeholder:e.key.charAt(0).toUpperCase()+e.key.slice(1),className:"input form-control rounded border-muted border-1 text-muted text-center shadow-sm"})})},"row"+e.key)})),(0,h.jsx)("div",{className:"row mt-4 mt-sm-5",children:(0,h.jsx)("div",{className:"col",children:(0,h.jsx)(m,{endIcon:(0,h.jsx)(s,{}),title:"Registrar",urlApi:C,dataApi:v,setResponseStatus:j,className:"button rounded border-0 py-3 shadow-sm"})})})]})]})})}},5068:(e,t,s)=>{s.r(t),s.d(t,{CreatePaciente:()=>n,default:()=>l});var o=s(8509),a=s(579);const n=e=>{let{Icon:t,isMenuOpen:s}=e;return(0,a.jsx)(o.i,{classType:"paciente",Icon:t,isMenuOpen:s})},l=n},7466:(e,t,s)=>{s.d(t,{m:()=>i});var o=s(5043),a=s(2864),n=(s(6587),s(1279)),l=s.n(n),r=s(4420),c=s(579);const i=e=>{let{classType:t,placeholder:s,array:n,defaultSelect:l="",handleChange:r,pagination:i,className:p}=e,[u,g]=(0,o.useState)(l);const[h,m]=(0,o.useState)(!1);return(0,c.jsxs)("div",{className:"dropdown form-floating w-100 min-width-10 py-sm-0 px-0",children:[(0,c.jsx)("button",{onClick:()=>m(!1===h),onChange:r,className:p+(0===u.length?" dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100":" dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100"),type:"button",id:"selectButton","data-bs-target":"#dropdownMenu"+t,"aria-controls":"dropdownMenu"+t,"aria-expanded":"false",children:0===u.length?s:u}),(0,c.jsx)("label",{htmlFor:"selectButton",className:"form-label text-muted text-nowrap text-truncate",children:0===u.length?"":s}),(0,c.jsxs)("ul",{id:"dropdownMenu"+t,className:"dropdown-menu text-center shadow-sm w-100 overflow-auto slideIn smooth"+(h?" collapse show":""),style:0===n.length?{maxHeight:"0rem"}:{maxHeight:"12rem"},"aria-labelledby":"selectButton",children:[n.slice(i.indexPage[0],i.indexPage[1]).map(((e,s)=>{switch(t){case"paciente":case"doctor":u=e[t].nombre+" "+e[t].apellido;break;case"consultorio":u=e[t].numero+" "+e[t].nombre;break;case"tratamiento":u=e[t].especialidad;break;case"eps":case"genero":case"especialidad":u=e[t].nombre}return(0,c.jsx)(d,{value:u,setValue:g,setOpen:m,handleChange:r},t+"Option"+s)})),(0,c.jsx)(a.Y,{array:n,itemsPerPage:i.itemsPerPage,indexPage:i.indexPage,activePages:i.activePages,indexPages:i.indexPages,setIndexPage:i.setIndexPage,setActivePages:i.setActivePages})]})]})},d=e=>{let{value:t,setValue:s,setOpen:o,handleChange:a}=e;return(0,c.jsx)("li",{children:(0,c.jsx)("button",{className:"dropdown-item",value:l()(t,"3lC0nsult0r10"),onClick:e=>{s((0,r.s)(e.target.value)),o(!1),a(e)},children:t})})}},7822:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>fetchCreate});const fetchCreate=(urlApi,dataApi,setResponseStatus)=>{fetch(urlApi,{method:"POST",body:eval(dataApi),headers:{"Content-type":"application/json"}}).then((e=>{e.json(),200<=e.status&&e.status<=299?(console.log("POST "+e.status+" Registro exitoso"),setResponseStatus(e.status)):400<=e.status&&e.status<=499?(console.log("POST "+e.status+" Registro fallido: Error en el env\xedo de datos"),setResponseStatus(e.status)):500<=e.status&&e.status<=599&&(console.log("POST "+e.status+" Registro fallido: Error en el servidor remoto"),setResponseStatus(e.status))})).catch((e=>{const t=e.toString().split(":")[1].trim();"Failed to fetch"===t?(console.log(e.status+" Registro fallido"),setResponseStatus("Registro fallido: No hay conexi\xf3n con la base de datos")):setResponseStatus("Registro fallido: "+t)}))}}}]);
//# sourceMappingURL=68.36c85848.chunk.js.map