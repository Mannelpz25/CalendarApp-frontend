/* ---------- Ayuda!! ----------
*    Obtener variables de entorno
*/
//-Importaciones:

//-Contenido:
export const getEnvVariables = () => {
    import.meta.env;
    return {
        ...import.meta.env
    }
}
