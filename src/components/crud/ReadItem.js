import { useThemeContext } from "../../theme/ThemeContext.js";
import { myColor } from '../../global.js';
import { useMemo, useCallback, memo } from "react";

const ReadItem = ({ classType, Icon, item, setOpen }) => {
  const { theme } = useThemeContext();

  const { keys, valuesData } = useMemo(() => {                       // 👈 Preprocesa solo si cambian item o classType
    const obj = item[classType] ?? {};
    const k = Object.keys(obj);
    const v = Object.values(obj).map(value => typeof value === "object" ? `${Object.values(value)[0]} ${Object.values(value)[1]}` : value );
    return { keys: k, valuesData: v };
  }, [item, classType]);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);  // 👈 Memorized handler

  if (process.env.NODE_ENV === 'development') console.log('[Read Item ✔️]');

  return (
    <>
      <div className="modalContainer justify-items-center">
        <div className="modalBox" data-theme={theme}>
          <div className="modalHeader">
            <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className="center" /></center>
            <h6 className="modalTitle century-gothic main-color pt-2">
              { classType.charAt(0).toUpperCase() + classType.slice(1) }
            </h6>
          </div>
          <div className="modalContent">
            <div className="container-fluid modalTable mt-2 overflow-auto">
              <div className="row modalTableTitle flex-nowrap">
                <div className="col-6">Parámetro</div>
                <div className="col-6">Datos</div>
              </div>
              <div className="row bg-row flex-nowrap">
                <div className="col-6 modalTableData text-start">Código</div>
                <div className="col-6 modalTableData text-start">{item._id}</div>
              </div>
              { valuesData.map((data, index) => (
                 <div key={`${keys[index]}-${index}`} className="row bg-row flex-nowrap">
                   <div className="col-6 modalTableData text-start">{ keys[index].charAt(0).toUpperCase() + keys[index].slice(1) }</div>
                   <div className="col-6 modalTableData text-start">{ data }</div>
                 </div>
              ))}
            </div>
          </div>
          <div className="modalFooter">
            <div className="d-grid mt-2 w-100">
              <button className="aceptBtn mx-auto w-50" onClick={handleClose}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="darkBackground" onClick={handleClose}></div>
    </>
  );
};

export default memo(ReadItem);
