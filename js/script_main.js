// 0. header 스크롤 방향 이벤트
$(function() {
    var prevScrollTop = 0;
    document.addEventListener("scroll", function(){
        
        var nowScrollTop = $(window).scrollTop(); //현재 스크롤 위치를 nowScrollTop 에 저장
        
        if (nowScrollTop > prevScrollTop){ $('header').addClass('active'); } // 스크롤 방향(Down) 내릴때 -> 헤더에 active 클래스 추가
        else { $('header').removeClass('active'); } // 스크롤 방향(Up) 올릴때 -> 헤더에 active 클래스 제거
        prevScrollTop = nowScrollTop;  // prevScroll, nowScrollTop 조건 판단 후, 현재 스크롤값을 prevScrollTop 에 저장
    });
});


// 1. Gnb 마우스 오버 splitting
$(function() { Splitting(); });

// 2. Scroll animaition
$(function(){
   $('.animate').scrolla({
       mobile: true,  // 모바일버전시 활성화
       once: false // 스크롤시 딱 한번만 하고 싶을 땐 true
   });
});

// 3.SVG path 길이 구하기
// 3-1. find() 안에 순서대로 #svgAni01 ~ #svgAni04  값 넣어서 얼럿으로 값 확인 해서 css에 적기
$(function(){
    $('.svgAni').find('#svgAni01').each(function(i, path){
        var length = path.getTotalLength();
        //alert(length);  
    });
});



$(function(){
    
// 4. gsap -> con01 비디오 모션
// start / end 타이밍 맞춘 기준 : 비디오가 화면에 보이자 마자 시작해서 비디오가 꽉찰때 끝나도록 맞춤
    
    gsap.timeline({ //순서대로 이벤트가 진행될 수 있도록 만들어 줌.
        scrollTrigger: {
            trigger: '.con01', // 트리거 대상
            start: '0% 80%', // 0% -> 트리거 대상의 시작지점 (start) / 50% -> 시작 지점 scroller-start  이두개가 만났을때 시작
            end: '100% 100%', // 앞에 100% -> 트리거 대상의 종료지점 (end) / 뒤에 100% -> 종료 지점 scroller-end 이두개가 만났을때 애니 종료
            scrub: 1, // scrub은 GSAP ScrollTrigger의 이벤트가 스크롤이 사용될때만 재생되도록 만들어주는 속성
            //markers: true, // 시작위치 끝위치 확인 가능한 마커 
        }
    })
    
    // 4-1. con01 이 보이면 .wrap 배경색 흰색 변경과 / 글씨 컬러 검정으로 변경
    // gsap.to() 메서드는 움직임의 끝나는 점을 지정하는 애니메이션 -> gsap.to("타겟", {속성: 속성값, ....});
    .to('.wrap',{backgroundColor:"#fff", color:"#000",ease: 'none',duration: 5},0)
    // 4-2. con01 이 보이면 .svgAni path stroke 컬러 검정으로 변경
    .to('.svgAni path',{stroke:"#000"},{stroke:"#fff",ease: 'none',duration: 5},0)
    // 4-3. con01 이 보이면 .scroll 글씨 숨겨줌
    .to('.scroll',{opacity:"0",ease: 'none',duration: 5},0)
    // 4-4. con01 이 보이면 video 가 clip-path 속성으로 둥글게 영역이 삭제된것 처럼 보였다가 원래 상태로 전체 꽉차게 보여준다
    // gsap.fromTo() 메서드는 시작 점과 끝나는 점을 지정하는 애니메이션 -> gsap.fromTo("타겟", {시작 속성: 시작 속성값, ....},{끝나는 속성: 끝나는 속성값, ....});
    .fromTo('.videoWrap video',{'clip-path': 'inset(60% 60% 60% 60% round 30%)'},{'clip-path': 'inset(0% 0% 0% 0% round 0%)',ease: 'none',duration: 10},0)

    
    
// 5. gsap -> MY WORK 모션    
// start / end 타이밍 맞춘 기준 : MY WORK 글씨가 화면에 보이자 마자 글씨가 모이면서 글씨가 중앙 왔을때 종료
    
    gsap.timeline({
        scrollTrigger: {
            trigger: '.con02', 
            start: '0% 100%', 
            end: '0% 20%',
            scrub: 1, 
            //markers: true
        }
    })
    // 5-1. con02 .title a 와 b 가 서로 반대에서 제자리로 돌아 오도록
    .fromTo('.con02 .title .a',{x: '-100%'},{x: '0%',ease: 'none',duration: 5},0)
    .fromTo('.con02 .title .b',{x: '100%'},{x: '0%',ease: 'none',duration: 5},0)

// 6. workList 가 시작 될때 
// start / end 타이밍 맞춘 기준 : MY WORK 글씨가 화면 중앙에 오고 workList 올라오는 시작과 동시에 애니 끝나는 시간도 맞춤
    gsap.timeline({
        scrollTrigger: {
            trigger: '.workList', 
            start: '0% 100%', 
            end: '0% 100%', 
            scrub: 1, 
           // markers: true,
        }
    })
    // 6-1. 화면 다시 검정색으로 바뀌고 글씨 흰색으로 변경 
    .to('.wrap',{backgroundColor:"#000", color:"#fff",ease: 'none',duration: 5},0)    
    // 6-2. title 을 포지션 픽스해서  workList 가 진행되는 동안  스크롤 할때 고정 되도록 해준다
    .to('.con02 .title',{position: 'fixed',ease: 'none',left: '0', top:'0', width: '100%',duration: 5},0)
    // 6-3. title 포지션 픽스 때문에 갑자기 title 의 높이값이 상실 되서 애니가 부자연스럽다  그래서 workList에 마진 탑 값과 위에 떠있도록 z-index를 준다
    .fromTo('.workList',{margin: '0 auto'},{margin: '100vh auto 0',position: 'relative',zIndex: '10', duration: 1},0)
    
// 7. workList 가 시작 될때 
// start / end 타이밍 맞춘 기준 : workList 리스트가 거의 끝나는 부분에  MY WORK 글씨가 밖으로 사라지도록
    gsap.timeline({
        scrollTrigger: {
            trigger: '.workList', 
            start: '100% 50%', 
            end: '100% 0%', 
            scrub: 1, 
            //markers: true
        }
    })
    // 7-1. con02 .title a 와 b 가  원래대로 서로 반대 방향을 화면 밖으로 사라지게 해준다
    .to('.con02 .title .a',{x: '-100%',ease: 'none',duration: 5},0)
    .to('.con02 .title .b',{x: '100%',ease: 'none',duration: 5},0)    
 
});


// 8. simplyScroll -> skill 영역 배너 
$(function() {
    $(".con03 .list").simplyScroll({
        speed: 4,
        pauseOnHover : false, // 마우스 오버시 멈추지 않도록  
        pauseOnTouch :	false // 터치시 멈추지 않도록  
    });
});

// 9. 반응형 css 작성 할때 메뉴 오픈 작성
$(document).on('click', 'a[href="#"]', function(e){ e.preventDefault(); });

$(function(){
    $('.menuOpen').on('click', function(){
        $('.gnb').toggleClass('on');
        $(this).toggleClass('on');
        $('body').toggleClass('on'); // 스크롤 방지
    });
});







