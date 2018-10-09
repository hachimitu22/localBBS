const BBS = function () {
  this.threadCount = 0;
  this.resCount = 0;
  this.tree = Object.create(null);
};
BBS.prototype._updateTree = function () {
  const root = document.getElementsByClassName('thread-list')[0];

  const recursive = function (element, tree) {
    if (element.id) {
      tree[element.id] = Object.create(null);
      tree = tree[element.id];
    }

    const childList = element.children;
    if (!childList || childList.length === 0) {
      return;
    }

    for (let i = 0; i < childList.length; i++) {
      recursive(childList[i], tree);
    }
  };

  this.tree = Object.create(null);
  recursive(root, this.tree);
};
BBS.prototype.addThread = function (element) {
  let threadsElement = element.parentElement;
  let threadElement = document.getElementsByClassName('thread')[0].cloneNode(true);

  threadElement.style.display = 'block';
  this.threadCount++;
  threadElement.id = 'thread' + this.threadCount;

  threadsElement.appendChild(threadElement);

  this._updateTree();
};
BBS.prototype.delThread = function (element) {
  let threadElement = element.parentElement;

  if (!threadElement || !window.confirm('本当にスレを消して良いですか？')) {
    // 何もしない
  }

  threadElement.parentNode.removeChild(threadElement);

  this._updateTree();
};
BBS.prototype.addRes = function (element) {
  let parentElement = element.parentElement;
  let resElement = document.getElementsByClassName('res')[0].cloneNode(true);

  resElement.style.display = 'block';
  this.resCount++;
  resElement.id = 'res' + this.resCount;

  parentElement.appendChild(resElement);

  this._updateTree();
};
BBS.prototype.delRes = function (element) {
  let resElement = element.parentElement;

  if (resElement && window.confirm('本当にレスを消して良いですか？')) {
    resElement.parentNode.removeChild(resElement);
  } else {
    // 何もしない
  }

  this._updateTree();
};

let bbs = new BBS();

const addThread = function (target) {
  bbs.addThread(target);
};
const delThread = function (target) {
  bbs.delThread(target);
};
const addRes = function (target) {
  bbs.addRes(target);
};
const delRes = function (target) {
  bbs.delRes(target);
};

const showDomTreeOnColsole = function () {
  const root = document.getElementsByClassName('thread-list')[0];
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
