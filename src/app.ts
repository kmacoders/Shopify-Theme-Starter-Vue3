export const filterByTerm = (inputArr : any , searchTerm: string) =>{
  return inputArr.filter(function(arrayElement :any) {
    return arrayElement.url.match(searchTerm);
  });
}
