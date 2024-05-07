function formatDate(dateString) {
  // Parsear la cadena de fecha
  const date = new Date(dateString);

  // Obtener los componentes de la fecha
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
  const year = date.getFullYear();

  // Formatear la fecha en el formato deseado
  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
}

export default formatDate;