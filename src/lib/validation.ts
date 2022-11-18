import { api } from "./axios";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    let validation = await api.get('/validate', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      }
    });

    console.log(validation.data)


    if (validation.data) {
      console.log('validou')
      return true
    } else {
      console.log('naõ validou')
      return false
    }
  } catch (error) {
    return false
  }


}