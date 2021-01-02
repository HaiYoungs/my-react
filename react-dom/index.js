import Component from "../react/component";

// 挂载创建的节点到根节点上
function render (vnode, container) {
    return container.appendChild(_render(vnode));
}

// 返回创建的 DOM 节点
function _render (vnode) {
    if (vnode === undefined) return;

    if (typeof vnode === 'number') vnode = String(vnode);

    // 字符串则创建文本节点
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    // 函数则创建组件
    if (typeof vnode.tag === 'function') {
        // 1. 创建组件
        const comp = createComponent(vnode.tag, vnode.attrs);
        // 2. 设置组件 props
        setComponentProps(comp, vnode.attrs);
        // 3. 渲染组件
        renderComponent(comp);
        // 4. 返回组件节点对象
        return comp.base;
    }

    // 虚拟 DOM 对象则创建对应节点
    const { tag, attrs, childrens } = vnode;
    const dom = document.createElement(tag); // 创建节点对象

    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key];
            setAttribute(dom, key, value);
        })
    }

    if (childrens) {
        childrens.forEach(child => render(child, dom));
    }

    return dom;
}

// 重写 setAttribute 方法，className style 等处理
function setAttribute (dom, key, value) {
    if (key === 'className') { // 将 className 转成 class
        key = 'class';
        dom.setAttribute(key, value);
    }

    if (/on\w+/.test(key)) { // 事件
        key = key.toLowerCase();
        dom[key] = value;
    } else if (key === 'style') { // 样式
        if (!value || typeof value === 'string') {
            dom.style.cssText = value;
        } else if (value && typeof value === 'object') {
            for (let k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px';
                } else {
                    dom.style[k] = value[k];
                }
            }
        }
    } else { // 其他属性
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
function createComponent (comp, props) {
    let inst;
    if (comp.prototype && comp.prototype.render) { // 类组件创建实例返回
        inst = new comp(props);
    } else { // 函数组件则将其扩展成类组件
        inst = new Component(props);
        inst.constructor = comp; // 修改实例构造函数
        inst.render = function () { // 定义 render 函数
            return this.constructor();
        }
    }
    return inst;
}

// 设置组件 props
function setComponentProps (comp, props) {
    // 生命周期
    if (!comp.base) {
        if (comp.componentWillMount) comp.componentWillMount();
    } else if (comp.componentWillReceiveProps) { // 初次挂载不会执行，更新时接受 props 前执行
        comp.componentWillReceiveProps();
    }

    comp.props = props;
} 

// 渲染组件
export function renderComponent (comp) {
    let base;
    let isMounted =  comp.base; // 组件是否已挂载
    const renderer = comp.render(); // jsx 对象
    base = _render(renderer); // DOM 对象

    // 生命周期
    if (isMounted && comp.componentWillUpdate) {
        comp.componentWillUpdate();
    }

    // 更新时节点替换
    if (comp.base && comp.base.parentNode) {
        comp.base.parentNode.replaceChild(base, comp.base);
    }

    comp.base = base;

    if (isMounted) {
        if (comp.componentDidUpdate) comp.componentDidUpdate();
    } else if (comp.componentDidMount) {
        comp.componentDidMount();
    }
}

export default {
    render
}