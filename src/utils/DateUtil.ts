export function getCurrentDate() {
  const currentDate = new Date();
  const date = formatter(currentDate.getDate());
  const month = formatter(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();
  return `${date}.${month}.${year}`;
}

function formatter(givenNumber: number) {
  return givenNumber >= 10 ? givenNumber : `0${givenNumber}`;
}
