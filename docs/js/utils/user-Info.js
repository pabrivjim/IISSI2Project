document.addEventListener('DOMContentLoaded', function () {

    //Script que se usaba antes para cambiar el color del botón actualmente este script está en desuso
    //ya que se alberga implementado en userInfo.js. He decidido dejarlo por ver un poco quizás la transición
    //del proyecto


    const follow = document.getElementById('follow-button');

    follow.onclick = function(){
        
        if(follow.innerText === 'Seguir'){
            follow.innerText = 'Dejar de seguir';
            follow.classList.remove('btn-primary');
            follow.classList.add('btn-danger')
        }else if (follow.innerText === 'Dejar de seguir'){
            follow.innerText = 'Seguir';
            follow.classList.remove('btn-danger')
            follow.classList.add('btn-primary');
            
        }
        
    }
});