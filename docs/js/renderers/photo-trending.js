"use strict";
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { trendingRenderer } from "/js/renderers/trending.js" ;


const trendingsContent ={
    /*Usuarios más seguidos*/
    asTrendingTopUser : function(photos){
        let trendingContainer = parseHTML ( '<div id="mostFollowUsers" class="photo-trendings"> </div>');
        
        let title = parseHTML('<h3 id="trending-title"> Usuarios más seguidos </h3>');
        let row = parseHTML ( '<div class="row"> </div>') ;
        
        trendingContainer.appendChild (title);
        trendingContainer.appendChild (row);
        trendingContainer.appendChild (parseHTML("<hr>"));

        let counter = 0;

        for(let photo of photos){
            let card= trendingRenderer.asTrendingsCardTopUser(photo);
            row.appendChild(card);
            counter+=1;

            if(counter===5){
                
                return trendingContainer;
            }
        }
        return trendingContainer;
    },
    /*Fotos mas comentadas*/
    asTrendingMostComment : function(photos){
        let trendingContainer = parseHTML ( '<div id="mostCommentsPic" class="photo-trendings"> </div>');
        
        let title = parseHTML('<h3 id="trending-title"> Fotos con más comentarios </h3>');
        let row = parseHTML ( '<div class="row"> </div>') ;
        
        trendingContainer.appendChild (title);
        trendingContainer.appendChild (row);
        trendingContainer.appendChild (parseHTML("<hr>"));

        let counter = 0;

        for(let photo of photos){
            let card= trendingRenderer.asTrendingsMostComments(photo);
            row.appendChild(card);
            counter+=1;

            if(counter===5){
                
                return trendingContainer;
            }
        }
        return trendingContainer;
    },
    /*Categorías mas usadas*/
    asTredingTopic : function(photos){
        let trendingContainer = parseHTML ( '<div  id="trendingCategory"class="photo-trendings"> </div>');
        
        let title = parseHTML('<h3 id="trending-title"> Categoría mas usada </h3>');
        let row = parseHTML ( '<div class="row"> </div>') ;
        
        trendingContainer.appendChild (title);
        trendingContainer.appendChild (row);
        trendingContainer.appendChild (parseHTML("<hr>"));

        let counter = 0;

        for(let photo of photos){
            let card= trendingRenderer.asTrendingMostUsedTopic(photo);
            row.appendChild(card);
            counter+=1;

            if(counter===5){
                
                return trendingContainer;
            }
        }
        return trendingContainer;
    },
    /*Fotos mejor puntuadas*/
    asTopPicRating : function(photos){
        let trendingContainer = parseHTML ( '<div id="mostValuedPic" class="photo-trendings"> </div>');
        
        let title = parseHTML('<h3 id="trending-title"> Fotos mejor puntuadas </h3>');
        let row = parseHTML ( '<div class="row"> </div>') ;
        
        trendingContainer.appendChild (title);
        trendingContainer.appendChild (row);
        trendingContainer.appendChild (parseHTML("<hr>"));

        let counter = 0;

        for(let photo of photos){
            let card= trendingRenderer.asTrendingsTopPicRating(photo);
            row.appendChild(card);
            counter+=1;

            if(counter===5){
                
                return trendingContainer;
            }
        }
        return trendingContainer;
    },
    /*Usuarios mejores puntuados*/
    asTrendingTopUserPuntuation : function(photos){
        let trendingContainer = parseHTML ( '<div id="mostValuedUsers" class="photo-trendings"> </div>');
        
        let title = parseHTML('<h3 id="trending-title"> Usuarios mejor puntuados </h3>');
        let row = parseHTML ( '<div class="row"> </div>') ;
        
        trendingContainer.appendChild (title);
        trendingContainer.appendChild (row);
        trendingContainer.appendChild (parseHTML("<hr>"));

        let counter = 0;

        for(let photo of photos){
            let card= trendingRenderer.asTrendingsCardTopUserPuntuation(photo);
            row.appendChild(card);
            counter+=1;

            if(counter===5){
                
                return trendingContainer;
            }
        }
        return trendingContainer;
    },
};

export {trendingsContent};