  /* Original code by matt vogel */
  /* v1  */
  // creates a right click menu plugin to toggle block captialization

function isUpper(str) {
  // check if text is uppercase 
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

function cBlock(uid) {
  // toggle full capitalization of block text
    let query = `[:find ?s .
                        :in $ ?uid
                        :where 
              [?e :block/uid ?uid]
              [?e :block/string ?s]
              ]`;
    
    let block_string = window.roamAlphaAPI.q(query,uid);
    
    if (isUpper(block_string)) {
      block_string = block_string.toLowerCase();
    } else {
      block_string = block_string.toUpperCase();
    }

    window.roamAlphaAPI.updateBlock({"block": 
                  {"uid": uid,
                    "string": block_string}})

  }

async function onload() {
  roamAlphaAPI.ui.blockContextMenu.addCommand({
    label: "Uppercase/Lowercase Toggle",
    callback: (e) => cBlock(e['block-uid'])
  })

  console.log("load toggle uppercase plugin");
}

function onunload() {
  roamAlphaAPI.ui.blockContextMenu.removeCommand({
    label: "Uppercase/Lowercase Toggle"
  })
  console.log("unload toggle uppercase plugin");
}

export default {
onload,
onunload
};
