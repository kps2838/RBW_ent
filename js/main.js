$(function(){

    // 섹션 스크롤
    window.onload = function(){
        const elm = document.querySelectorAll('section');
        const elmCount = elm.length;
        elm.forEach(function(item, index){
          item.addEventListener('mousewheel', function(event){
            event.preventDefault();
            let delta = 0;
  
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
  
            let moveTop = window.scrollY;
            let elmSelector = elm[index];
  
            // wheel down : move to next section
            if (delta < 0){
              if (elmSelector !== elmCount-1){
                try{
                  moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                }catch(e){}
              }
            }
            
            // wheel up : move to previous section
            else{
              if (elmSelector !== 0){
                try{
                  moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                }catch(e){}
              }
            }
  
            const body = document.querySelector('html');
            window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
          });
        });
    }
    


    // 스크롤 애니메이션

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
        } else {
          entry.target.classList.remove('on');
        }
      });
    },{
      threshold : 0.5,
    });
    
    const img = document.querySelectorAll('section:not(:first-child) .container > *');
    img.forEach(el => observer.observe(el));

});