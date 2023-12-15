import apiConfig from "@/config/apiConfig"
import axios from "axios"
import EncryptedStorage from "react-native-encrypted-storage"

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const recipeServices = {
    getAllRecipesByUserId,
    getAllRecipesByOtherUser,
    createRecipe,
    editRecipe,
    deleteRecipe,
    getRecipeById
}

function getRecipeById(recipeId: number, token: string | null) {
    
    let buildEndpoint = apiConfig.Recipe.endpoints.getRecipeById(recipeId)
    token = token == null ? '' : token

    if ( token != '') {
        return axios.get(
            `${apiConfig.apiGateway.URL}${buildEndpoint}`,
            {
                headers: {
                    'Authorization ': `Bearer ${token}`
                }
            }
        ).then(res => {
            return Promise.resolve(res.data)
        }).catch(e => {
            return Promise.reject(e)
        })
    } else {
        return Promise.reject('An error occured')
    }
    
}


function deleteRecipe(userId: number, token: string | null, recipeId: number) {
    
    let buildEndpoint = apiConfig.Recipe.endpoints.deleteRecipe(recipeId)
    token = token == null ? '' : token

    if ( token != '') {
        return axios.delete(
            `${apiConfig.apiGateway.URL}${buildEndpoint}`,
            {
                headers: {
                    'Authorization ': `Bearer ${token}`
                }
            }
        ).then(res => {
            return Promise.resolve(res.data)
        }).catch(e => {
            return Promise.reject(e)
        })
    } else {
        return Promise.reject('An error occured')
    }
    
}



function editRecipe(token: string | null, fields: any, recipeId: number) {
    
    let buildEndpoint = apiConfig.Recipe.endpoints.editRecipe(recipeId)

    token = token == null ? '' : token

    let fieldsKey = Object.keys(fields)
    const data = new FormData()
    fieldsKey.map(k => {
        if ( k == "image_path" ) {
            if ( fields[k].uri != "" ) {
                data.append(k, fields[k])
            }
        } else {
            data.append(k, fields[k])
        }
    })

    if ( token != '') {
        return axios.post(
            `${apiConfig.apiGateway.URL}${buildEndpoint}`,
            data,
            {
                headers: {
                    'Authorization ': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            return Promise.resolve(res.data)
        })
        .catch((e) => {
            console.log('error occured ', e)
            return Promise.reject(e)
        })
    } else {
        return Promise.reject('An error occured')
    }
    
}

function createRecipe( token: string | null, fields: any) {
    
    let buildEndpoint = apiConfig.Recipe.endpoints.createRecipe

    token = token == null ? '' : token

    let fieldsKey = Object.keys(fields)
    const data = new FormData()
    fieldsKey.map(k => {
        data.append(k, fields[k])
    })

    if ( token != '') {
        
        return axios.post(
            `${apiConfig.apiGateway.URL}${buildEndpoint}`,
            data,
            {
                headers: {
                    'Authorization ': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            return Promise.resolve(res.data)
        })
        .catch((e) => {
            console.log('error occured ', e)
            return Promise.reject(e)
        })
    } else {
        return Promise.reject('An error occured')
    }
    
}

function getAllRecipesByOtherUser(userId: number, token: string | null) {
    
    let buildEndpoint = apiConfig.Recipe.endpoints.getAllRecipesByOtherUser(userId)

    token = token == null ? '' : token

    if ( token != '') {
        return axios.get(
            `${apiConfig.apiGateway.URL}${buildEndpoint}`,
            {
                headers: {
                    'Authorization ': `Bearer ${token}`
                }
            }
        ).then(res => {
            let filteredItems = res.data.items

            if ( filteredItems.length > 0 ) {
                filteredItems = filteredItems.map((fi: any) => {
                    fi.image_path = `${apiConfig.apiGateway.URL}/storage/recipes/${fi.image_path}`
                    return fi
                })
            }
            return Promise.resolve(filteredItems)
        }).catch(e => {
            return Promise.reject(e)
        })
    } else {
        return Promise.reject('An error occured')
    }
    
}


function getAllRecipesByUserId(userId: number, token: string | null) {
    
    let buildEndpoint = apiConfig.Recipe.endpoints.getAllRecipesByUserId(userId)

    token = token == null ? '' : token

    if ( token != '') {
        return axios.get(
            `${apiConfig.apiGateway.URL}${buildEndpoint}`,
            {
                headers: {
                    'Authorization ': `Bearer ${token}`
                }
            }
        ).then(res => {

            let filteredItems = res.data.items

            if ( filteredItems.length > 0 ) {
                filteredItems = filteredItems.map((fi: any) => {
                    fi.image_path = `${apiConfig.apiGateway.URL}/storage/recipes/${fi.image_path}`
                    return fi
                })
            }




            return Promise.resolve(filteredItems)
        }).catch(e => {
            return Promise.reject(e)
        })
    } else {
        return Promise.reject('An error occured')
    }
    
}

export default recipeServices