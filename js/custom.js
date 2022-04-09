/**
 * get_elemnt : 대상으로 할 element를 배열화 하여 전부 합친다.
 * add_css : 기본적으로 부여받아야 할 css를 넣어준다.
 * move_element : 마우스 무브 이벤트시 부여할 위치를 css로 부여해준다.
 * mouseup_listener : 마우스 업 이벤트
 * mousedown_listener : 마우스 다운 이벤트 시 드래그할 정보를 입력한다.
 * event_listener : 기본적인 이벤트를 부여한다.
 * init : 초기 실행
 */


function dragNDrop(obj) {
    let
        elems = document.querySelectorAll(obj.selector.join(",")),
        flag = {}
        ;
    /*const get_element = _ => {
       // console.log(Array.isArray( obj.selector ));
       if(Array.isArray( obj.selector ) == false) obj.selector = [obj.selector];
       obj.selector.forEach(elem_name => {
          let elem = Array.prototype.slice.call(document.querySelectorAll(elem_name));
          elems = elems.concat( elem );
       });
       console.log(elems);
    }*/

    const add_css = _ => {
        elems.forEach(elem => {
            // elem.style.setProperty("position", "absolute");
            elem.classList.add("dabin-dnd");
        });
    }

    const mouseup_listener = e => {
        flag.targetElem.style.setProperty("opacity", "initial");
        window.removeEventListener("mousemove", move_listener);
        window.removeEventListener("touchmove", move_listener);
        window.removeEventListener("mouseup", mouseup_listener);
        window.removeEventListener("touchend", mouseup_listener);
    }

    const move_listener = e => {
        if (e.touches) e = e.touches[0];
        let elem = flag.targetElem;

        elem.style.setProperty("left", `${e.pageX - flag.x}px`);
        elem.style.setProperty("top", `${e.pageY - flag.y}px`);
    }

    const mousedown_listener = e => {
        let c_target = e.currentTarget;
        if (e.touches) e = e.touches[0];
        // 현재 내가 클릭한 위치에서 클릭한 element의 위치값을 빼면 내가 상대적으로 클릭한 위치 값을 구할 수 있다.
        flag = {
            targetElem: c_target,
            x: (e.pageX - c_target.getBoundingClientRect().x),
            y: (e.pageY - c_target.getBoundingClientRect().y)
        };
        c_target.style.setProperty("opacity", "0.4");
        window.addEventListener("mousemove", move_listener);
        window.addEventListener("touchmove", move_listener);
        window.addEventListener("mouseup", mouseup_listener);
        window.addEventListener("touchend", mouseup_listener);
    }

    const event_listener = _ => {
        elems.forEach(elem => {
            elem.addEventListener("mousedown", mousedown_listener);
            elem.addEventListener("touchstart", mousedown_listener);
        });
    }

    // const event_listener = function () {

    // }

    const init = async () => {
        // await get_element();
        await add_css();
        await event_listener();
    }

    init();
}

new dragNDrop({
    selector: ['.dnd1', '.dnd2']
});