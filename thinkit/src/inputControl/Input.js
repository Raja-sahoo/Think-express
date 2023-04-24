import React from "react";
 const Input = ({lbl, type, name, value, errMsg, isShowErr, fnChange, options, values, names, uname, gender})=>{ 
    const prepareInputControls = ()=>{
        switch(type){
            case 'text': 
                return <input onChange={(e)=>fnChange(e)} className="form-control" type={type}  value={value} name={name} />
            case 'radio':
               return options.map((v,i)=>{
                const isChecked = values[i] === value;
                    return <span key={i}><input onChange={(e)=>fnChange(e)} value={values[i]} type={type} name={name}   checked={isChecked} /><span className="ms-2 me-3">{v}</span></span>
                })
        }
    }
    return <div className="row mb-3">
        <div className="col-sm-4">
            <p className="label m-space"><b>{lbl}*</b></p>
            </div>
        
        <div className="col-sm-4">
            {prepareInputControls()}
        </div>
        <div className="col-sm-4 text-start">
            {isShowErr && <b className="text-danger">{errMsg}</b> }
        </div>
    </div>

}

export default Input;
