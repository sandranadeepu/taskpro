import React,{useEffect,useCallback} from 'react'
import UserList from './UserList';
import {useDispatch,useSelector} from 'react-redux'
import {loadUsers} from './actions/users';
import {rateLoad} from './actions/rating'
import firebaseDb from './fbase'


 const Users = () => {
      const usersData=  useSelector(state => state.users.users)
      const dispatch=useDispatch()
      const userload=useCallback(
           () => {
            let dataSet = [];
    
            firebaseDb.child('/users').once('value',  (snapshot)=> {
                snapshot.forEach( (childSnapshot) =>{  
          
                    // console.log(childSnapshot.val(),'hiu')
                  let key=childSnapshot.key
                 dataSet.push({...childSnapshot.val(),key})
                    })
        
        
            }).then(async ()=>{
                 dispatch(loadUsers(dataSet))
                                      console.log('hiu')

            }).catch(err=>{
                console.log(err,'err')
            })
          },
          [dispatch]
      )
      const rateload=useCallback(()=>{
          let rate=[]
        firebaseDb.child('/Rating').on('value',  (snapshot)=> {
            console.log(snapshot.val(),'acc1')
            snapshot.forEach( (childSnapshot) =>{  

               rate.push({...childSnapshot.val()})
             dispatch(rateLoad(rate))
            
          })
        })
      })
    useEffect( async ()=>{
       userload()
       await rateload();

    
    },[userload])
   
    const ratefunc=(id,star)=>{


        firebaseDb.child('/Rating').on('value',  (snapshot)=> {
            // console.log(snapshot.val(),'r1')
                        if(snapshot.val()==null || snapshot.val()==undefined){
                            firebaseDb.child('/Rating').push({
                                user:id,
                                rating:star
                            }).on('value',snapshot=>{
                                console.log(snapshot.val(),'rate');
                                
                            })
                        }
                        else{
                            snapshot.forEach( (childSnapshot) =>{ 
                                if(id==childSnapshot.val().user){
                                 console.log('hello')
                                 firebaseDb.child('/Rating').child(childSnapshot.key).update({
                                    user:id,
                                    rating:star
                                 })
                              }
                              else{
                                  console.log(id!==childSnapshot.val().user,'check')
                                  firebaseDb.child('/Rating').push({
                                    user:id,
                                    rating:star
                                }).on('value',snapshot=>{
                                    console.log(snapshot.val(),'rate');
                                })
                              }
                          })
                        }
           
          })

    
        
    }

    return (
        <ul>
               { usersData.map((u,i)=>{
                   console.log(u,"i")
                        //   return    <UserList  key={u.userkey} user={u.childData}/>
                      return  <UserList id={i} userdetails={u}  func={ratefunc}/>
               })
 
            }
        </ul>
    )
}


  export default Users;