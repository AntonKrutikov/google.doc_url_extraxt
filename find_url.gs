function main() {
  doc = DocumentApp.getActiveDocument().getBody()
  result = findUrl(doc)
  console.log(result)
}

function findUrl(el, result = []) {
  if (el.hasOwnProperty('getNumChildren')) {
    var childCount = el.getNumChildren()
    for (var i = 0; i < childCount; i++) {
      findUrl(el.getChild(i), result)
    }
  } else if (el.hasOwnProperty('getLinkUrl')) {
    /* If el has getLinkUrl() then it can have some kind of urls */

    // Link can be inside TEXT and there we need to itterate over text runs
    if (el.hasOwnProperty('getTextAttributeIndices')) {
      var pos = el.getTextAttributeIndices()
      for (r = 0; r < pos.length; r++) {
        next = r + 1 > pos.length ? -1 : pos[r + 1]
        var text = el.getText().substring(pos[r], next)
        var url = el.getLinkUrl(pos[r])
        if (url !== null) result.push({ text: text, url: url })
      }
    } else {
      // Also try get links for not TEXT elements
      var url = el.getLinkUrl()
      if (url !== null) result.push({ text: null, url: url })
    }
  }
  return result
}