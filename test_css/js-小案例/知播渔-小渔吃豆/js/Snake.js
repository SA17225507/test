class Snake {
    constructor(obj) {
        obj = obj || {};//避免没有传对象获取报错
        this.width = obj.width || 100;//默认值
        this.height = obj.height || 100;
        this.headImg = obj.headImg || "images/head.png";
        this.bodyImg = obj.bodyImg || "images/body.png";
        this.snakeMap = obj.snakeMap || {};
        this.bodies = [
            {x: 2, y: 1, type: 1},//蛇头
            {x: 1, y: 1, type: 0},
            {x: 0, y: 1, type: 0},
        ]
        document.body.onkeydown = (event) => {
            this.key = event.key;
            console.log(this.key);
        }

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

    move() {
        // 1.修改蛇身的位置
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i].x = this.bodies[i - 1].x;
            this.bodies[i].y = this.bodies[i - 1].y;
            this.bodies[i].type = 0;
        }
        // 2.修改蛇头的位置
        let head = this.bodies[0];
        switch (this.key) {
            case "a": // 左
                head.x = head.x - 1;
                break;
            case "d": // 右
                head.x = head.x + 1;
                break;
            case "w": // 上
                head.y = head.y - 1;
                break;
            case "s": // 下
                head.y = head.y + 1;
                break;
            default:
                head.x = head.x + 1;
                break;
        }
    }

    inspection(snakeFood) {
        let head = this.bodies[0];
        //判断蛇头是否超出地图
        if (head.x < 0 || head.y < 0 || head.x >= this.colNum || head.y >= this.rowNum) {
            // 提示用户
            alert("挂了");
            // 关闭定时器
            clearInterval(this.timer);
            return false;
        }
        //判断是否吃到食物
        if (head.x === snakeFood.x && head.y === snakeFood.y) {
            // 删除当前食物
            snakeFood.remove();
            // 重新生成食物
            snakeFood.render();

            // 拿到最后一节蛇身体的位置
            let lastBody = this.bodies[this.bodies.length - 1];
            // 新建一节蛇的身体
            let newBody = {x: lastBody.x, y: lastBody.y, type: 0};
            // 根据当前移动的方向调整蛇身体的位置
            switch (this.key) {
                case "a": // 左
                    newBody.x = newBody.x + 1;
                    break;
                case "d": // 右
                    newBody.x = newBody.x - 1;
                    break;
                case "w": // 上
                    newBody.y = newBody.y + 1;
                    break;
                case "s": // 下
                    newBody.y = newBody.y - 1;
                    break;
                default:
                    newBody.x = newBody.x - 1;
                    break;
            }
            // 将新建的身体添加到数组中
            this.bodies.push(newBody);
        }
        return true;
    }

    update(snakeFood) {
        this.timer = setInterval(() => {
            //让蛇移动
            this.move();
            //检测边界和食物
            let flag = this.inspection(snakeFood);
            if(!flag){
                return;
            }
            //2,重新绘制
            this.render();

        }, 500);


    }

    render() {
        // 1.删除过去的蛇
        let snakes = document.querySelectorAll(".snake");
        for (let i = snakes.length - 1; i >= 0; i--) {//从后往前删
            let oDiv = snakes[i];
            oDiv.parentNode.removeChild(oDiv);
        }
        //2. 重新绘制蛇
        for (let value of this.bodies) {
            //创建蛇的某一个组成部分
            let oDiv = document.createElement("div");
            //设置样式
            oDiv.style.width = this.width + "px";
            oDiv.style.height = this.height + "px";
            oDiv.className = "snake";
            if (value.type === 1) {
                oDiv.style.background = `url(${this.headImg})`;
            } else {
                oDiv.style.background = `url(${this.bodyImg})`;
            }
            //设置位置
            oDiv.style.position = "absolute";
            oDiv.style.left = value.x * this.width + "px";
            oDiv.style.top = value.y * this.height + "px";
            //添加到地图中
            this.snakeMap.oMap.appendChild(oDiv);
        }
    }
}