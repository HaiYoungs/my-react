import Component from '../react/component'

const ReactDOM = {
  render
}

// 挂载 DOM
function render(vnode, container) {
  container.appendChild(_render(vnode))
}

// 根据虚拟　DOM　创建真实　DOM
function _render(vnode) {
  if (vnode === undefined) return;

  // 字符串创建文本节点
  if (typeof vnode === 'string') return document.createTextNode(vnode);

  // tag 为函数则创建组件
  if (typeof vnode.tag === 'function') {
    // 1. 创建组件
    const comp = createComponent(vnode.tag, vnode.attrs);
    // 2. 设置组件属性
    setComponentProps(comp, vnode.attrs);
    // 3. 组件渲染的节点对象返回
    // return comp.base;
  }

  // 虚拟 DOM 对象
  const { tag, attrs, childrens } = vnode;
    // 创建节点对象
  const dom = document.createElement(tag);

  // 有属性
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key];
      setAttribute(dom, key, value);
    })
  }

  // 有子节点递归渲染
  if (childrens) {
    childrens.forEach(child => {
      render(child, dom)
    })
  }

  return dom;
}

// 设置属性(className style 等处理)
function setAttribute(dom, key, value) {
  // 将属性名 className 转成 class
  if (key === 'className') {
    key = 'class';
    dom.setAttribute(key, value);
  }

  // 如果是事件
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom.setAttribute(key, value);
  }

  // 如果是样式
  if (key === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      for (let k in value) {
        if (typeof value[k] === 'number') {
          dom.style[k] = value[k] + 'px'
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    if (key in dom) {
      dom[key] = value || '';
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

// 创建组件
function createComponent(comp, props) {
  let inst;

  // 如果是类定义的组件，则创建实例返回
  if (comp.prototype && comp.prototype.render) {
    inst = new comp(props);
  } else { // 函数组件转换成类组件
    inst = new Component(props);
    inst.constructor = comp;
  }

  return inst;
}

export default ReactDOM;