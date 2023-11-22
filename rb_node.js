const BLACK = 0
const RED = 1

function validateInput(inputElement, errorElementId) {
    var inputValue = inputElement.value;
    var errorElement = document.getElementById(errorElementId);

    // Your validation logic here
    if (isNaN(inputValue)) {
        errorElement.textContent = "Insira um número válido.";
        errorElement.style.fontSize = "14px";
    } else {
        errorElement.textContent = ""; // Clear the error message if input is valid
    }
}

function showMessage(node, msgCase) {

    if (msgCase == 'delete' && node == null) {
        var canvas = document.getElementById('myCanvas');
        
        // Get the 2d rendering context for the canvas
        var context = canvas.getContext('2d');
        var context = canvas.getContext('2d');
        context.font = "15px Arial"; // Font size and type
        context.fillStyle = "#FFFFFF"; // Text color
        context.fillText("Esse nó não está presente na árvore!", 500, 50);
    }
}

function getSearchInput() {

    // Get the input element by its ID
    var inputElement = document.getElementById("searchInput");

    // Access the input value
    var inputValue = Number(inputElement.value);

    if (isNaN(inputValue))
        return;

    let node = t.binarySearch(inputValue);

    var canvas = document.getElementById('myCanvas');
        
        // Get the 2d rendering context for the canvas
        var context = canvas.getContext('2d');
        var context = canvas.getContext('2d');
        context.font = "15px Arial"; // Font size and type
        context.fillStyle = "#FFFFFF"; // Text color
        showTree(t);
        console.log(node.value);
        if (node.value != null)
            context.fillText("Nó " + inputValue + " está presente na árvore.", 500, 50);
        else
            context.fillText("Nó " + inputValue + " não está presente na árvore.", 500, 50);

    

}

function getInsertInput() {

     // Get the input element by its ID
     var inputElement = document.getElementById("insertInput");

     // Access the input value
     var inputValue = Number(inputElement.value);
    
    if (isNaN(inputValue))
        return;

    node = new Node(inputValue, null, RED);
    t.insert(t.root, node);
    t.fixTree(node);
    t.root.color = BLACK;
    t.preorder(t.root);
    t.inorder(t.root);

    //console.log("AAAAAAAAAAAAAA" + t.root.leftChild.leftChild.value);
    showTree(t);

}

function getDeleteInput() {

    // Get the input element by its ID
    var inputElement = document.getElementById("deleteInput");

    // Access the input value
    var inputValue = Number(inputElement.value);

    if (isNaN(inputValue))
        return;

   let deletedNode = t.deleteNode(inputValue);
   t.preorder(t.root);
   t.inorder(t.root);

   //console.log("AAAAAAAAAAAAAA" + t.root.leftChild.leftChild.value);
   showTree(t);
   showMessage(deletedNode, 'delete');

}

function preOrderTree(currentNode, context) {

    

    if (currentNode.value == null) {
        //i++;
        return;
    }
    context.beginPath();
    if (currentNode.color == RED)
        context.fillStyle = 'red';
    else
        context.fillStyle = 'black';
    context.arc(currentNode.x, currentNode.y, 20, 0, 2 * Math.PI);

    // Set line styles
        context.strokeStyle = "#000000"; // Red color
        context.lineWidth = 2; // Line width

            // Draw a line from (50, 50) to (150, 150)
        //context.beginPath();
    if (currentNode.rightChild.value != null) {
        context.moveTo(currentNode.x, currentNode.y);
        context.lineTo(currentNode.rightChild.x, currentNode.rightChild.y);
        context.stroke();
    }

    if (currentNode.leftChild.value != null) {
        context.moveTo(currentNode.x, currentNode.y);
        context.lineTo(currentNode.leftChild.x, currentNode.leftChild.y);
        context.stroke();
    }
    
    context.fill();

    context.font = "15px Arial"; // Font size and type
    context.fillStyle = "#FFFFFF"; // Text color

            // Draw text at coordinates (50, 50)
    
    context.fillText(currentNode.value, (currentNode.x - 10), (currentNode.y) +5);

    context.closePath();
    
    preOrderTree(currentNode.leftChild, context);
    
    preOrderTree(currentNode.rightChild, context);
}

function showTree(tree) {
    var canvas = document.getElementById('myCanvas');
        
        // Get the 2d rendering context for the canvas
        var context = canvas.getContext('2d');
        var context = canvas.getContext('2d');
        let wid = canvas.width;
        let hei = canvas.height;

        // Set the fill style to red
        context.clearRect(0, 0, wid, hei);
        
        preOrderTree(t.root, context);
}

function getColor(uncleNode) {
    if (uncleNode == null)
        return BLACK;
    else
        return uncleNode.color;     
}

function getNodeHeight(node) {
    if (node === null) {
      return -1; // Height of an empty subtree is -1
    }
  
    // Recursively calculate the height of the left and right subtrees
    const leftHeight = getNodeHeight(node.leftChild);
    const rightHeight = getNodeHeight(node.rightChild);
  
    // Return the maximum height plus one
    return Math.max(leftHeight, rightHeight) + 1;
  }

function inorderPrint(currentNode) {

    if (currentNode.value == null)
        return;
    inorderPrint(currentNode.leftChild);
    //document.write(currentNode.value + " ");
    inorderPrint(currentNode.rightChild);
}


class NullNode {
    constructor(parent) {
        this.value = null;
        this.parentNode = parent;
        this.leftChild = null;
        this.rightChild = null;
        this.color = BLACK;
    }
}

class Node {
    constructor(value, parentNode, color) {
        this.value = value;
        this.parentNode = parentNode;
        this.leftChild = new NullNode(this);
        this.rightChild = new NullNode(this);
        this.color = color;
        this.x = 0;
        this.y = 0;
    }

    definePos(width) {
        
        if (this == t.root) {
            this.x = width / 2;
            this.y = 100;
        }
        
        if (this != t.root)
            if (this.parentNode.rightChild == this) {
                this.leftChild.x = this.x - 50;
                this.rightChild.x = this.x + 50;
            } else {
                this.leftChild.x = this.x - 50;
                this.rightChild.x = this.x + 50;
            }
        else {
            this.leftChild.x = this.x - 200;
            this.rightChild.x = this.x + 200;
        }

        this.leftChild.y = this.y + 100;
        this.rightChild.y = this.y + 100;
        

    }

    rotateLeft(x, y) {

        x.rightChild = y.leftChild;
        if (x.rightChild != null)
            x.rightChild.parentNode = x;
        
        y.leftChild = x;
        y.parentNode = x.parentNode;
        if (x.parentNode != null)
            if (x == x.parentNode.rightChild)
                x.parentNode.rightChild = y;
            else
                x.parentNode.leftChild = y;
        x.parentNode = y;

        if (x == t.root) { 
            t.root = y;
            y.parentNode = sentinel;
        }
        if (y == t.root)
            console.log("yyyy");  
    }

    rotateRight(x, y) {
        y.leftChild = x.rightChild;
        if (y.leftChild != null)
            y.leftChild.parentNode = y;

        x.rightChild = y;
        x.parentNode = y.parentNode;
        if (y.parentNode != null)
            if (y == y.parentNode.rightChild)
                y.parentNode.rightChild = x;
            else
                y.parentNode.leftChild = x;
        y.parentNode = x;

        if (x == t.root) 
            console.log("xxxx");
        if (y == t.root) {
            t.root = x;
            x.parentNode = sentinel;
        }   
        
    }

    changeColor() {

        if (this == null)
            return;

        if (this.color == RED)
            this.color = BLACK;
        else
            this.color = RED;
    }

    getUncleNode() {
        if (this.parentNode == this.parentNode.parentNode.rightChild)
            return this.parentNode.parentNode.leftChild;
        else
            return this.parentNode.parentNode.rightChild;
    }

    isLeftChild() {
        return this == this.parentNode.leftChild;
    }
}

class RB_Tree {

    constructor(root) {
        this.root = root;
    }

    insert(currentNode, x) {

        if (this.root.value == null) {
            console.log("hm");
            this.root.value = x.value;
            return;
        }
        

        if (currentNode.value == null) 
            return x;
        
            if (currentNode.value > x.value) {
                currentNode.leftChild = this.insert(currentNode.leftChild, x);
                currentNode.leftChild.parentNode = currentNode;
            } else if (currentNode.value < x.value) {
                currentNode.rightChild = this.insert(currentNode.rightChild, x);
                currentNode.rightChild.parentNode = currentNode;
            }
            
            return currentNode;
    }

    binarySearch(val) {
        
        let temp = this.root;
        while (temp != null) {
            if (val < temp.value) {
                if (temp.leftChild == null)
                  break;
                else
                  temp = temp.leftChild;
            } else if (val == temp.value) {
                break;
            } else {
                if (temp.rightChild == null)
                  break;
                else
                  temp = temp.rightChild;
              }
            }
         
            return temp;
          
    }

    successor(x) {

        let temp = x;

        while (temp.leftChild.value != null) {
            temp = temp.leftChild;
        }

        return temp;
    }

    replace(x) {

        if (x.rightChild != null && x.leftChild != null)
            return t.successor(x.rightChild);

        if (x.rightChild == null && x.leftChild == null)
            return null;

        if (x.leftChild != null)
            return x.leftChild;
        else
            return x.rightChild;

    }

    transplant(parent, child) {
        if (parent.parentNode.value == null) //u estava na raiz
            this.root = child;
        else
            if (parent == parent.parentNode.leftChild)
                parent.parentNode.leftChild = child;
            else
                parent.parentNode.rightChild = child;
        if (child != null)
            child.parentNode = parent.parentNode;
    }

    delete(z) {
        let y = z;
        let x = null;
        let xparent = null;
        let originalColor = y.color;

        if (z.leftChild instanceof NullNode) {
            x = z.rightChild;
            xparent = z;
            this.transplant(z, z.rightChild);
            console.log("CASO 1");
        } else
            if (z.rightChild instanceof NullNode) {
                x = z.leftChild;
                xparent = z;
                this.transplant(z, z.leftChild);
                console.log("CASO 2");
            } else {
                // tem dois filhos
                y = this.successor(z.rightChild);
                originalColor = y.color;
                x = y.rightChild; // null?
                console.log("aqui:" + y.value);
                xparent = y; // sucessor
                console.log("CASO 3");
                console.log(y.value);
                if (y != z.rightChild) {
                    
                    this.transplant(y, y.rightChild);
                    //console.log("yyy: " + y.rightChild.value);
                    y.rightChild = z.rightChild;
                    y.rightChild.parentNode = y;
                    console.log("CASO 4");
                } else {
                    
                    if (x != null) {
                        x.parentNode = y;
                        xparent = y;
                        console.log("CASO 5");
                    }
                }
                
                this.transplant(z, y);
                y.leftChild = z.leftChild;
                y.leftChild.parentNode = y;
                y.color = z.color;
            }
        

        if (originalColor == BLACK)
            this.redBlackDeleteFixup(x, xparent);
    }

    redBlackDeleteFixup(x, xparent) {
        let w = null;
        /* x.rotateRight(x, x.parentNode);
            x.rotateLeft(x.parentNode, x);*/

        let colorX = getColor(x);
        console.log("x: ", x.value);
        while (x != this.root && x.color == BLACK) {

            

            if (x == x.parentNode.leftChild) { //era um filho esquerdo?
                console.log("filho esq");
                w = x.parentNode.rightChild;
                console.log("w: " + w.value);

                if (w.color == RED) {
                    console.log("irmao red");
                    w.color = BLACK;
                    x.parentNode.color = RED;
                    x.parentNode.rotateLeft(x.parentNode.parentNode, x.parentNode); // arrumar
                    w = x.parentNode.rightChild;
                }

                if (w.leftChild.color == BLACK && w.rightChild.color == BLACK) {
                    console.log("filhos w pretos");
                    w.color = vermelho;
                    x = x.parentNode;

                    colorX = getColor(x);
                } else {
                    
                    if (w.rightChild.color == BLACK) {
                        console.log("filho direito preto");
                        w.leftChild.color = BLACK;
                        w.color = RED;
                        w.rotateRight(w, w.parentNode);
                        w = x.parentNode.rightChild;
                    }
                    console.log("??????")
                    w.color = x.parentNode.color;
                    x.parentNode.color = BLACK;
                    w.rightChild.color = BLACK;
                    x.parentNode.rotateLeft(x.parentNode, w)
                    x = this.root;
                    colorX = getColor(x);
                }
            } else {
                    w = x.parentNode.leftChild;
                    console.log("filho dir");
                    if (w.color == RED) {
                        w.color = BLACK;
                        x.parentNode.color = RED;
                        x.parentNode.rotateRight(x.parentNode, x.parentNode.parentNode); // arrumar
                        w = x.parentNode.leftChild;
                    }
        
                    if (w.rightChild.color == BLACK && w.leftChild.color == BLACK) {
                        w.color = RED;
                        x = x.parentNode;
                        colorX = getColor(x);
                    } else {
                        if (w.leftChild.color == BLACK) {
                            w.rightChild.color = BLACK;
                            w.color = RED;
                            w.rotateLeft(w.parentNode, w);
                            w = x.parentNode.leftChild;
                        }
                        w.color = x.parentNode.color;
                        x.parentNode.color = BLACK;
                        w.leftChild.color = BLACK;
                        x.parentNode.rotateRight(w, x.parentNode);
                        console.log("root:" + this.root.value);
                        x = this.root;
                        colorX = getColor(x);
                    }
            
            }
            
        }
        x.color = BLACK;
    }
    deleteNode(val) {

        let x = this.binarySearch(val);

        if (x.value != null)
            this.delete(x);
        else
            return null;
        return x;
        
    }

    inorder(currentNode) {
        if (currentNode.value == null)
            return;
        this.inorder(currentNode.leftChild);
        console.log(currentNode.value, currentNode.color, currentNode.leftChild.value);
        this.inorder(currentNode.rightChild);
    }

    preorder(currentNode) {
        
        console.log(currentNode);
        if (currentNode instanceof NullNode)
            return;

        if (currentNode instanceof Node ) {
            
            console.log("preorder:" + currentNode.value);
        
        
            currentNode.definePos(1000);
        
         
        this.preorder(currentNode.leftChild);
        
        this.preorder(currentNode.rightChild);
        } 
        return;
    }
    

    fixTree(x) {

        console.log("entrou");

        if (this.root.rightChild.value == null && this.root.leftChild.value == null)
            return;

        if (x.value == null || x.parentNode.value == null || x.parentNode.parentNode == sentinel)
            return;

        let uncleNode = null;
        let uncleColor = RED;
        console.log("pai: " + x.parentNode.value);

        if (x != this.root)
            console.log("nao e root");
        if (x.color != BLACK)
            console.log("nao e preto");
        if (x.parentNode.color == RED)
            console.log("pai vermelho");

        while ((x != this.root) && (x.color != BLACK) && x.parentNode.color == RED ) {
            console.log("arrumando!")

            uncleNode = x.getUncleNode();
            uncleColor = getColor(uncleNode);

            // case uncle red (recoloring)
            if (x.color == RED && x.parentNode.color == RED && uncleColor == RED) {
                console.log(x.value + ": uncle red: " + uncleNode.value);
                x.parentNode.changeColor();
                x.parentNode.parentNode.changeColor();
                uncleNode.color = BLACK;
                uncleColor = BLACK;
                
                if (x.parentNode != null)
                    x = x.parentNode.parentNode;
                if (x == null || x.parentNode == null || x.parentNode.parentNode == null)
                    break;
                continue;

            } else {

                // uncle black left left
                if (x.color == RED && x.parentNode.color == RED && x == x.parentNode.leftChild) {
                    console.log(x.value + ": left left");
                    x.rotateRight(x.parentNode, x.parentNode.parentNode);
                    x.parentNode.changeColor();
                    x.parentNode.rightChild.changeColor();
                    if (x.parentNode != null)
                        x = x.parentNode.parentNode;

                    if (x == null || x.parentNode == null || x.parentNode.parentNode == null)
                        break;
                    continue;
                    
                }
                
                // uncle black left right
                if (x.color == RED && x.parentNode.color == RED && x == x.parentNode.rightChild && x.parentNode == x.parentNode.parentNode.leftChild) {
                    console.log(x.value + ": left right");
                    x.rotateLeft(x.parentNode, x);
                    x.rotateRight(x, x.parentNode);
                    x.changeColor();
                    x.rightChild.changeColor();
                    if (x.parentNode != null)
                        x = x.parentNode.parentNode;
                    if (x == null || x.parentNode == null || x.parentNode.parentNode == null)
                        break;
                    continue;

                }

                // uncle black right right
                if (x.color == RED && x.parentNode.color == RED && x == x.parentNode.rightChild && x.parentNode == x.parentNode.parentNode.rightChild) {
                    console.log(x.value + ": right right");
                    
                    x.rotateLeft(x.parentNode.parentNode, x.parentNode);
                    x.parentNode.leftChild.changeColor();
                    x.parentNode.changeColor();
                    if (x.parentNode != null)
                        x = x.parentNode.parentNode;

                    if (x == null || x.parentNode == null || x.parentNode.parentNode == null)
                        break;
                    continue;
                }
                
                // uncle black right left
                if (x.color == RED && x.parentNode.color == RED && x == x.parentNode.leftChild && x.parentNode == x.parentNode.parentNode.rightChild) {
                    console.log(x.value + ": right left");
                    x.rotateRight(x, x.parentNode);
                    x.rotateLeft(x.parentNode, x);
                    x.changeColor();
                    x.leftChild.changeColor();
                    if (x.parentNode != null)
                        x = x.parentNode.parentNode;
                    if (x == null || x.parentNode == null || x.parentNode.parentNode == null)
                        break;
                    continue;
                }

            }
            
        }
        
    }

}

let i = 0;

sentinel = new NullNode(null);

r = new Node(null, null, BLACK); 
t = new RB_Tree(r);
nodeNums = [25, 3, 11, 67, 15, 70, 80, 90, 100];

/*for (let i = 0; i < nodeNums.length-1 ; i++) {
    node = new Node(nodeNums[i], null, RED); 

    t.insert(t.root, node);
    t.fixTree(node);
    t.root.color = BLACK;

}*/

/*console.log(t.root.leftChild.leftChild.rightChild.value)

t.root.definePos(800);
console.log(t.root.x);

/*t.root.rightChild.definePos(800);
console.log(t.root.rightChild.rightChild.x);
console.log(t.root.leftChild.x);*/



//t.preorder(t.root);
//t.inorder(t.root);

//t.inorder(t.root);
//showTree(t);
