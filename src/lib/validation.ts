import { api } from "./axios";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    let validation = await api.get('/validate', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      }
    });

    console.log("Validation.ts", validation.data)


    if (validation.data) {
      return true
    } else {
      console.log('naõ validou')
      return false
    }
  } catch (error) {
    return false
  }
}