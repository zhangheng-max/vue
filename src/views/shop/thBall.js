export default function newBall(event) { //当前点击的元素
    let div = document.createElement('div');
    div.className = 'ballFather';
    document.body.appendChild(div);

    let sonDiv = document.createElement('div');
    sonDiv.className = 'ballSon';
    div.appendChild(sonDiv);

    // console.log(event.target.getBoundingClientRect().top);
    let top = event.clientY; //获得 跳动小球top
    let left = event.clientX; //获得 left
    div.style.left = left + 'px';
    div.style.top = top + 'px';

    let y = (window.innerHeight - top); // 下落的高度
    div.style.webkitTransform = `translateY(${y}px)`;
    div.style.transform = `translateY(${y}px)`;


    sonDiv.style.webkitTransform = `translateX(-${left - 30}px)`;
    sonDiv.style.transform = `translateX(-${left - 30}px)`;
    //保证 小球运动结束后，调用购物车的动画


    // 删除添加完成的Dom结构
    setTimeout(() => {
        document.body.removeChild(div);
    }, 1000);
}