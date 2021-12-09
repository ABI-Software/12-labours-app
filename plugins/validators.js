

function validateElement(element,elementToMatch)
{
  let strMessage=null
  let matchFlag=false

  if(element.required)
    strMessage= element.value ? null : element.display + " is mandatory"

  if(element.value){
    if(element.format){
      strMessage=validateFormat(element.format,element.value)? null : element.display + " has invalid format"
      if(strMessage) return{strMessage,matchFlag}
    }
    if(element.minLength){
      strMessage=element.value.length>element.minLength ? null: "Minimum length for " + element.display + " is " + element.minLength
      if(strMessage) return{strMessage,matchFlag}
    }

    if(element.match && validateFormat(elementToMatch.format,elementToMatch.value)){
      matchFlag=true
      strMessage=element.value === elementToMatch.value? null: element.display + " and " + elementToMatch.display + " should match"
    }
  }

  return {strMessage,matchFlag}
}

function validateFormat(format,value){
  switch(format){
    case "email":
      return isValidEmail(value)
    case "phone":
      return isValidPhone(value)
    case "password":
      return true
  }
}

function isValidEmail(email){
  const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  return emailRegex.test(email)
}

function isValidPhone(phone){
  //TBD: if required
  return true
}



export default (_, inject) => {
  inject('validateElement', (element,elementToMatch) => {return validateElement(element,elementToMatch)})
}