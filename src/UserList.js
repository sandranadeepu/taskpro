import React,{useEffect,useState,useCallback} from 'react';
import {useDispatch} from 'react-redux'
import {loadUser} from './actions/users';
import firebaseDb from './fbase'

const UserList = ({userdetails}) => {
    const [dataSet,setDataSet]=useState({
        accKey:'',
        accDetails:''
    })
    const [isOpen, setOpen] =useState(false);

    const dispatch=useDispatch()
    const userload=useCallback(
         () => {
          let dataSet = [];
  
          firebaseDb.child('/accounts').on('value',  (snapshot)=> {
            console.log(snapshot.val(),'acc1')

            snapshot.forEach( (childSnapshot) =>{ 
                  console.log(childSnapshot.key,'acc',userdetails.account)
                  if(userdetails.account==childSnapshot.key){
                      setDataSet({acckey:childSnapshot.key,accDetails:childSnapshot.val().apps})
                  }
            })
          })
        },
        [dispatch]
    )
  useEffect( ()=>{
     userload()
    
  },[userload])
    return (
        <>

<li className="accordion-wrapper" style={{listStyleType:'none'}}>
      
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {userdetails.name}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""} acc`}>
        <div className="accordion-content">accounts:
                <h6>{Object.keys(dataSet.accDetails)[0]}</h6>
                <p>{dataSet.accDetails?Object.values(dataSet.accDetails)[0].title:''}</p>
            </div>
      </div>
    </li>
         {/* <li >
            <div>user:{userdetails.name}</div>
            <div>accounts:
                <h6>{Object.keys(dataSet.accDetails)[0]}</h6>
                <p>{dataSet.accDetails?Object.values(dataSet.accDetails)[0].title:''}</p>
            </div>
        </li> */}
        
        </>
    )
}

export default UserList;