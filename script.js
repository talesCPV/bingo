
const data = new Object
    data.run = false
    data.speed = 1000
    data.cartelas = []
    data.minhas = []
    data.saiu = []
    data.naosaiu = []

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
      close()
  })

  function close(){
    document.getElementById("myModal").style.display = "none";
  }

    function valInt(edt){
        edt.value = getNum(edt.value)
    }

    function getNum(V){
        const ok_chr = ['1','2','3','4','5','6','7','8','9','0'];
        let out = ''
        for(let i=0; i< V.length; i++){
            if(ok_chr.includes(V[i])){
                out+=V[i]
            }
        }

        return ['','0'].includes(out) ? 1 : out
    }


    function start(){
        data.naosaiu = []
        for(let i=1; i<=75; i++){
            data.naosaiu.push(i)
        }
        data.run = true
        data.speed = (parseInt(document.querySelector('#edtSpeed').value)+1) * 1000
    }


    function sorteio(){
        const index = Math.floor(Math.random()*data.naosaiu.length)
        data.saiu.push(data.naosaiu[index])
        data.naosaiu.splice(index,1)
        document.querySelector('#edtNumSorteado').innerHTML = ''
        for(let i=0; i<data.saiu.length; i++){
            document.querySelector('#edtNumSorteado').innerHTML += data.saiu[i]+', ' 
        }


    }


/* RUN */

setInterval(()=>{
    if(data.run){
        sorteio()
    }
}, data.speed);

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
