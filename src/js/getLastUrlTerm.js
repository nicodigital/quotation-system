function getLastUrlTerm(url){

    url = url.replace(/\/$/, "");
    
    // Obtener el path de la URL
    var path = new URL(url).pathname;
    
    // Dividir el path en partes usando el slash como separador
    var partes = path.split("/");
    
    // El último elemento del array partes será el último elemento del path
    var ultimoElemento = partes[partes.length - 1];
    
    return ultimoElemento;

}

export default getLastUrlTerm