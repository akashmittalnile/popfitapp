{/* <DropDownPicker
    open={item.user_id==user_id ? true : false}
    value={item.account_status}
    items={driverstatus}
    setOpen={()=>{user_id==item.user_id ? setUser_id('') :setUser_id(item.user_id)}}
    setValue={(v)=>{
     // console.log('the v is',v)
     //  updateDriverStatus(item.user_id,v)
     // setstatusvalue(v)
    }}
    onSelectItem={(itemss) => {
      //console.log('item is',item);
      updateDriverStatus(item.user_id,itemss.value)
    }}
    setItems={(i)=>{setdriverstatus(i)}}
    placeholder={item.account_status}
    onChangeValue={(value) => {
     // updateDriverStatus(item.user_id,value)
      // setstatusvalue(value)
    }}
    style={{height:30,fontSize:12,
      color:item.account_status =='Approved' ? 'green' : item.account_status =='Pending' ? Mycolors.ORANGE : item.account_status =='Rejected' ? 'red' : item.account_status =='Under Review' ? Mycolors.TEXT_COLOR: Mycolors.TEXT_COLOR,
      backgroundColor:Mycolors.BG_COLOR,
      borderRadius:15,
      borderColor:item.account_status =='Approved' ? 'green' : item.account_status =='Pending' ? Mycolors.ORANGE : item.account_status =='Rejected' ? 'red' : item.account_status =='Under Review' ? Mycolors.TEXT_COLOR: Mycolors.TEXT_COLOR,
      borderWidth:0.5,
      zIndex:999,
    } }
    textStyle={{
      fontSize: 12,
    }}
    // renderListItem={(props) => <driverstatus {...props}  />}
    placeholderStyle={{
      color:item.account_status =='Approved' ? 'green' : item.account_status =='Pending' ? Mycolors.ORANGE : item.account_status =='Rejected' ? 'red' : item.account_status =='Under Review' ? Mycolors.TEXT_COLOR: Mycolors.TEXT_COLOR,
      fontSize: item.account_status =='Under Review' ? 10 :12 ,
    }}
    listItemContainerStyle={{
      height:25
    }}
    dropDownContainerStyle={{
      // backgroundColor: "#DFDFDF",
      borderColor:'rgba(0,0,0,0.15)',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 5,
      zIndex:999,
      labelStyle: {
        color: "#fff",
        lineHeight:0
      },
    }}
    bottomOffset={100}
   // maxHeight={120}
   listMode="SCROLLVIEW"
  /> */}

  