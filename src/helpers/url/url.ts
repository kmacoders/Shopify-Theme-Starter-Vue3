// @ts-nocheck

const setParam = (key, value): void => {
  if (history.pushState) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    let newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState({ path: newurl }, '', newurl);
  }
}

// function insertUrlParam(key, value) {
//   if (history.pushState) {
//       let searchParams = new URLSearchParams(window.location.search);
//       searchParams.set(key, value);
//       let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
//       window.history.pushState({path: newurl}, '', newurl);
//   }
// }

export { setParam };
