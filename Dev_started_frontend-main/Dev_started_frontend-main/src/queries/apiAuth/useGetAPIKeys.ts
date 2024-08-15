import { useQuery } from "react-query";
import authRequest from "../authRequest";
import { ApiKeyBase, ApiKeyCreate } from "./types";


async function apikeys():Promise<Array<ApiKeyBase>> {
    try {
      const response = await authRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/api-key`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


export async function deleteApiKey(id:string){
    try{
        const response = await authRequest({
            method:"DELETE",
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/api-key/${id}`
        })
    }
    catch(error){
        throw error
    }
}

export async function createApiKey(data:ApiKeyCreate):Promise<ApiKeyBase> {
    try{
        const response = await authRequest({
            method:"POST",
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/api-key`,
            data:data
        })
        console.log(response)
        return response.data;
    }
    catch(error){
        throw error
    }
}

const useGetAPIKeys = () => {

  return useQuery("api-keys", apikeys);
};

export default useGetAPIKeys;
