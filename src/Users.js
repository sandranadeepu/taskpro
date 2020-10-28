import React,{useEffect,useCallback} from 'react'
import UserList from './UserList';
import {useDispatch,useSelector} from 'react-redux'
import {loadUsers} from './actions/users';
import firebaseDb from './fbase'


 const Users = () => {
      const usersData=  useSelector(state => state.users.users)
      const dispatch=useDispatch()
      const userload=useCallback(
           () => {
            let dataSet = [];
    
            firebaseDb.child('/users').once('value',  (snapshot)=> {
                snapshot.forEach( (childSnapshot) =>{  
          
                    console.log(childSnapshot.val(),'hiu')
                   
                 dataSet.push(childSnapshot.val())
                    })
        
        
            }).then(()=>{
                dispatch(loadUsers(dataSet))

            }).catch(err=>{
                console.log(err,'err')
            })
          },
          [dispatch]
      )
    useEffect( ()=>{
       userload()
      
    },[userload])

    return (
        <ul>
               { usersData.map((u)=>{
                   console.log(u,"i")
                        //   return    <UserList  key={u.userkey} user={u.childData}/>
                      return  <UserList userdetails={u}/>
               })
 
            }
        </ul>
    )
}


  export default Users;