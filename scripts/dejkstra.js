var roomNodes = ['entrance','server','e8','wardrobe','kitchen','e14','e16','e20','e24','e36','e40'];

    //'entrance-way','server-way','e8-way','wardrobe-wa','kitchen-way','e14-way','e16-way','e20-way','e24-way','e36-way','e40-way'
var roomAdjacencyMatrix = [ [1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0],
                            [0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0],
                            [0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0],
                            [0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0],
                            [0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0],
                            [0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0],
                            [0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0],
                            [0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0],
                            [0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0],
                            [0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0],
                            [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1] ];

var wayNodes = ['entrance-way','server-way','e8-way','wardrobe-way','kitchen-way','e14-way','e16-way','e20-way','e24-way','e36-way','e40-way'];


var wayAdjacencyMatrix = [  [0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0],
                            [1,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0],
                            [0,	1,	0,	1,	0,	0,	0,	0,	0,	0,	0],
                            [0,	0,	1,	0,	1,	0,	0,	0,	0,	0,	0],
                            [0,	0,	0,	1,	0,	1,	0,	0,	0,	0,	0],
                            [0,	0,	0,	0,	1,	0,	1,	0,	0,	0,	0],
                            [0,	0,	0,	0,	0,	1,	0,	1,	0,	0,	0],
                            [0,	0,	0,	0,	0,	0,	1,	0,	1,	0,	0],
                            [0,	0,	0,	0,	0,	0,	0,	1,	0,	1,	0],
                            [0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	1],
                            [0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0] ];






/*var startNode = 'entrance';
var endNode = 'e40';


if(startNode.indexOf('-way')===-1){
    startNode +='-way';
}

if(endNode.indexOf('-way')===-1){
    endNode +='-way';
}*/


//var visited = [] Перенес в Дейкстру, т.е если запускать поиск еще раз, то он намертво виснет




/*console.log('Кратчайший путь от: '+ startNode + ' к: ' + endNode + ' проходит через: '
            + Dejkstra(startNode,endNode)[0] + ' длина пути = '+ Dejkstra(startNode,endNode)[1]);*/


function findPath(startNode, endNode) {
    var marks = [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000];
    marks[wayNodes.indexOf(startNode)] = 0;
    function NextNode(node,visited) {

        var indexOfShortestWay = 0; //Видимо кратчайший путь до точки?
        var currentNode = node;
        var currentIndex = wayNodes.indexOf(node);
        var i = 0;
        while (i < wayAdjacencyMatrix[currentIndex].length){
            if(wayAdjacencyMatrix[currentIndex][i]){
                let tempLength = marks[currentIndex] + wayAdjacencyMatrix[currentIndex][i];
                if(marks[i] === 1000){
                    marks[i] = 0 + tempLength;
                }else if(marks[i] > tempLength){
                    marks[i] = tempLength;
                }
            }
            i++;
        }
        var j = 0;
        visited.push(currentNode);
        var shortestWay = 999;
        while(j<marks.length){
            if((marks[j] !== 1000) && marks[j] && (visited.includes(wayNodes[j]) === false)){
                if (shortestWay > marks[j]){
                    shortestWay = marks[j];
                    indexOfShortestWay = j;
                }
            }
            j++;
        }
        return wayNodes[indexOfShortestWay];
    }
    function Dejkstra(startNode, endNode) {
        var visited = [];
        var i = 0;
        var currentNode = startNode;
        while(i < wayNodes.length){
            currentNode = NextNode(currentNode,visited);
            i++;
        }
        var totalDistance = marks[wayNodes.indexOf(endNode)];
        var path = [];
        var previousNode = '';
        let flag = path.includes(startNode);
        while (!flag){
            let i = 0;
            while (i < wayAdjacencyMatrix[wayNodes.indexOf(endNode)].length){
                if (wayAdjacencyMatrix[wayNodes.indexOf(endNode)][i]){
                    var difference = marks[wayNodes.indexOf(endNode)] - wayAdjacencyMatrix[wayNodes.indexOf(endNode)][i];
                    if (difference === marks[i]){
                        previousNode = wayNodes[i];
                    }
                }
                i+=1;
            }
            path.push(endNode);
            endNode = previousNode;
            if(endNode === startNode){ flag = true;}
        }
        path.push(startNode)
        path.reverse();
        return [path, totalDistance];
    }
    return Dejkstra(startNode,endNode);
    //return [path, totalDistance];
}

/*console.log('Кратчайший путь от: '+ startNode + ' к: ' + endNode + ' проходит через: '
        + findPath(startNode,endNode)[0] + ' длина пути = '+ findPath(startNode,endNode)[1]);*/






/*function NextNode(node,visited) {

    var indexOfShortestWay = 0; //Видимо кратчайший путь до точки?
    var currentNode = node;
    var currentIndex = wayNodes.indexOf(node);
    var i = 0;
    while (i < wayAdjacencyMatrix[currentIndex].length){
        if(wayAdjacencyMatrix[currentIndex][i]){
            let tempLength = marks[currentIndex] + wayAdjacencyMatrix[currentIndex][i];
            if(marks[i] === 1000){
                marks[i] = 0 + tempLength;
            }else if(marks[i] > tempLength){
                marks[i] = tempLength;
            }
        }
        i++;
    }
    var j = 0;
    visited.push(currentNode);
    var shortestWay = 999;
    while(j<marks.length){
        if((marks[j] !== 1000) && marks[j] && (visited.includes(wayNodes[j]) === false)){
            if (shortestWay > marks[j]){
                shortestWay = marks[j];
                indexOfShortestWay = j;
            }
        }
        j++;
    }
    return wayNodes[indexOfShortestWay];
}

function Dejkstra(startNode, endNode) {
    var visited = [];
    var i = 0;
    var currentNode = startNode;
    while(i < wayNodes.length){
        currentNode = NextNode(currentNode,visited);
        i++;
    }
    var totalDistance = marks[wayNodes.indexOf(endNode)];
    var path = [];
    var previousNode = '';
    let flag = path.includes(startNode);
    while (!flag){
        let i = 0;
        while (i < wayAdjacencyMatrix[wayNodes.indexOf(endNode)].length){
            if (wayAdjacencyMatrix[wayNodes.indexOf(endNode)][i]){
                var difference = marks[wayNodes.indexOf(endNode)] - wayAdjacencyMatrix[wayNodes.indexOf(endNode)][i];
                if (difference === marks[i]){
                    previousNode = wayNodes[i];
                }
            }
            i+=1;
        }
        path.push(endNode);
        endNode = previousNode;
        if(endNode === startNode){ flag = true;}
    }
    path.push(startNode)
    path.reverse();
    return [path, totalDistance];
}

/*console.log('Кратчайший путь от: '+ startNode + ' к: ' + endNode + ' проходит через: '
            + Dejkstra(startNode,endNode)[0] + ' длина пути = '+ Dejkstra(startNode,endNode)[1]);*/


/*function findPath(startNode, endNode) {
    var marks = [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000];
    marks[wayNodes.indexOf(startNode)] = 0;
    return Dejkstra(startNode,endNode);
    //return [path, totalDistance];
}*/