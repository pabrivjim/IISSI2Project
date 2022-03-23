document.addEventListener('DOMContentLoaded', function () {

    
    
    
    
    
    
    
    
    
    //ESTE SCRIPT ACTUALMENTE NO SE USA. PERO LO HE DEJADO EN EL PROYECTO YA QUE PUEDE SERVIR REALMENTE EN UN
    //FUTURO EN EL CASO DE QUE NO QUERÁMOS ACTUALIZAR LA PAGINA COMPLETAMENTE SIMPLEMENTE AL POSTEAR UN COMENTARIO











    const commentList = document.getElementById('comments-list');
    const comment = document.getElementById('escribir-comentario');
    const sendComment = document.getElementById('enviar-comentario');

    sendComment.onclick = function () {
        if(!(comment.value ==="")){
            const createComment = document.createElement('div');
            let today = new Date().toLocaleDateString()
            createComment.innerHTML = `<div class="card p-2 mx-3 mt-2">
            <div class="d-flex justify-content-between align-items-center">
                <div id="user-comment">
                    <div class="user d-flex flex-row align-items-center" id="avatar-user-comment">
                        <img src="./images/avatar_placeholder.png" width="30"
                            class="user-img rounded-circle mr-2"> <span><a href="#"><small
                                    class="font-weight-bold text-primary">User1</small></a></span>
                    </div>
                    <div class="user d-flex flex-row align-items-center">
                        <span id="comment-text"><small class="font-weight-bold">${comment.value}</small></span>
                    </div>
                </div>
            </div>
    
            <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4"><small>${today}</small></div>
                    <div style="display: inline-flex;">
                        <div class="icons align-items-center m-1" role="button" id="like">
                            
                        </div>
                        <div class="icons align-items-center m-1" role="button" id="dislike">
                            
                        </div>
                    </div>
                </div>
            </div>`;
            const like = document.createElement('div');
            like.classList.add('icons', 'align-items-center','m-1');
            like.innerHTML = `<i class="fa fa-angle-up text-success"></i>`;
    
            const unlike = document.createElement('div');
            unlike.setAttribute('role', 'button')
            unlike.classList.add('icons', 'align-items-center','m-1');
            unlike.innerHTML = `<i class="fa fa-angle-down text-danger"></i>`;
            
            createComment.children[0].children[1].children[1].children[0].appendChild(like);
            createComment.children[0].children[1].children[1].children[1].appendChild(unlike);
    
    
            commentList.appendChild(createComment);
        }
        
        // like.onclick = function (e) {
        //     console.log(id);
        //     removeTodo(row.getAttribute('id'));
        // }
        
    }

});