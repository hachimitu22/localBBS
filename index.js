const BBS = function () {
};

const addThread = function(target) {
  var threadListElement = target.parentElement;
  var threadElement = document.getElementsByClassName("thread")[0].cloneNode(true);
  const id = 'thread' + bbs.nextThreadNumber;

  threadElement.style.display = 'block';
  threadElement.id = id;

  bbs.nextThreadNumber++;
  bbs.threads[id] = {
    'element': threadElement,
    'reses' : {},
    'nextResNumber': 1
  };
  
  threadListElement.appendChild(threadElement);
};
const delThread = function(target) {
  let threadElement = target.parentElement;
  const id = threadElement.id;

  if (!threadElement || !window.confirm('本当にスレを消して良いですか？')) {
    // 何もしない
  }
  
  delete bbs.threads[id];
  threadElement.parentNode.removeChild(threadElement);
};
const addRes = function(target) {
  let parent = target.parentElement;
  let child = document.getElementsByClassName("res")[0].cloneNode(true);

  child.style.display = 'block';

  parent.appendChild(child);
};
const delRes = function(target) {
  let resElement = target.parentElement;
  
  if (resElement && window.confirm('本当にレスを消して良いですか？')) {
    resElement.parentNode.removeChild(resElement);
  } else {
    // 何もしない
  }
};

const showDomTreeOnColsole = function() {
  const root = document.getElementsByClassName("thread-list")[0];
  const domTree = generateDomTreeString(root);
  console.log(domTree);
};

const domString = function (element) {
  return element.tagName + ' ' + (element.className || '');
};

const generateDomTreeString = function (element, indent) {
  indent = indent || '';
  
  const dom = indent + '+ ' + domString(element) + '\n';
  const childList = element.children;
  if (!childList || childList.length === 0) {
    return dom;
  }
  
  let domTree = dom;
  indent += '  ';
  for (let i = 0; i < childList.length; i++) {
    domTree += generateDomTreeString(childList[i], indent);
  }
  
  return domTree;
};

const showBbsObjectOnColsole = function () {
  console.log(bbs);
};