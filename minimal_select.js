document.addEventListener("DOMContentLoaded", loadJs);
function search(ev, value) {
    // override this function to use select values;
    console.log(ev);
    console.log(value);
}
function loadJs() {
    var data = {};
    var select_class = ".select-body";
    var select_outer_arrow_class = ".select-body-outer-arrow";
    var selected_select_class = "selected";
    var alltableArray = Array.prototype.slice.call(document.querySelectorAll(select_class + " li"));
    alltableArray.forEach(function (c) {
        c.addEventListener("click", function (ev) {
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
            if (c.parentElement.nextElementSibling){
                c.parentElement.nextElementSibling.style.display = "none";
            }
            c.parentElement.previousElementSibling.classList.toggle("active");
            search(ev, data);
        });
    });
    window.addEventListener("click", function () {
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
    });
    var alltableArray3 = Array.prototype.slice.call(document.querySelectorAll(".select-display"));
    alltableArray3.forEach(function (c) {
        c.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    });
    var alltableArray4 = Array.prototype.slice.call(document.querySelectorAll(".select-head"));
    alltableArray4.forEach(function (c) {
        c.addEventListener("click", function () {
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
        });
    });
}