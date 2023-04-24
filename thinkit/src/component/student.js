import React, { useState, useEffect } from 'react';
import axios from "axios"
import Input from "../inputControl/Input";
import Select from '../inputControl/Select';
import { baseURI } from '../shared/servercall';

const inputControls = [
  {
    lbl: 'Name',
    tagName: 'input',
    type: 'text',
    name: 'uname',
    value: '',
    errMsg: 'please enter Name',
    isShowErr: false,
    // id:null
  },
  {
    lbl: 'Gender',
    tagName: 'input',
    type: 'radio',
    name: 'gender',
    options: ['male', 'female'],
    values: ['M', 'F'],
    value: '',
    errMsg: 'please select Gender ',
    isShowErr: false,
    // id:null
  },
  {
    lbl: 'Class',
    tagName: 'select',
    name: 'class',
    options: ['class1', 'class2', 'class3', 'class4', 'class5'],
    values: ['class1', 'class2', 'class3', 'class4', 'class5'],
    errMsg: 'please select Class',
    value: '',
    isShowErr: false,
    // id:null
  }
]

const Student = () => {

  const [data, setData] = useState([])
  const [template, setTemplate] = useState('')
  const [act, setAct] = useState(false)
  const [loadApi, setLoadApi] = useState(false)

  const [idn, setIdn] = useState(null)
  const [temp, setTemp] = useState(true)
  const [cancels, setCancels] = useState(true)


  useEffect(() => {
    funPrepareRegTemplate()
  }, [data, act])

  useEffect(() => {
    axios.get(`${baseURI}/get`)
      .then((res) => {
        setData(res.data)
        funPrepareRegTemplate();
        setLoadApi(true)
      })

  }, [loadApi])

  // add all
  const fnRegister = () => {
    let dataObject = {}
    inputControls.forEach((obj) => {
      if (!obj.value) {
        obj.isShowErr = true;
      }
      dataObject[obj.name] = obj.value;
    })

    axios.post(`${baseURI}/save`, { task: dataObject }).then((res) => console.log(res));
    setLoadApi(((prev) => !prev))
    reset()
    setTemp(true)

  }


  //update object onchange
  const fnChange = (e) => {
    const { name, value, } = e.target;
    const inputControlObject = inputControls.find((obj) => {
      return obj.name === name;
    })
    inputControlObject.value = value;
    inputControlObject.isShowErr = false;
    if (!value) {
      inputControlObject.isShowErr = true;
    }

    funPrepareRegTemplate();


    const everyAction = inputControls.every((obj) => {
      return obj.value.length > 0
    })
    setTemp(!everyAction)
    console.log(inputControls, everyAction)


  }



  // reset
  const reset = () => {

    inputControls.map((obj) => {
      return obj.value = ''
    })
    funPrepareRegTemplate();
    setTemp(true)
    setCancels(true)
    setAct(false)
  }

  // delete 
  const handelDelete = (e, id) => {
    axios.delete(`${baseURI}/delete/${id}`).then((res) => {
      console.log(res)
      setLoadApi(((prev) => !prev))
      funPrepareRegTemplate();
    })
  }

  // edit action 
  const handelEdit = (e, id, obData) => {
    // console.log(obData);
    if (obData._id === id) {
      inputControls.forEach((item, i) => {
        item.value = obData.task[item.name]
      })
      // console.log(inputControls);
      setIdn(id)
      funPrepareRegTemplate();
    }
    setAct(true)
    setCancels(false)
  }

  // update same edit action
  const fnUpdate = () => {

    let newObj = {}
    inputControls.forEach((obj) => {
      if (!obj.value) {
        obj.isShowErr = true;
      }
      newObj[obj.name] = obj.value;
    })
    axios.put(`${baseURI}/update/${idn}`, { task: newObj }).then((res) => console.log(res));
    setLoadApi(((prev) => !prev))
    reset()
    setAct(false)
  }


  // return the function with JSX template as per the condition 
  const funPrepareRegTemplate = () => {
    const templateArr = inputControls.map((obj, index) => {
      switch (obj.tagName) {
        case 'input':
          return <Input key={index} {...obj} fnChange={fnChange} />

        case 'select':
          return <Select key={index} {...obj} fnChange={fnChange} />
        default:
          break;
      }
    })
    setTemplate(templateArr);
  }
  let tabaleKey = ["Id", "Name", "Gender", "Class", "Action"]
  return (
    <div>
      <div className='container'>
        <h1 className='mt-3 mb-3 text-center'>Register</h1>
        {template}
        <div className="row">
          <div className="offset-sm-4 mb-footer col-sm-5">
            {/* {act ===false ? <button onClick={fnRegister} className="btn btn-lg btn-primary" disabled={temp}>Add</button> 
            : <button onClick={fnUpdate} className="btn btn-lg btn-primary" disabled={temp}>Update</button>} */}


            {(!act && cancels) && <button onClick={fnRegister} className="btn btn-lg btn-primary" disabled={temp}>Add</button>}
            {(act && !cancels) && <button onClick={fnUpdate} className="btn btn-lg btn-primary" disabled={temp}>Update</button>}




            <button onClick={reset} className="btn btn-lg btn-primary" >Cancel</button>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              {tabaleKey.map((item, i) => {
                if (i === tabaleKey.length - 1) {
                  return <td key={i} colSpan="2">{item}</td>;
                } else {
                  return <td key={i}>{item}</td>;
                }
              })}
            </tr>
          </thead>
          <tbody >
            {data?.map(item => {

              return <tr key={item._id} >
                <td>{item._id.substring(20, 24)}</td>
                <td>{item.task.uname}</td>
                <td>{item.task.gender}</td>
                <td>{item.task.class}</td>
                <td><button onClick={(e) => handelEdit(e, item._id, item)} className='btn btn-info'>edit</button></td>
                <td><button onClick={(e) => handelDelete(e, item._id)} className='btn btn-danger'>delete</button></td>
              </tr>

            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Student;
