import React,{useEffect,useState,useCallback} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {loadUser} from './actions/users';
import firebaseDb from './fbase'
import BeautyStars from 'beauty-stars';

const UserList = ({userdetails,id,func}) => {
    const [dataSet,setDataSet]=useState({
        accKey:'',
        accDetails:''
    })
    const rates = useSelector(state=>state.rating.rating)

//   let  rating=()=>{
     
//         console.log(rate[0],'r')
//         return rate[0];
// }
// console.log(rating(),'rates')
    const [star,setStar]=useState(0)

    const [isOpen, setOpen] =useState(false);

    const dispatch=useDispatch()
    const fetchrates=()=>{
        rates.forEach((value)=>{
            console.log(value,'fcc')
           if(value.user==userdetails.key){
             console.log(value,'foreach',userdetails.key,value.rating)
   
                setStar(value.rating)
           }
           else{
               setStar(0);
           }
          
         })
       }
    
    const userload=useCallback(
         () => { 
          let dataSet = [];
  
          firebaseDb.child('/accounts').on('value',  (snapshot)=> {
            // console.log(snapshot.val(),'acc1')

            snapshot.forEach( (childSnapshot) =>{ 
                //   console.log(childSnapshot.key,'acc',userdetails.account)
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
    fetchrates()
  },[userload])

 useEffect(()=>{
    
    fetchrates();
 },[isOpen])

    return (
        <>

<li className="accordion-wrapper" style={{listStyleType:'none'}} key={userdetails.key}>
      
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
            <BeautyStars value={star}
                onChange={(value)=>{
                    setStar(value);
                    func(userdetails.key,value)
                }}
      />
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