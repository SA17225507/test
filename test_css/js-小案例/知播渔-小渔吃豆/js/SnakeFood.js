class SnakeFood {
    constructor(width, height, img, snakeMap) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.snakeMap = snakeMap;

        //随机生成水平方向和垂直方向的值
        //获取地图的宽高
        let style = getComputedStyle(snakeMap.oMap);
        let mapWidth = parseInt(style.width);
        let mapHeight = parseInt(style.height);
        //console.log(mapWidth,mapHeight);
        //计算水平垂直能放几个食物
        this.colNum = mapWidth / this.width;
        this.rowNum = mapHeight / this.height;
    }

    //渲染
    render() {
        //创建食物
        let oDiv = document.createElement("div");
        //设置样式
        oDiv.style.width = this.width + "px";
        oDiv.style.height = this.height + "px";
        oDiv.style.background = `url(${this.img})`;
        let {x, y} = this.generateLocation();
        //保存食物的位置
        this.x = x;
        this.y = y;
        //随机设置食物的位置
        oDiv.style.position = "absolute";
        oDiv.style.left = x * this.width + "px";
        oDiv.style.top = y * this.height + "px";

        //添加到地图中
        snakeMap.oMap.appendChild(oDiv);
        this.oFood = oDiv;
    }
    remove(){
        this.oFood.parentNode.removeChild(this.oFood);
    }
    generateLocation() {
        let x = getRandomIntInclusive(0, this.colNum - 1); // 0, 9
        let y = getRandomIntInclusive(0, this.rowNum - 1); // 0, 7
        return {x: x, y: y};
    }

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}