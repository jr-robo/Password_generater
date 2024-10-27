import { SafeAreaView, ScrollView, StyleSheet, Text, View,TextInput,TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import {Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import * as Yup from 'yup';


const PasswordSchema = Yup.object().shape({
  passwordlength: Yup.number()
  .required('Password length is required')
  .min(8,"miinmum enter 8")
  .max(16,'maximum enter 16')

});

export default function App() {

  const [password,setPassword]=useState('')
  const [ispasswordgenerated,setIspasswordgenerated]=useState(false)
  const [lowercase,setlowercase]=useState(true);
  const [uppercase,setuppercase]=useState(false);
  const [number,setnumber]=useState(false);
  const [symbols,setsymbols]=useState(false);



  const generatepasswordstring=(passwordlength:number)=>{

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars ='0123456789';
    const symbolChars ='!@#$%^&*()_+-=[]{}|;:,.<>?';
    

    let charset = '';
      if (lowercaseChars) 
        {charset += lowercaseChars};
      if (uppercaseChars) 
        {charset += uppercaseChars};
      if (numberChars)
        { charset += numberChars};
      if (symbolChars) 
        {charset += symbolChars};

      const passwordresult=createpassword(charset,passwordlength)

      setPassword(passwordresult)
      setIspasswordgenerated(true)


  }
  const createpassword=(charset:string,passwordLength:number)=>{



    let result = '';
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex)
      }
      return result

  }

  const resetpasswordState=()=>{
    setPassword('')
    setIspasswordgenerated(false)
    setlowercase(true)
    setuppercase(false)
    setnumber(false)
    setsymbols(false)

  }
  return (
    <ScrollView >
      <SafeAreaView>
      <View>
      <Text style={styles.heading}>Password Generator</Text>
    </View>
    <View>
    <Formik
    
     initialValues={{ passwordlength: '' }}
     validationSchema={PasswordSchema}
     
     onSubmit={values=>{console.log(values);
      generatepasswordstring(+values.passwordlength)
     }}
   
   >
     {({ handleChange,
          values,
         errors,
         touched,
         handleSubmit,
         isValid,
         isSubmitting,
         handleReset,
         }) => (
      <>
       <View style={styles.inputWrapper}>
         
          <Text style={styles.title}>Password Length :</Text>
           {touched.passwordlength && errors.passwordlength && (<Text> {errors.passwordlength}</Text>)}
          

        
        
          <TextInput  
           style={styles.inputStyle} 
           onChangeText={handleChange('passwordlength')}
           value={values.passwordlength}
           placeholder="Ex.8"
           keyboardType='numeric'
           />

          
          
       </View>
       
       <View style={styles.inputWrapper}>
        <Text style={styles.title}>include numbers:</Text>
        
        <BouncyCheckbox 
        //disableBuiltInState
        isChecked={number}
        fillColor='#8ba832'
        onPress={() => setnumber(!number)}
        
        //onPress={}
        />
        
       </View>
       <View style={styles.inputWrapper}>
       <Text style={styles.title}>include symbols:</Text>
        <BouncyCheckbox 
        //disableBuiltInState={false}
        isChecked={symbols}
        fillColor='#a84e32'
        onPress={()=>setsymbols(!symbols)}
        />
       </View>
       <View style={styles.inputWrapper}>
       <Text style={styles.title}>include Uppercase :</Text>
        <BouncyCheckbox 
        //disableBuiltInState
        isChecked={uppercase}
        fillColor='#32a83e'
        onPress={()=>setuppercase(!uppercase)}
        />
       </View>
       <View style={styles.inputWrapper}>
       <Text style={styles.title}>include Lowercase:</Text>
       
       
        <BouncyCheckbox 
        //disableBuiltInState
        isChecked={lowercase}
        fillColor='#326fa8'
        onPress={()=>setlowercase(!lowercase)}
        />
        
       </View>
       <View style={styles.formAction}>

       <TouchableOpacity
        style={styles.button} 
        disabled={!isValid}
        onPress={handleSubmit}>
          <Text>Generate</Text>
         
         </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button} 
        onPress={()=>{handleReset();
                      resetpasswordState()
        }}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>

     

        </>
     )}
   </Formik>
    </View>
    { ispasswordgenerated ? (
      <View>
       <View style={styles.taglabel}>
       <Text style={styles.outputLabel}>Generated Password:</Text>
       </View>
 
       <View style={styles.outputContainer}>
                 
                 <Text style={styles.outputText}>{password}</Text>
       </View>

      </View>
      
    ):null

    }
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    fontSize:24,
    padding:10
   
  },
  inputWrapper:{
    flex:1,
    justifyContent:'space-between',
    padding:9,
    flexDirection:'row'
    
  },
  inputColumn:{
    padding:10,
    margin:15
   
    
  },
  title:{
    fontWeight:'bold',
    fontSize:18,
    marginBottom:18,
    paddingHorizontal:10,
    marginTop:12
    
    
  },
  inputStyle:{
    width:85,
    borderRadius:15,
    backgroundColor:'black'
  },
  

  formAction:{
    flex:1,
    justifyContent:'space-around',
    //padding:9,
    flexDirection:'row',
    marginBottom:10,
  },
 button:{
  fontSize: 20,
  fontWeight: 'bold',
  backgroundColor:'#eb6b34',
  color:'#FFFFFF',
  borderRadius:13,
  marginTop: 7,
  padding: 15,
  
 },
 taglabel:{
  marginTop: 10,
  padding: 10,
  backgroundColor: '#34eb3a',
  borderRadius: 20,
  width:200,
  justifyContent:'center',
  alignSelf:'center'
 },
 outputLabel:{
  fontSize: 16,
  fontWeight: 'bold',
  color:'white'
 },
 outputText:{
  fontSize: 18,
    marginTop: 10,
    color: 'black',
 },
 outputContainer:{
  marginTop: 10,
  padding: 10,
  backgroundColor: '#f3f3f3',
  borderRadius: 9,
  width:200,
  justifyContent:'center',
  alignSelf:'center'
}
})