import React from "react";
 const Select = ({lbl,tagName, name, value, errMsg, isShowErr, fnChange, options, values, names })=>{ 
    return <div className="row mb-3">
        <div className="col-sm-4">
        <p className="label m-space"><b>{lbl}*</b></p>
            </div>
        
        <div className="col-sm-4">
            <select onChange={(e)=>fnChange(e)} name={name} className="form-control" >
                <option value={''}>please select class</option>
                {
                    options.map((v,i)=>{
                        const isSelect = values[i] === value
                        return <option selected={isSelect} key={i} value={values[i]}>{v}</option>
                    })
                }
            </select>
        </div> 
        <div className="col-sm-4 text-start">
            {isShowErr && <b className="text-danger">{errMsg}</b> }
        </div>
    </div>

}
export default Select

