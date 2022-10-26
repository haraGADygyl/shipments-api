export const validateFields = (values) => {
    let result = ''
    for (const [key, value] of Object.entries(values)) {
       if (value.length <  1) {
        result = `${key} must not be empty`
        break
       }
    }

    return result 
  }