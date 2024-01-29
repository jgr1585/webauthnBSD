// (A) HELPER FUNCTIONS
export const helper = {
    // (A1) ARRAY BUFFER TO BASE 64
    atb : (b: Iterable<number>) => {
      let u = new Uint8Array(b), s = "";
      for (let i=0; i<u.byteLength; i++) { s += String.fromCharCode(u[i]); }
      return btoa(s);
    },
   
    // (A2) BASE 64 TO ARRAY BUFFER
    bta : (o: { [x: string]: any; }) => {
      let pre = "=?BINARY?B?", suf = "?=";
      for (let k in o) { if (typeof o[k] == "string") {
        let s = o[k];
        if (s.substring(0, pre.length)==pre && s.substring(s.length - suf.length)==suf) {
          let b = window.atob(s.substring(pre.length, s.length - suf.length)),
          u = new Uint8Array(b.length);
          for (let i=0; i<b.length; i++) { u[i] = b.charCodeAt(i); }
          o[k] = u.buffer;
        }
      } else { helper.bta(o[k]); }}
    },
   
    // (A3) AJAX FETCH
    ajax : (url: RequestInfo | URL, data: { [s: string]: any; } | ArrayLike<unknown>, after: (arg0: string) => any) => {
      let form = new FormData();
      for (let [k,v] of Object.entries(data)) { form.append(k,v); }
      fetch(url, { method: "POST", body: form })
      .then(res => res.text())
      .then(res => after(res))
      .catch(err => { alert("ERROR!"); console.error(err); });
    }
  };