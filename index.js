const BBS = function () {
  this.threads = {};
  this.reses = {};
};
BBS.prototype.getThreadId = function (resElement) {
  let current = resElement;
  
  while (/^thread\d+$/.match(current.parentElement)) {
    if (current.parentElement.id) {
      return current.parentElement.id;
    } else {
      current = current.parentElement;
    }
  }
  
  return '';
};
BBS.prototype.addThread = function (element) {
  const id = this._findThreadId();
  this.treads[id] = {
    'element': element
  };
};
BBS.prototype.isParentThread = function (id) {
  const target = this.elements[id];
  let current = target;
  
  try {
    while (current.parentElement) {
      if (/^thread\d+$/.match(current.parentElement.id)) {
        return true;
      } else if (/^thread\d+-res/.match(current.parentElement.id)) {
        return false;
      }
      current = current.parentElement;
    }
  } catch () {
    
  }
  return false;
};

const Thread = function (element) {
  this.element = element;
  this.reses = [];
};
Thread.prototype.findRes = function(resId) {
  const rec = function (reses, resId) {
    return reses.find(function (res) {
      if (res.id === resId) {
        return find;
      } else if(res.reses) {
        return rec(res.reses, resId);
      }
    });
  };
  
  const res = rec(this.reses);
  
  return res;
};
Thread.prototype.addRes = function (parentResId, resElement) {
  let parentRes = this.findRes(parentResId);
  parentRes.addRes(resElement);
};

const Res = function (element, parent) {
  this.element = element;
  this.parent = parent;
  this.reses = [];
}
Res.prototype.addRes = function (resElement) {
  this.reses.push(new Res(resElement, this));
};

let bbs = new BBS();

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