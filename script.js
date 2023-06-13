
const data = new Object
    data.clock = new Object
    data.clock.run = false
    data.clock.speed = 5
    data.clock.count = 0
    data.cartelas = []
    data.saiu = []
    data.naosaiu = []
    data.rodada = 0
    data.mark = false

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
    data.mark = false
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
        data.rodada++
        document.querySelector('#edtSortNum').innerHTML = data.rodada.toString().padStart(2,'0')
        document.querySelector('#edtNumSorteado').innerHTML = ''
        data.saiu = []
        data.naosaiu = []
        for(let i=1; i<=75; i++){
            data.naosaiu.push(i)
        }
        openHTML('cartela.html')
    }

    function sorteio(){
        const index = Math.floor(Math.random()*data.naosaiu.length)
        data.saiu.push(data.naosaiu[index])
        const col = 'BINGO'[Math.floor((parseInt(data.naosaiu[index])-1)/15)]
        document.querySelector('#edtSorteio').innerHTML = col+'-'+data.naosaiu[index]
        data.naosaiu.splice(index,1)
        document.querySelector('#edtNumSorteado').innerHTML = ''
        for(let i=0; i<data.saiu.length; i++){
            document.querySelector('#edtNumSorteado').innerHTML += data.saiu[i]+', ' 
        }
        for(let i=0; i<data.cartelas.length; i++){
            if(checaCartela(i)){
                if(i==0){
                    alert('BIIIINNNGOOOOOO!!!!\r\nUHUULLLL PARABÉNS, VOCÊ VENCEU!!!!')
                }else{
                    alert(`BINGO!!!\r\nCartela num.${i} venceu`)
                }
                start()
                data.clock.run = false
                document.querySelector('#btnPlay').innerHTML = 'PLAY'
                document.querySelector('#edtSorteio').innerHTML = ''
                openHTML('begin.html')
            }
        }

    }

    function checaCartela(cardNum,full=false){  
        C = data.cartelas[cardNum]
        let out = false      
        const marca = new Object
            marca.l1 = 0
            marca.l2 = 0
            marca.l3 = 0
            marca.l4 = 0
            marca.l5 = 0
            marca.c1 = 0
            marca.c2 = 0
            marca.c3 = 0
            marca.c4 = 0
            marca.c5 = 0
            marca.d1 = 0
            marca.d2 = 0
            marca.cheia = 0

        for(let y=0; y<5; y++){
            for(let x=0; x<5; x++){
                const n = C['BINGO'[y]][x] 
                if(data.saiu.includes(n) || n==0){
                    marca.l1 += x==0 ? 1 : 0
                    marca.l2 += x==1 ? 1 : 0
                    marca.l3 += x==2 ? 1 : 0
                    marca.l4 += x==3 ? 1 : 0
                    marca.l5 += x==4 ? 1 : 0
                    marca.c1 += y==0 ? 1 : 0
                    marca.c2 += y==1 ? 1 : 0
                    marca.c3 += y==2 ? 1 : 0
                    marca.c4 += y==3 ? 1 : 0
                    marca.c5 += y==4 ? 1 : 0
                    marca.d1 += x==y ? 1 : 0
                    marca.d2 += x==4-y ? 1 : 0
                    marca.cheia++

                    if(cardNum == 0 && data.mark){
                        const cell = document.querySelector('.cell'+x+'-'+y)
                        cell.classList.add('mark')                           
                    }
                                        
                }
            }
        }

        if(full){
            out = marca.cheia == 25 ? true : false
        }else{
            out = marca.l1 == 5 ? true : out
            out = marca.l2 == 5 ? true : out
            out = marca.l3 == 5 ? true : out
            out = marca.l4 == 5 ? true : out
            out = marca.l4 == 5 ? true : out
            out = marca.c1 == 5 ? true : out
            out = marca.c2 == 5 ? true : out
            out = marca.c3 == 5 ? true : out
            out = marca.c4 == 5 ? true : out
            out = marca.c5 == 5 ? true : out
            out = marca.d1 == 5 ? true : out
            out = marca.d2 == 5 ? true : out
        }        
        return out
    }


/* RUN */
    setInterval(()=>{
        if(data.clock.run){
            data.clock.count ++
            console.log(1)
            if(data.clock.count >= data.clock.speed){
                sorteio()
                data.clock.count = 0
            }
        }
    }, 500);

