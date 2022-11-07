import { types } from "../../../src/auth"

describe('Pruebas en "Types.js', () => { 
    
    test('should de regresar estos types', () => { 
        
        expect(types).toEqual({
            login: "[Auth] Login",
            logout: "[Auth] Logout",
          })
        
     })

 })