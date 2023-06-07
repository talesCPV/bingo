for(let x=0; x<5; x++){
    const line = document.createElement('div')
    line.className = (x==0 ? '' : 'lin ') + 'line'
    for(let y=0; y<5; y++){
        const cell = document.createElement('div')
        cell.className = (y==0 ? '' : 'col ') + 'cell cell'+x+'-'+y
        line.appendChild(cell)
    }
    document.querySelector('.numbers').appendChild(line)
}


class Cartela{
    constructor(){
        function create(S){
        const col = []
        while(col.length<5){
            const x = Math.floor(Math.random()*15) +S
            if(!col.includes(x)){
            col.push(x)        
            }
        }
        return col
        }
        
        this.B = create(1)
        this.I = create(16)
        this.N = create(31)
        this.G = create(46)
        this.O = create(61)
        this.N[2] = 0
    }

}

const cartela = new Cartela

function showCartela(C){        
    for(let x=0; x<5; x++){
        for(let y=0; y<5; y++){
            const cell = document.querySelector('.cell'+x+'-'+y)
            cell.innerHTML = C['BINGO'[y]][x] == 0 ? 'FREE' : C['BINGO'[y]][x]
            C['BINGO'[y]][x] == 0 ? cell.className += ' center' :  ''
        }
    } 
}

async function openHTML(template=""){
    
    if(template.trim() != ""){
        return await new Promise((resolve,reject) =>{
            fetch( "templates/"+template)
            .then( stream => stream.text())
            .then( text => {
                const temp = document.createElement('div');
                temp.innerHTML = text;
                
                document.querySelector('#md-header').innerHTML = temp.getElementsByTagName('title')[0].innerHTML
                document.querySelector('#md-body').innerHTML = temp.getElementsByTagName('template')[0].innerHTML
                eval(temp.getElementsByTagName('script')[0].innerHTML);                                  
                document.getElementById("myModal").style.display = "block";                  
            }); 
        }); 
    }
  }
  
  document.querySelector('.close').addEventListener('click',()=>{
      document.getElementById("myModal").style.display = "none"; 
  })


showCartela(cartela)

