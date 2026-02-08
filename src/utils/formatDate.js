export const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString || 'Invalid date'; 
  }
  
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };

  const formatter = new Intl.DateTimeFormat('es-ES', options);
  const parts = formatter.formatToParts(date);
  
  return parts.map(part => {
    if (part.type === 'month') {
      return part.value.charAt(0).toUpperCase() + part.value.slice(1);
    }
    return part.value;
  }).join('');
};
