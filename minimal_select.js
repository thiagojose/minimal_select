document.addEventListener("DOMContentLoaded", loadSelect);
window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

var data = {};
var select_class = ".select-body";
var select_outer_arrow_class = ".select-body-outer-arrow";
var selected_select_class = "selected";
var alltableArray = Array.prototype.slice.call(document.querySelectorAll(select_class + " li"));
const eventType = mobileAndTabletCheck() ? "touchstart" : "click";

function search(ev, value) {
    // override this function to use select values;
    console.log(ev);
    console.log(value);
}

function cleanSelects(valor, id) {
    Array.prototype.slice.call(document.querySelectorAll("div.select-body[target"+ (id ? "=" + id : "") +"]")).map(el => {
        el.firstElementChild.click();
        el.previousElementSibling.classList.remove("active");
        el.previousElementSibling.firstElementChild.innerHTML = valor })
}

function selectTrigger(c_tar) {
    document.querySelectorAll(select_class + "[target=" + c_tar + "] li").forEach(function (c) {
        c.addEventListener(eventType, function (ev) {
            if (this.parentElement.hasAttribute("multiple")) {
                this.classList.toggle(selected_select_class);
                let ids = [];
                var listArray = Array.prototype.slice.call(this.parentElement.children);
                listArray.forEach(function (cc, ind) {
                    if (cc.getAttribute("id") == undefined && cc.classList.contains(selected_select_class)) {
                        var alltableArray2 = Array.prototype.slice.call(cc.parentElement.querySelectorAll("." + selected_select_class));
                        alltableArray2.forEach(function (ccc) {
                            if (cc !== ccc) {
                                ccc.classList.remove(selected_select_class);
                            }
                        });
                        ids = [];
                        return;
                    }
                    if (cc.classList.contains(selected_select_class)) {
                        ids.push(cc.getAttribute("id"));
                    }
                });
                data[c.parentElement.getAttribute("target")] = ids;
                search(ev, data);
                return;
            }
            c.parentElement.previousElementSibling.querySelector("div").innerHTML = c.innerHTML;
            data[c.parentElement.getAttribute("target")] = c.getAttribute("id");
            c.parentElement.style.display = "none";
            if (c.parentElement.nextElementSibling) {
                c.parentElement.nextElementSibling.style.display = "none";
            }
            c.parentElement.previousElementSibling.classList.toggle("active");
            search(ev, data);
        }, false);
    });
}
function loadSelect() {
    alltableArray.forEach(function (c) {
        c.addEventListener(eventType, function (ev) {
            if (this.parentElement.hasAttribute("multiple")) {
                this.classList.toggle(selected_select_class);
                let ids = [];
                var listArray = Array.prototype.slice.call(this.parentElement.children);
                listArray.forEach(function (cc, ind) {
                    if (cc.getAttribute("id") == undefined && cc.classList.contains(selected_select_class)) {
                        var alltableArray2 = Array.prototype.slice.call(cc.parentElement.querySelectorAll("." + selected_select_class));
                        alltableArray2.forEach(function (ccc) {
                            if (cc !== ccc) {
                                ccc.classList.remove(selected_select_class);
                            }
                        });
                        ids = [];
                        return;
                    }
                    if (cc.classList.contains(selected_select_class)) {
                        ids.push(cc.getAttribute("id"));
                    }
                });
                data[c.parentElement.getAttribute("target")] = ids;
                search(ev, data);
                return;
            }
            c.parentElement.previousElementSibling.querySelector("div").innerHTML = c.innerHTML;
            data[c.parentElement.getAttribute("target")] = c.getAttribute("id");
            c.parentElement.style.display = "none";
            if (c.parentElement.nextElementSibling) {
                c.parentElement.nextElementSibling.style.display = "none";
            }
            c.parentElement.previousElementSibling.classList.toggle("active");
            search(ev, data);
        }, false);
    });
    window.addEventListener(eventType, function () {
        var alltableArray8 = Array.prototype.slice.call(document.querySelectorAll(select_class));
        alltableArray8.forEach(function (c) {
            if (c.style.display != "none" && c.offsetParent !== null) {
                c.previousElementSibling.classList.toggle("active");
                if (c.nextElementSibling !== null) {
                    c.nextElementSibling.style.display = "none";
                }
                c.style.display = "none";
            }
        });
    }, false);
    var alltableArray3 = Array.prototype.slice.call(document.querySelectorAll(".select-display"));
    alltableArray3.forEach(function (c) {
        c.addEventListener(eventType, function (e) {
            e.stopPropagation();
        }, false);
    });
    var alltableArray4 = Array.prototype.slice.call(document.querySelectorAll(".select-head"));
    alltableArray4.forEach(function (c) {
        c.addEventListener(eventType, function () {
            this.classList.toggle("active");
            if (this.nextElementSibling.offsetParent !== null) {
                this.nextElementSibling.style.display = "none";
                if (c.nextElementSibling.nextElementSibling) {
                    c.nextElementSibling.nextElementSibling.style.display = "none";
                }
                return;
            }
            this.nextElementSibling.style.display = "block";
            if (c.nextElementSibling.nextElementSibling) {
                c.nextElementSibling.nextElementSibling.style.display = "block";
            }
        }, false);
    });
}