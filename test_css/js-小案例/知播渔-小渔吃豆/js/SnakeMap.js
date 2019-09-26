class SnakeMap {
    constructor() {
        //创建div
        let oDiv = document.createElement("div");
        //添加类名
        oDiv.className = "map";
        //添加到body中
        document.body.appendChild(oDiv);
        this.oMap = oDiv;//保存为地图对象的一个属性
    }
}